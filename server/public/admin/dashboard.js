const KEY_STORAGE = 'cv-dashboard:admin-key';
const MAX_LIST_ITEMS = 10;

const $ = (id) => document.getElementById(id);
const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

let days = 30;

function storedKey() {
  try {
    return sessionStorage.getItem(KEY_STORAGE) || '';
  } catch {
    return '';
  }
}

function storeKey(value) {
  try {
    if (value) sessionStorage.setItem(KEY_STORAGE, value);
    else sessionStorage.removeItem(KEY_STORAGE);
  } catch {
    // Storage can be blocked; the key then lasts only for this page load.
  }
}

let adminKey = storedKey();

const flag = (code) =>
  code && /^[A-Z]{2}$/.test(code)
    ? String.fromCodePoint(...[...code].map((char) => 0x1f1a5 + char.charCodeAt(0)))
    : '🌐';

const countryName = (code) => {
  if (!code) return 'Unknown';
  try {
    return regionNames.of(code) || code;
  } catch {
    return code;
  }
};

function placeLabel({ city, region, country }) {
  const parts = [city, region && region !== city && !/^\d+$/.test(region) ? region : '', countryName(country)];
  return parts.filter(Boolean).join(', ');
}

function relativeTime(date) {
  const seconds = Math.round((Date.now() - date.getTime()) / 1000);
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  const format = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  for (const [unit, size] of units) {
    if (seconds >= size) return format.format(-Math.floor(seconds / size), unit);
  }
  return 'just now';
}

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

function show(view) {
  $('login').hidden = view !== 'login';
  $('dashboard').hidden = view !== 'dashboard';
  $('controls').hidden = view !== 'dashboard';
}

async function load() {
  const response = await fetch(`/api/analytics/cv-downloads?days=${days}`, {
    headers: { 'x-admin-key': adminKey },
  });

  if (response.status === 401) {
    storeKey('');
    adminKey = '';
    show('login');
    $('login-error').textContent = 'That key was not accepted.';
    return;
  }
  if (!response.ok) throw new Error(`Request failed (${response.status})`);

  render(await response.json());
  show('dashboard');
}

function render(report) {
  const rangeLabel = days === 365 ? 'the last year' : `the last ${days} days`;
  $('subtitle').textContent = `Where your CV was downloaded from in ${rangeLabel}`;

  $('t-total').textContent = report.total.toLocaleString();
  $('t-countries').textContent = report.countries.filter((row) => row.country).length;

  const topCity = report.cities.find((row) => row.city);
  const top = topCity ?? report.cities[0];
  const topEl = $('t-top');
  topEl.textContent = top ? `${flag(top.country)} ${top.city || countryName(top.country)}` : '–';
  topEl.title = top ? placeLabel(top) : '';
  topEl.classList.toggle('small-value', Boolean(top));

  const last = report.recent[0];
  const lastEl = $('t-last');
  lastEl.textContent = last ? relativeTime(new Date(last.createdAt)) : '–';
  lastEl.title = last ? new Date(last.createdAt).toLocaleString() : '';
  lastEl.classList.toggle('small-value', Boolean(last));

  renderDaily(report);
  renderBars(
    $('countries'),
    report.countries.map((row) => ({ label: `${flag(row.country)} ${countryName(row.country)}`, count: row.count })),
    report.total,
  );
  renderBars(
    $('cities'),
    report.cities.map((row) => ({
      label: `${flag(row.country)} ${row.city ? placeLabel(row) : `${countryName(row.country)} (city unknown)`}`,
      count: row.count,
    })),
    report.total,
  );
  renderRecent(report.recent);
}

