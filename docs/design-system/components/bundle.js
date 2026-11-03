/* @ds-bundle: {"format":4,"namespace":"Wx","components":[{"name":"Button"},{"name":"ComfortBadge"},{"name":"DayCard"},{"name":"WeekendSummary"},{"name":"HourlyChart"},{"name":"CitySearch"},{"name":"CityChips"},{"name":"CompareTable"},{"name":"MapFrame"},{"name":"SkyBackdrop"},{"name":"WeatherIcon"},{"name":"StatusMessage"},{"name":"TopBar"},{"name":"SiteFooter"}]} */
(function () {
  'use strict';
  var React = window.React;
  var h = React.createElement;

  function cx() {
    var out = [];
    for (var i = 0; i < arguments.length; i++) if (arguments[i]) out.push(arguments[i]);
    return out.join(' ');
  }
  function omit(obj, keys) {
    var o = {};
    for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && keys.indexOf(k) < 0) o[k] = obj[k];
    return o;
  }
  function sr(text) { return h('span', { className: 'wx-sr' }, text); }

  /* ---------- Formats (Ukrainian conventions) ---------- */
  var MINUS = '−', NBSP = ' ', DEG = '°';

  function formatTemp(t) {
    var n = Math.round(t);
    if (n > 0) return '+' + n + DEG;
    if (n < 0) return MINUS + Math.abs(n) + DEG;
    return '0' + DEG;
  }
  function formatWind(ms) { return Math.round(ms) + NBSP + 'м/с'; }
  function formatPrecip(p) { return Math.round(p) + '%'; }
  function coordPart(v) { return Math.abs(v).toFixed(2).replace('.', ','); }
  function formatCoords(lat, lon) {
    return coordPart(lat) + DEG + NBSP + (lat >= 0 ? 'пн.' : 'пд.') + NBSP + 'ш., ' +
      coordPart(lon) + DEG + NBSP + (lon >= 0 ? 'сх.' : 'зх.') + NBSP + 'д.';
  }
  function comfortTier(v) { return v >= 70 ? 'good' : v >= 40 ? 'fair' : 'poor'; }
  var TIER_WORD = { good: 'сприятливо', fair: 'помірно', poor: 'несприятливо' };
  var TIER_BARS = { good: 3, fair: 2, poor: 1 };

  /* ---------- Icons: lucide geometry, 24px grid ---------- */
  var CLOUD_TOP = ['path', { d: 'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242' }];
  var GLYPHS = {
    sun: [['circle', { cx: 12, cy: 12, r: 4 }], ['path', { d: 'M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41' }]],
    moon: [['path', { d: 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' }]],
    partly: [['path', { d: 'M12 2v2M4.93 4.93l1.41 1.41M20 12h2M19.07 4.93l-1.41 1.41M15.947 12.65a4 4 0 0 0-5.925-4.128' }], ['path', { d: 'M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z' }]],
    'partly-night': [['path', { d: 'M10.188 8.5A6 6 0 0 1 16 4a1 1 0 0 0 6 6 6 6 0 0 1-3 5.197' }], ['path', { d: 'M13 16a3 3 0 1 1 0 6H7a5 5 0 1 1 4.9-6Z' }]],
    cloud: [['path', { d: 'M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z' }]],
    fog: [CLOUD_TOP, ['path', { d: 'M16 17H7M17 21H9' }]],
    drizzle: [CLOUD_TOP, ['path', { d: 'M8 19v1M8 14v1M16 19v1M16 14v1M12 21v1M12 16v1' }]],
    rain: [CLOUD_TOP, ['path', { d: 'M16 14v6M8 14v6M12 16v6' }]],
    snow: [CLOUD_TOP, ['path', { d: 'M8 15h.01M8 19h.01M12 17h.01M12 21h.01M16 15h.01M16 19h.01' }]],
    storm: [['path', { d: 'M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973' }], ['path', { d: 'm13 12-3 5h4l-3 5' }]],
    wind: [['path', { d: 'M12.8 19.6A2 2 0 1 0 14 16H2M17.5 8a2.5 2.5 0 1 1 2 4H2M9.8 4.4A2 2 0 1 1 11 8H2' }]],
    droplet: [['path', { d: 'M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z' }]],
    sunrise: [['path', { d: 'M12 2v8M4.93 10.93l1.41 1.41M2 18h2M20 18h2M19.07 10.93l-1.41 1.41M22 22H2M8 6l4-4 4 4M16 18a4 4 0 0 0-8 0' }]],
    sunset: [['path', { d: 'M12 10V2M4.93 10.93l1.41 1.41M2 18h2M20 18h2M19.07 10.93l-1.41 1.41M22 22H2M16 6l-4 4-4-4M16 18a4 4 0 0 0-8 0' }]],
    search: [['circle', { cx: 11, cy: 11, r: 8 }], ['path', { d: 'm21 21-4.3-4.3' }]],
    locate: [['path', { d: 'M2 12h3M19 12h3M12 2v3M12 19v3' }], ['circle', { cx: 12, cy: 12, r: 7 }], ['circle', { cx: 12, cy: 12, r: 3 }]],
    pin: [['path', { d: 'M12 17v5' }], ['path', { d: 'M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z' }]],
    x: [['path', { d: 'M18 6 6 18M6 6l12 12' }]],
    alert: [['circle', { cx: 12, cy: 12, r: 10 }], ['path', { d: 'M12 8v4M12 16h.01' }]],
    columns: [['rect', { x: 3, y: 3, width: 18, height: 18, rx: 2 }], ['path', { d: 'M9 3v18M15 3v18' }]],
    'map-pin': [['path', { d: 'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0' }], ['circle', { cx: 12, cy: 10, r: 3 }]]
  };

  var WMO = [
    [[0], 'sun', 'moon', 'Ясно'],
    [[1], 'partly', 'partly-night', 'Переважно ясно'],
    [[2], 'partly', 'partly-night', 'Мінлива хмарність'],
    [[3], 'cloud', 'cloud', 'Хмарно'],
    [[45, 48], 'fog', 'fog', 'Туман'],
    [[51, 53, 55], 'drizzle', 'drizzle', 'Мряка'],
    [[56, 57], 'drizzle', 'drizzle', 'Крижана мряка'],
    [[61, 63, 65], 'rain', 'rain', 'Дощ'],
    [[66, 67], 'rain', 'rain', 'Крижаний дощ'],
    [[80, 81, 82], 'rain', 'rain', 'Злива'],
    [[71, 73, 75, 77], 'snow', 'snow', 'Сніг'],
    [[85, 86], 'snow', 'snow', 'Снігопад'],
    [[95], 'storm', 'storm', 'Гроза'],
    [[96, 99], 'storm', 'storm', 'Гроза з градом']
  ];
  function weatherFromCode(code, night) {
    for (var i = 0; i < WMO.length; i++) {
      if (WMO[i][0].indexOf(code) >= 0) return { icon: night ? WMO[i][2] : WMO[i][1], label: WMO[i][3] };
    }
    return { icon: 'cloud', label: 'Хмарно' };
  }

  function WeatherIcon(props) {
    var parts = GLYPHS[props.name] || GLYPHS.cloud;
    var size = props.size || 16;
    var a11y = props.label ? { role: 'img', 'aria-label': props.label } : { 'aria-hidden': 'true' };
    return h('svg', Object.assign({
      className: cx('wx-icon', props.className), width: size, height: size, viewBox: '0 0 24 24',
      fill: 'none', stroke: 'currentColor', strokeWidth: props.strokeWidth || 1.75,
      strokeLinecap: 'round', strokeLinejoin: 'round', focusable: 'false'
    }, a11y), parts.map(function (p, i) { return h(p[0], Object.assign({ key: i }, p[1])); }));
  }

  /* ---------- Button ---------- */
  function Button(props) {
    var variant = props.variant || 'secondary';
    var size = props.size || 'md';
    var rest = omit(props, ['variant', 'size', 'icon', 'children', 'className']);
    return h('button', Object.assign({ type: 'button' }, rest, {
      className: cx('wx-btn', 'control', 'wx-btn-' + variant, size !== 'md' && 'wx-btn-' + size, props.className)
    }),
      props.icon ? h(WeatherIcon, { name: props.icon, size: 16 }) : null,
      size === 'icon' ? sr(props.children) : props.children);
  }

  /* ---------- ComfortBadge ---------- */
  function Meter(props) {
    var bars = [];
    for (var i = 1; i <= 3; i++) bars.push(h('i', { key: i, className: i <= props.on ? 'on' : undefined }));
    return h('span', { className: 'wx-meter', 'aria-hidden': 'true' }, bars);
  }
  function ComfortBadge(props) {
    var v = Math.round(props.value);
    var tier = comfortTier(v);
    var show = props.show || 'number';
    return h('span', {
      className: cx('wx-comfort', 'wx-comfort-' + tier, props.size === 'lg' ? 'wx-comfort-lg control' : 'label'),
      role: 'img', 'aria-label': 'Комфорт ' + v + ' з 100, ' + TIER_WORD[tier]
    },
      h(Meter, { on: TIER_BARS[tier] }),
      show !== 'word' ? h('span', { className: 'wx-num' }, v) : null,
      show !== 'number' ? h('span', null, TIER_WORD[tier]) : null);
  }

  /* ---------- DayCard ---------- */
  function DayCard(props) {
    var w = weatherFromCode(props.code, false);
    return h('article', { className: cx('wx-day', props.weekend && 'wx-day-weekend'), 'aria-label': props.longLabel },
      h('div', { className: 'wx-day-when' },
        h('span', { className: 'label wx-day-name' }, props.today ? 'Сьогодні' : props.weekday),
        h('span', { className: 'caption wx-muted' }, props.date)),
      h(WeatherIcon, { name: w.icon, size: 32, label: w.label, className: 'wx-day-icon' }),
      h('div', { className: 'wx-day-temps wx-num' },
        h('span', { className: 'temp' }, sr('Максимум '), formatTemp(props.hi)),
        h('span', { className: 'caption wx-muted' }, sr(', мінімум '), formatTemp(props.lo))),
      h('div', { className: 'wx-day-meta caption wx-num' },
        h('span', { className: 'wx-meta' }, h(WeatherIcon, { name: 'droplet', size: 14 }), sr('Ймовірність опадів '), formatPrecip(props.precip)),
        h('span', { className: 'wx-meta' }, h(WeatherIcon, { name: 'wind', size: 14 }), sr('Вітер '), formatWind(props.wind))),
      h(ComfortBadge, { value: props.comfort }));
  }

  /* ---------- WeekendSummary ---------- */
  function WeekendSummary(props) {
    if (props.unavailable) {
      return h('section', { className: 'wx-weekend', 'aria-label': 'Вихідні' },
        h('span', { className: 'label wx-weekend-kicker' }, 'Вихідні'),
        h('p', { className: 'body' }, 'Прогноз на ці вихідні ще недоступний.'));
    }
    return h('section', { className: 'wx-weekend', 'aria-label': 'Вихідні' },
      h('div', { className: 'wx-weekend-head' },
        h('span', { className: 'label wx-weekend-kicker' }, 'Вихідні'),
        h('span', { className: 'caption wx-muted' }, props.range + (props.city ? ' · ' + props.city : ''))),
      h('div', { className: 'wx-weekend-body' },
        h('div', { className: 'wx-weekend-score' },
          h('span', { className: 'score wx-num', 'aria-hidden': 'true' }, Math.round(props.score)),
          h(ComfortBadge, { value: props.score, show: 'word', size: 'lg' })),
        h('div', { className: 'wx-weekend-text' },
          h('p', { className: 'body' }, props.rationale),
          h('ul', { className: 'wx-weekend-days caption wx-num' }, (props.days || []).map(function (d) {
            return h('li', { key: d.weekday },
              h('span', { className: 'label wx-weekend-day' }, d.weekday),
              h('span', null, formatTemp(d.hi) + ' / ' + formatTemp(d.lo)),
              h(ComfortBadge, { value: d.comfort }));
          })))));
  }

  /* ---------- HourlyChart (styling reference for Recharts) ---------- */
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function HourlyChart(props) {
    var pts = props.points || [];
    var W = props.width || 600, H = props.height || 200;
    var m = { l: 40, r: 12, t: 24, b: 28 };
    var iw = W - m.l - m.r, ih = H - m.t - m.b;
    var temps = pts.map(function (p) { return p.temp; });
    var tMin = Math.min.apply(null, temps), tMax = Math.max.apply(null, temps);
    var lo = Math.floor(tMin / 5) * 5, hi = Math.ceil(tMax / 5) * 5;
    if (hi === lo) hi = lo + 5;
    function x(i) { return m.l + (i / (pts.length - 1)) * iw; }
    function y(t) { return m.t + (1 - (t - lo) / (hi - lo)) * ih; }
    var kids = [];
    for (var t = lo; t <= hi; t += 5) {
      kids.push(h('line', { key: 'g' + t, x1: m.l, x2: W - m.r, y1: y(t), y2: y(t), className: 'wx-chart-grid' }));
      kids.push(h('text', { key: 'gl' + t, x: m.l - 8, y: y(t) + 4, textAnchor: 'end', className: 'caption wx-chart-tick' }, formatTemp(t)));
    }
    pts.forEach(function (p, i) {
      if (p.hour === 0 && i > 0) {
        kids.push(h('line', { key: 'd' + i, x1: x(i), x2: x(i), y1: m.t, y2: m.t + ih, className: 'wx-chart-day' }));
        kids.push(h('text', { key: 'dl' + i, x: x(i) + 4, y: m.t - 8, className: 'label wx-chart-daylabel' }, p.day));
      }
      if (p.hour % 6 === 0) {
        kids.push(h('text', { key: 'x' + i, x: x(i), y: H - 8, textAnchor: 'middle', className: 'caption wx-chart-tick' }, pad2(p.hour)));
      }
    });
    kids.push(h('line', { key: 'now', x1: x(0), x2: x(0), y1: m.t, y2: m.t + ih, className: 'wx-chart-now' }));
    kids.push(h('text', { key: 'nowl', x: x(0) + 4, y: m.t - 8, className: 'label wx-chart-nowlabel' }, 'зараз'));
    var d = pts.map(function (p, i) { return (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(p.temp).toFixed(1); }).join(' ');
    kids.push(h('path', { key: 'line', d: d, className: 'wx-chart-line' }));
    if (pts.length) kids.push(h('circle', { key: 'dot', cx: x(0), cy: y(pts[0].temp), r: 4, className: 'wx-chart-dot' }));

    var iMax = temps.indexOf(tMax), iMin = temps.indexOf(tMin);
    var summary = pts.length ? 'Найтепліше ' + formatTemp(tMax) + ' (' + pts[iMax].day + ', ' + pad2(pts[iMax].hour) + ':00), найхолодніше ' +
      formatTemp(tMin) + ' (' + pts[iMin].day + ', ' + pad2(pts[iMin].hour) + ':00).' : '';
    return h('figure', { className: 'wx-chart' },
      h('div', { className: 'wx-chart-head' },
        h('h3', { className: 'heading' }, 'Наступні 48 годин'),
        h('p', { className: 'wx-sr' }, summary)),
      h('div', { className: 'wx-chart-scroll' },
        h('svg', { width: W, height: H, viewBox: '0 0 ' + W + ' ' + H, 'aria-hidden': 'true' }, kids)),
      props.sunrise ? h('figcaption', { className: 'wx-chart-sun caption wx-muted wx-num' },
        h('span', { className: 'wx-meta' }, h(WeatherIcon, { name: 'sunrise', size: 14 }), 'Схід ' + props.sunrise),
        h('span', { className: 'wx-meta' }, h(WeatherIcon, { name: 'sunset', size: 14 }), 'Захід ' + props.sunset)) : null);
  }

  /* ---------- CitySearch ---------- */
  function highlight(text, q) {
    if (!q || text.toLowerCase().indexOf(q.toLowerCase()) !== 0) return text;
    return [h('mark', { key: 'm', className: 'wx-mark' }, text.slice(0, q.length)), text.slice(q.length)];
  }
  function CitySearch(props) {
    var id = props.id || 'wx-city';
    var list = props.suggestions || [];
    var open = list.length > 0;
    var active = props.active || 0;
    return h('div', { className: 'wx-search' },
      h('div', { className: 'wx-search-row' },
        h('div', { className: 'wx-field' },
          h('label', { htmlFor: id, className: 'wx-sr' }, 'Пошук міста'),
          h(WeatherIcon, { name: 'search', size: 16, className: 'wx-field-icon' }),
          h('input', {
            id: id, className: 'input wx-input', type: 'text', role: 'combobox', autoComplete: 'off',
            'aria-autocomplete': 'list', 'aria-expanded': open ? 'true' : 'false', 'aria-controls': id + '-list',
            'aria-activedescendant': open ? id + '-opt-' + active : undefined,
            placeholder: 'Місто, наприклад Львів', defaultValue: props.query || ''
          }),
          open ? h('ul', { id: id + '-list', role: 'listbox', className: 'wx-listbox', 'aria-label': 'Знайдені міста' },
            list.map(function (s, i) {
              return h('li', { key: i, id: id + '-opt-' + i, role: 'option', 'aria-selected': i === active ? 'true' : 'false', className: 'wx-option' },
                h('span', { className: 'wx-flag', 'aria-hidden': 'true' }, s.flag || ''),
                h('span', { className: 'wx-option-text' },
                  h('span', { className: 'control' }, highlight(s.name, props.query)),
                  h('span', { className: 'caption wx-muted' }, [s.admin, s.country].filter(Boolean).join(', '))));
            })) : null,
          props.empty ? h('p', { className: 'caption wx-search-empty', role: 'status' }, 'Нічого не знайдено') : null),
        h(Button, { variant: 'secondary', icon: 'locate', className: 'wx-locate' }, 'Моє місцезнаходження')));
  }

  /* ---------- CityChips ---------- */
  function CityChips(props) {
    var cities = props.cities || [];
    var max = props.max || 3;
    var full = cities.length >= max;
    return h('div', { className: 'wx-chips', role: 'group', 'aria-label': 'Закріплені міста' },
      cities.map(function (c) {
        var isActive = c.id === props.activeId;
        return h('span', { key: c.id, className: cx('wx-chip', isActive && 'wx-chip-active') },
          h('button', { type: 'button', className: 'wx-chip-main control', 'aria-current': isActive ? 'true' : undefined }, c.name),
          h('button', { type: 'button', className: 'wx-chip-x', 'aria-label': 'Відкріпити ' + c.name }, h(WeatherIcon, { name: 'x', size: 14 })));
      }),
      props.pinName && !full ? h(Button, { variant: 'ghost', size: 'sm', icon: 'pin' }, 'Закріпити') : null,
      h('span', { className: 'caption wx-muted wx-num' }, full ? 'Можна закріпити до ' + max + ' міст' : cities.length + ' з ' + max),
      h(Button, { variant: 'secondary', size: 'sm', icon: 'columns', className: 'wx-chips-compare', 'aria-pressed': props.comparing ? 'true' : 'false', disabled: cities.length < 2 }, 'Порівняти вихідні'));
  }

  /* ---------- CompareTable ---------- */
  function CompareTable(props) {
    var cities = props.cities || [];
    function block(key, label) {
      return [
        h('tr', { key: key + '-h', className: 'wx-table-day' }, h('th', { scope: 'colgroup', colSpan: cities.length + 1, className: 'label' }, label)),
        h('tr', { key: key + '-t' }, h('th', { scope: 'row', className: 'caption wx-muted' }, 'Макс. / мін.'),
          cities.map(function (c) {
            return h('td', { key: c.id, className: 'wx-num' }, h('span', { className: 'temp' }, formatTemp(c[key].hi)), h('span', { className: 'caption wx-muted' }, ' / ' + formatTemp(c[key].lo)));
          })),
        h('tr', { key: key + '-p' }, h('th', { scope: 'row', className: 'caption wx-muted' }, 'Опади'),
          cities.map(function (c) { return h('td', { key: c.id, className: 'control wx-num' }, formatPrecip(c[key].precip)); })),
        h('tr', { key: key + '-c' }, h('th', { scope: 'row', className: 'caption wx-muted' }, 'Комфорт'),
          cities.map(function (c) { return h('td', { key: c.id }, h(ComfortBadge, { value: c[key].comfort })); }))
      ];
    }
    return h('div', { className: 'wx-compare', role: 'region', 'aria-label': 'Порівняння вихідних', tabIndex: 0 },
      h('table', { className: 'wx-table' },
        h('thead', null, h('tr', null,
          h('td', { className: 'wx-table-corner' }),
          cities.map(function (c) {
            return h('th', { key: c.id, scope: 'col' },
              h('div', { className: 'wx-th' },
                h('span', { className: 'heading' }, c.name),
                c.id === props.activeId ? h('span', { className: 'caption wx-muted wx-th-active' }, 'Активне') :
                  h(Button, { variant: 'ghost', size: 'sm', className: 'wx-th-btn' }, 'Зробити активним')));
          }))),
        h('tbody', null, block('sat', props.satLabel || 'Субота'), block('sun', props.sunLabel || 'Неділя'))));
  }

  /* ---------- MapFrame (chrome around the Leaflet map) ---------- */
  function MapFrame(props) {
    if (props.loading) {
      return h('div', { className: 'wx-map wx-map-skeleton', role: 'status' }, sr('Завантаження карти'));
    }
    return h('div', { className: 'wx-map' },
      h('svg', { className: 'wx-map-art', viewBox: '0 0 400 360', preserveAspectRatio: 'xMidYMid slice', 'aria-hidden': 'true' },
        h('path', { className: 'wx-map-water', d: 'M-10 250 C 60 230, 110 280, 180 262 S 300 200, 410 226' }),
        h('path', { className: 'wx-map-road', d: 'M40 -10 L 150 200 L 210 370' }),
        h('path', { className: 'wx-map-road', d: 'M-10 120 L 200 205 L 410 150' }),
        h('path', { className: 'wx-map-road wx-map-road-minor', d: 'M260 -10 L 230 120 L 200 205 M120 360 L 200 205 M300 360 L 330 230 L 410 260' })),
      h('div', { className: 'wx-popup' },
        h('span', { className: 'heading' }, props.name),
        props.coords ? h('span', { className: 'coord wx-muted' }, formatCoords(props.coords[0], props.coords[1])) : null),
      h('span', { className: 'wx-marker', 'aria-hidden': 'true' }),
      h('div', { className: 'wx-attrib caption' }, h('a', { href: 'https://www.openstreetmap.org/copyright' }, '© OpenStreetMap contributors')));
  }

  /* ---------- SkyBackdrop (static frame of the animated sky) ---------- */
  function seeded(seed) {
    var s = seed % 2147483647; if (s <= 0) s += 2147483646;
    return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  }
  function SkyBackdrop(props) {
    var mode = props.mode || 'day', cond = props.condition || 'clear';
    var W = 320, H = 180, rnd = seeded(props.seed || 7), parts = [], i;
    var fid = 'wx-blur-' + mode + '-' + cond + '-' + (props.seed || 7);
    if (cond !== 'clear') {
      for (i = 0; i < 4; i++) parts.push(h('ellipse', { key: 'c' + i, cx: rnd() * W, cy: 18 + rnd() * 48, rx: 48 + rnd() * 40, ry: 12 + rnd() * 8, className: 'wx-sky-cloud', filter: 'url(#' + fid + ')' }));
    }
    if (cond === 'rain') {
      for (i = 0; i < 46; i++) { var rx = rnd() * W, ry = rnd() * H; parts.push(h('line', { key: 'r' + i, x1: rx, y1: ry, x2: rx - 3, y2: ry + 12, className: 'wx-sky-rain' })); }
    }
    if (cond === 'snow') {
      for (i = 0; i < 40; i++) parts.push(h('circle', { key: 's' + i, cx: rnd() * W, cy: rnd() * H, r: 1.2 + rnd() * 1.6, className: 'wx-sky-snow' }));
    }
    return h('div', { className: cx('wx-sky', 'wx-sky-' + mode) },
      h('svg', { className: 'wx-sky-layer', viewBox: '0 0 ' + W + ' ' + H, preserveAspectRatio: 'xMidYMid slice', 'aria-hidden': 'true' },
        h('defs', null, h('filter', { id: fid, x: '-20%', y: '-50%', width: '140%', height: '200%' }, h('feGaussianBlur', { stdDeviation: 6 }))),
        parts),
      props.children ? h('span', { className: 'wx-sky-label label' }, props.children) : null);
  }

  /* ---------- StatusMessage ---------- */
  function StatusMessage(props) {
    return h('div', { className: 'wx-status', role: 'status' },
      h(WeatherIcon, { name: props.icon || 'alert', size: 20, className: 'wx-status-icon' }),
      h('div', { className: 'wx-status-text' },
        h('p', { className: 'control' }, props.title),
        props.children ? h('p', { className: 'caption wx-muted' }, props.children) : null),
      props.actionLabel ? h(Button, { variant: 'primary', size: 'sm' }, props.actionLabel) : null);
  }

  /* ---------- TopBar ---------- */
  function TopBar(props) {
    return h('header', { className: 'wx-top' },
      h('div', { className: 'wx-brand' },
        h('span', { className: 'wordmark' }, 'Weather Explorer'),
        h('span', { className: 'caption wx-top-muted' }, 'погода на вихідні')),
      h('div', { className: 'wx-top-tools' },
        h('span', { className: 'control wx-num wx-clock' }, sr((props.clockLabel || 'Місцевий час') + ' '),
          h('time', { dateTime: props.dateTime }, props.time)),
        h('span', { className: 'wx-theme caption' },
          h('span', { className: 'wx-theme-light' }, h(WeatherIcon, { name: 'sun', size: 14 }), 'Світла тема'),
          h('span', { className: 'wx-theme-dark' }, h(WeatherIcon, { name: 'moon', size: 14 }), 'Темна тема'))));
  }

  /* ---------- SiteFooter ---------- */
  function SiteFooter(props) {
    return h('footer', { className: 'wx-footer' },
      props.joke ? h('p', { className: 'body wx-joke' }, props.joke) : null,
      h('p', { className: 'caption wx-credits' },
        'Дані погоди: ', h('a', { href: 'https://open-meteo.com/' }, 'Open-Meteo'),
        ' · Карта: ', h('a', { href: 'https://www.openstreetmap.org/copyright' }, '© OpenStreetMap contributors')));
  }

  window.Wx = Object.assign(window.Wx || {}, {
    Button: Button, ComfortBadge: ComfortBadge, DayCard: DayCard, WeekendSummary: WeekendSummary,
    HourlyChart: HourlyChart, CitySearch: CitySearch, CityChips: CityChips, CompareTable: CompareTable,
    MapFrame: MapFrame, SkyBackdrop: SkyBackdrop, WeatherIcon: WeatherIcon, StatusMessage: StatusMessage,
    TopBar: TopBar, SiteFooter: SiteFooter,
    formatTemp: formatTemp, formatWind: formatWind, formatPrecip: formatPrecip, formatCoords: formatCoords,
    comfortTier: comfortTier, weatherFromCode: weatherFromCode, GLYPH_NAMES: Object.keys(GLYPHS)
  });
})();
