// Draws the Postcrossing map into #postcrossing-map.
// Base map: world.js (POSTCROSSING_WORLD). Counts: received.js (POSTCROSSING).
(function () {
  const root = document.getElementById('postcrossing-map');
  const world = window.POSTCROSSING_WORLD;
  const data = window.POSTCROSSING;
  if (!root || !world || !data || !window.d3 || !window.topojson) return;

  const W = 760;
  const LIGHT = [0x9f, 0xc3, 0xec];
  const DARK = [0x17, 0x72, 0xd0]; // site link color
  const TINY_AREA = 40; // px^2; received places smaller than this also get a dot
  const NAMES = { HK: 'Hong Kong', MO: 'Macao', US: 'United States' };
  const SVG_NS = 'http://www.w3.org/2000/svg';

  const received = data.received;
  const codes = Object.keys(received).sort((a, b) => received[b] - received[a]);
  const total = codes.reduce((s, c) => s + received[c], 0);
  const max = Math.max(1, ...codes.map((c) => received[c]));

  let displayNames = null;
  try { displayNames = new Intl.DisplayNames(['en'], { type: 'region' }); } catch (e) { /* old browser */ }
  const nameOf = (c) => NAMES[c] || (displayNames && displayNames.of(c)) || c;

  // Log scale so a single card is still clearly visible next to the max.
  const colorOf = (n) => {
    const t = max > 1 ? Math.log(n) / Math.log(max) : 1;
    return 'rgb(' + LIGHT.map((l, i) => Math.round(l + (DARK[i] - l) * t)).join(',') + ')';
  };

  const el = (tag, attrs) => {
    const node = document.createElementNS(SVG_NS, tag);
    for (const k in attrs) node.setAttribute(k, attrs[k]);
    return node;
  };

  const countries = topojson.feature(world.topology, world.topology.objects.countries);
  const projection = d3.geoNaturalEarth1().fitWidth(W, countries);
  const path = d3.geoPath(projection);
  const H = Math.ceil(path.bounds(countries)[1][1]);

  const svg = el('svg', {
    viewBox: '-2 -2 ' + (W + 4) + ' ' + (H + 4),
    role: 'img',
    'aria-label': 'World map of where my postcards came from: ' +
      codes.map((c) => nameOf(c) + ' (' + received[c] + ')').join(', '),
  });
  const land = el('g', {});
  const dots = el('g', {});
  svg.append(land, dots);

  const drawn = new Set();
  const addDot = (code, xy) => {
    if (!xy || !isFinite(xy[0])) return;
    dots.append(el('circle', {
      class: 'pc-dot', cx: xy[0].toFixed(1), cy: xy[1].toFixed(1), r: 3.5,
      style: 'fill:' + colorOf(received[code]), 'data-code': code,
    }));
  };

  countries.features.forEach((f) => {
    const code = f.id;
    const attrs = { d: path(f), class: 'pc-land' };
    if (received[code]) {
      attrs.class += ' pc-received';
      attrs.style = 'fill:' + colorOf(received[code]); // inline style beats the .pc-land fill
      attrs['data-code'] = code;
      drawn.add(code);
      if (path.area(f) < TINY_AREA) addDot(code, path.centroid(f));
    }
    land.append(el('path', attrs));
  });

  codes.forEach((code) => {
    if (drawn.has(code)) return;
    const lonLat = world.points[code];
    if (lonLat) addDot(code, projection(lonLat));
    else console.warn('[postcrossing] no map location for', code);
  });

  // Tooltip
  const tip = document.createElement('div');
  tip.className = 'pc-tip';
  tip.hidden = true;
  let current = null;

  const hide = () => { tip.hidden = true; current = null; };
  const show = (e) => {
    const code = e.target.getAttribute && e.target.getAttribute('data-code');
    if (!code) return hide();
    if (code !== current) {
      current = code;
      const n = received[code];
      tip.innerHTML = '<strong>' + nameOf(code) + '</strong> &middot; ' + n + ' postcard' + (n > 1 ? 's' : '');
      if (e.target.tagName === 'path') land.append(e.target); // bring outline to front
    }
    tip.hidden = false;
    const box = root.getBoundingClientRect();
    const half = tip.offsetWidth / 2;
    const x = Math.min(Math.max(e.clientX - box.left, half), box.width - half);
    tip.style.left = x + 'px';
    tip.style.top = (e.clientY - box.top) + 'px';
  };
  svg.addEventListener('pointermove', show);
  svg.addEventListener('pointerdown', show);
  svg.addEventListener('pointerleave', (e) => { if (e.pointerType !== 'touch') hide(); });

  // Caption + legend
  const asOf = new Date(data.updated + 'T00:00:00')
    .toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  const caption = document.createElement('p');
  caption.className = 'pc-caption';
  caption.innerHTML =
    '<span>' + total + ' postcards received from ' + codes.length +
    ' countries &amp; regions (as of ' + asOf + ')</span>' +
    '<span class="pc-legend">1 <i style="background:linear-gradient(to right,' +
    colorOf(1) + ',' + colorOf(max) + ')"></i> ' + max + '</span>';

  root.append(svg, tip, caption);
})();
