# Style Tuning Guide — Ono Tournament Book

Quick reference for every visual tweak made this session and where to change them.

---

## File Map

| File | Purpose | Editable? |
|------|---------|-----------|
| `book-example.css` | **ALL content styles** — match rows, groups, all-matches, knockouts, page layout | ✅ YES — primary file |
| `flipbook.css` | 3D flip engine (transforms, vars, page stacking) | ❌ LOCKED |
| `flipbook-book.html` | Flipbook HTML + inline `<style>` (lines 9–107) for overrides | ✅ YES — inline `<style>` only |
| `example-book.html` | Flat spread HTML + inline `<style>` (lines 8–18) | ✅ YES — inline `<style>` only |
| `book-groups.js` | JS that renders groups, all-matches, knockouts, daily buzz | ✅ YES — for structural/data changes |

---

## 1. FOUC / Page Flash Fix

**Problem**: Other pages flash before the cover on load.  
**Where**: `flipbook-book.html` inline `<style>` (line ~56) + inline `<script>` (line ~588)

**CSS (line ~56)**:
```css
/* Cover shows immediately; all other sheets hidden until JS finishes */
#the-book { opacity: 1; }
#the-book > .page:not(#pg-0) { visibility: hidden !important; }
#the-book.ready > .page:not(#pg-0) { visibility: visible !important; }
```

**JS (line ~588)**:
```js
goTo(0);
// Double-rAF: waits for layout to complete before revealing
requestAnimationFrame(function () {
  requestAnimationFrame(function () {
    book.classList.add('ready');
  });
});
```

**How it works**: Cover (`#pg-0`) is always visible. All other sheets are `visibility: hidden` until JS sets `--c`/`--i` vars and adds `.ready` class after two animation frames (ensures layout is done).

**To adjust**: If flash persists, add more rAF nesting or use `setTimeout(fn, 50)` instead.

---

## 2. All-Matches Column Header Row

**Problem**: pp 4-6 had no column labels and wasted vertical space.  
**Where**: `book-groups.js` (line ~905) + `book-example.css` (line ~453)

**JS** — generates the header row at the top of each all-matches page:
```js
var html = '<div class="match-row am-row am-hdr">'
  + '<span>#</span><span>G</span><span>Day</span><span>Date</span>'
  + '<span>Time</span><span></span><span>Home</span><span></span>'
  + '<span></span><span>Away</span><span></span><span>City</span>'
  + '</div>';
```

**CSS** — styling for the header:
```css
/* Base header style */
.am-hdr {
  font-size: 7px;           /* ← label text size */
  font-weight: 700;
  text-transform: uppercase;
  color: #555;              /* ← label text color */
  letter-spacing: 0.03em;
  border-bottom: 1px solid #ccc;  /* ← underline */
  padding-bottom: 1px;
  margin-top: 0;
  margin-bottom: 2px;       /* ← gap below header (base, overridden below) */
}

/* Higher specificity override — THIS is the one that actually controls the gap */
.all-matches-wrap .am-hdr {
  margin-top: 0;
  margin-bottom: 5px;       /* ← CHANGE THIS for gap below label row */
  padding: 0;
}
```

**Alignment**:
```css
.am-hdr span:last-child { text-align: right; }     /* City → right */
.am-hdr span:nth-child(10) { text-align: right; }  /* Away → right */
```

**Content area top padding** (gap above label row):
```css
/* Both files — uses :has() for flipbook compatibility */
#p4 .content-area, #p5 .content-area, #p6 .content-area,
.content-area:has(> .all-matches-wrap) {
  padding-top: 4px;    /* ← CHANGE THIS for gap above the label row */
}
```

---

## 3. Group Schedule Spacing

**Where**: `book-example.css`

