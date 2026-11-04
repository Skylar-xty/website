// Postcards I've received on Postcrossing, counted by the sender's country/region.
// Keys are the 2-letter prefix of each postcard ID ("FR-1947926" -> "FR").
//
// To update: open https://www.postcrossing.com/user/skylar/received while logged in,
// set "Display" to "All", run this in the browser console (DevTools), and paste the
// copied result over `received` below:
//
//   copy(JSON.stringify([...document.querySelectorAll('table tr')].reduce((m, tr) => {
//     const id = /^([A-Z]{2})-\d+$/.exec(tr.cells[0]?.innerText.trim() || '');
//     if (id) m[id[1]] = (m[id[1]] || 0) + 1;
//     return m;
//   }, {})))
window.POSTCROSSING = {
  updated: '2026-11-04',
  received: { US: 7, BY: 2, FR: 2, CN: 1, FI: 1, MO: 1, NZ: 1, RU: 1, TW: 1 },
};