function renderDaily(report) {
  const container = $('daily');
  const counts = new Map(report.daily.map((row) => [row.day, row.count]));
  const start = new Date(report.since);
  const series = Array.from({ length: report.days }, (_, index) => {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + index);
    const day = date.toISOString().slice(0, 10);
    return { day, count: counts.get(day) ?? 0 };
  });
  const max = Math.max(1, ...series.map((row) => row.count));

  container.innerHTML = series
    .map(
      (row) =>
        `<div class="col" data-tip="${row.day}: ${row.count} download${row.count === 1 ? '' : 's'}">` +
        `<span style="height:${(row.count / max) * 100}%"></span></div>`,
    )
    .join('');
  container.style.gap = report.days > 120 ? '0' : '2px';

  const axis = container.nextElementSibling?.classList.contains('axis')
    ? container.nextElementSibling
    : container.insertAdjacentElement('afterend', document.createElement('div'));
  axis.className = 'axis';
  const fmt = (day) =>
    new Date(`${day}T00:00:00Z`).toLocaleDateString('en', { month: 'short', day: 'numeric', timeZone: 'UTC' });
  axis.innerHTML = `<span>${fmt(series[0].day)}</span><span>peak ${report.total ? max : 0}/day</span><span>${fmt(series.at(-1).day)}</span>`;
}

function renderBars(list, rows, total) {
  if (!rows.length) {
    list.innerHTML = '<li class="empty">No downloads yet</li>';
    return;
  }

  const shown = rows.slice(0, MAX_LIST_ITEMS);
  const rest = rows.slice(MAX_LIST_ITEMS).reduce((sum, row) => sum + row.count, 0);
  if (rest) shown.push({ label: `Other (${rows.length - MAX_LIST_ITEMS})`, count: rest });
  const max = Math.max(...shown.map((row) => row.count));

  list.innerHTML = shown
    .map(
      (row) => `<li data-tip="${escapeHtml(row.label)}: ${row.count} (${Math.round((row.count / total) * 100)}%)">
        <span class="name">${escapeHtml(row.label)}</span>
        <span class="value">${row.count}</span>
        <span class="track"><span class="fill" style="width:${(row.count / max) * 100}%;display:block"></span></span>
      </li>`,
    )
    .join('');
}

const deviceIcon = { desktop: '🖥️', mobile: '📱', tablet: '📱', bot: '🤖', unknown: '❔' };

function renderRecent(rows) {
  $('recent').innerHTML = rows.length
    ? rows
        .map((row) => {
          const date = new Date(row.createdAt);
          const device = [row.browser, row.os].filter(Boolean).join(' · ') || row.device;
          return `<tr>
            <td title="${escapeHtml(date.toLocaleString())}">${escapeHtml(date.toLocaleString('en', { dateStyle: 'medium', timeStyle: 'short' }))}
              <span class="sub"> · ${escapeHtml(relativeTime(date))}</span></td>
            <td>${flag(row.country)} ${escapeHtml(placeLabel(row))}</td>
            <td class="sub">${deviceIcon[row.device] ?? ''} ${escapeHtml(device)}</td>
            <td class="sub">${escapeHtml(row.referrer || 'Direct')}</td>
          </tr>`;
        })
        .join('')
    : '<tr><td colspan="4" class="empty">No downloads in this period</td></tr>';
}

// Shared hover tooltip for chart columns and bar rows.
const tooltip = $('tooltip');
document.addEventListener('mousemove', (event) => {
  const target = event.target.closest('[data-tip]');
  if (!target) {
    tooltip.hidden = true;
    return;
  }
  tooltip.textContent = target.dataset.tip;
  tooltip.hidden = false;
  const x = Math.min(event.clientX + 12, window.innerWidth - tooltip.offsetWidth - 8);
  tooltip.style.left = `${x}px`;
  tooltip.style.top = `${event.clientY + 14}px`;
});

$('login').addEventListener('submit', async (event) => {
  event.preventDefault();
  adminKey = $('key').value.trim();
  storeKey(adminKey);
  $('login-error').textContent = '';
  try {
    await load();
  } catch (error) {
    $('login-error').textContent = error.message;
  }
});

document.querySelectorAll('[data-days]').forEach((button) =>
  button.addEventListener('click', () => {
    days = Number(button.dataset.days);
    document
      .querySelectorAll('[data-days]')
      .forEach((other) => other.setAttribute('aria-pressed', String(other === button)));
    load().catch((error) => alert(error.message));
  }),
);

$('refresh').addEventListener('click', () => load().catch((error) => alert(error.message)));
$('logout').addEventListener('click', () => {
  storeKey('');
  adminKey = '';
  $('key').value = '';
  show('login');
});

if (adminKey) {
  load().catch(() => show('login'));
} else {
  show('login');
}