### City touching right edge
```css
.grp-sched .match-row {
  padding-left: 3px;      /* ← left inset */
  padding-right: 3px;     /* ← right inset (fixes city touching edge) */
  grid-template-columns: 21px 26px 38px 34px 24px 35px 17px 17px 35px 24px 1fr;
  /*                                       ^^^^ time column (was 40px, reduced to 34px) */
}
```

### Team code font size (match score box size)
```css
.grp-sched .match-row .m-hcode,
.grp-sched .match-row .m-acode { font-size: 10px; }  /* ← team letter size in groups */
```

### Bottom padding (match header-to-bottom symmetry)
```css
.grp-sched {
  padding-bottom: 6px;    /* ← matches the 6px gap at top from .grp-sched-hdr margin */
}
```

---

## 4. Time Column Nudge

**Where**: `book-example.css` (line ~369)

```css
.m-time {
  font-size: 8.3px;
  font-weight: 700;
  color: #111;
  white-space: nowrap;
  margin-right: 1px;     /* ← pushes time text slightly left */
}
```

---

## 5. Grid Column Reference

All match rows use CSS Grid. Here are the column definitions:

### Base `.match-row` (used everywhere)
```
21px  26px  38px  40px  24px  35px  17px  17px  35px  24px  1fr
num   dow   date  time  hflag hcode sbH   sbA   acode aflag city
```

### `.grp-sched .match-row` (group pages — time narrower)
```
21px  26px  38px  34px  24px  35px  17px  17px  35px  24px  1fr
num   dow   date  time  hflag hcode sbH   sbA   acode aflag city
                  ^^^^  reduced from 40→34 to give city more room
```

### `.am-row` (all-matches pages — has extra group badge column)
```
15px  16px  34px  46px  43px  25px  37px  18px  18px  37px  25px  1fr
num   grp   dow   date  time  hflag hcode sbH   sbA   acode aflag city
      ^^^^  extra column
```

**To adjust column widths**: Change the `grid-template-columns` values. The `1fr` at the end (city) is flexible and takes remaining space.

---

## 6. Specificity Gotchas

| Selector | Specificity | Notes |
|----------|-------------|-------|
| `.am-hdr` | 1 class | ⚠️ Overridden by `.all-matches-wrap .match-row` (2 classes) |
| `.all-matches-wrap .am-hdr` | 2 classes | ✅ Use this for am-hdr overrides |
| `#p4 .content-area` | 1 ID + 1 class | Only works in example-book.html (flipbook uses different IDs) |
| `.content-area:has(> .all-matches-wrap)` | 1 class + pseudo | ✅ Works in both files |
| `#the-book > .page:not(#pg-0)` | 1 ID + 1 class + pseudo | Flipbook-only, high specificity |

**Rule of thumb**: If a CSS change "isn't working", it's almost always a specificity issue. Use browser DevTools (F12 → Elements → Computed) to see which rule is winning.

---

## 7. Quick Adjustment Cheat Sheet

| What to change | File | Selector | Property |
|----------------|------|----------|----------|
| Gap above column labels | `book-example.css` | `.content-area:has(> .all-matches-wrap)` | `padding-top` |
| Gap below column labels | `book-example.css` | `.all-matches-wrap .am-hdr` | `margin-bottom` |
| Column label font size | `book-example.css` | `.am-hdr` | `font-size` |
| Group city right spacing | `book-example.css` | `.grp-sched .match-row` | `padding-right` |
| Group time column width | `book-example.css` | `.grp-sched .match-row` | `grid-template-columns` (4th value) |
| Group team code size | `book-example.css` | `.grp-sched .match-row .m-hcode` | `font-size` |
| Group schedule bottom gap | `book-example.css` | `.grp-sched` | `padding-bottom` |
| Time nudge left | `book-example.css` | `.m-time` | `margin-right` |
| FOUC reveal delay | `flipbook-book.html` | Inline `<script>` | Add more `requestAnimationFrame` nesting |
| Cover flash fix | `flipbook-book.html` | Inline `<style>` | `#the-book > .page:not(#pg-0)` visibility |
