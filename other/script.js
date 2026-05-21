// Flipbook template script (placeholder)
// Add project-specific runtime behavior here.

document.addEventListener('DOMContentLoaded', function() {
    // Template placeholder: wire page-management UI if present
    wirePageControls();
});

// Expose simple helpers if needed
window.TemplateBook = {
    init: function() { /* no-op */ }
};

/* ===== Simple page / spread management =====
   - Each spread is one `.page` element containing a `.front` and `.back` panel
   - `addSpread()` appends a blank spread and updates indices
   - `removeLastSpread()` removes the last spread (keeps at least one)
*/

function getBookEl() {
    return document.querySelector('.book');
}

function updateIndices() {
    const book = getBookEl();
    if (!book) return;
    const pages = Array.from(book.querySelectorAll('.page'));
    pages.forEach((p, i) => p.style.setProperty('--i', i));
    // Keep --c within bounds
    const c = Math.max(0, Math.min(parseInt(book.style.getPropertyValue('--c') || '0', 10), pages.length));
    book.style.setProperty('--c', c);
    updatePageDisplay();
}

function updatePageDisplay() {
    const disp = document.getElementById('page-display');
    const book = getBookEl();
    if (!disp || !book) return;
    const pages = book.querySelectorAll('.page');
    const c = parseInt(book.style.getPropertyValue('--c') || '0', 10);
    if (c === 0) disp.textContent = 'COVER';
    else if (c >= pages.length) disp.textContent = 'BACK';
    else disp.textContent = `Page ${c + 1} / ${pages.length}`;
}

function addSpread(frontHTML = '', backHTML = '') {
    const book = getBookEl();
    if (!book) return null;
    const id = 'pg-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    const wrapper = document.createElement('div');
    wrapper.className = 'page';
    wrapper.id = id;

    const front = document.createElement('div');
    front.className = 'front panel';
    front.innerHTML = frontHTML || `<!-- ${id} front -->`;

    const back = document.createElement('div');
    back.className = 'back panel';
    back.innerHTML = backHTML || `<!-- ${id} back -->`;

    wrapper.appendChild(front);
    wrapper.appendChild(back);

    book.appendChild(wrapper);
    updateIndices();
    return wrapper;
}

function addBlankSpreads(n = 1) {
    let last = null;
    for (let i = 0; i < n; i++) last = addSpread();
    return last;
}

function removeLastSpread() {
    const book = getBookEl();
    if (!book) return false;
    const pages = book.querySelectorAll('.page');
    if (pages.length <= 1) return false; // keep at least one spread
    const last = pages[pages.length - 1];
    last.remove();
    updateIndices();
    return true;
}

function wirePageControls() {
    const addBtn = document.getElementById('add-spread-btn');
    const remBtn = document.getElementById('remove-spread-btn');
    if (addBtn) addBtn.addEventListener('click', () => addBlankSpreads(1));
    if (remBtn) remBtn.addEventListener('click', () => removeLastSpread());
    // ensure indices set on load
    updateIndices();
}

// Export helpers
window.addSpread = addSpread;
window.addBlankSpreads = addBlankSpreads;
window.removeLastSpread = removeLastSpread;

/* ===== Page Manager UI ===== */
function openPageManager() {
    const modal = document.getElementById('page-manager');
    if (!modal) return;
    modal.style.display = 'block';
    renderPageManager();
}

function closePageManager() {
    const modal = document.getElementById('page-manager');
    if (!modal) return;
    modal.style.display = 'none';
}

function renderPageManager() {
    const list = document.getElementById('page-list');
    const preview = document.getElementById('pm-preview');
    const frontTA = document.getElementById('pm-front');
    const backTA = document.getElementById('pm-back');
    if (!list) return;
    list.innerHTML = '';
    const book = getBookEl();
    const pages = book ? Array.from(book.querySelectorAll('.page')) : [];
    pages.forEach((p, idx) => {
        const row = document.createElement('div');
        row.style.padding = '8px';
        row.style.borderBottom = '1px solid #eee';
        row.style.cursor = 'pointer';
        const title = document.createElement('div');
        title.textContent = `${idx}: ${p.id || ''}`;
        const snippet = document.createElement('div');
        snippet.style.fontSize = '12px';
        snippet.style.color = '#666';
        snippet.textContent = p.textContent.trim().substring(0, 120).replace(/\s+/g,' ');
        row.appendChild(title);
        row.appendChild(snippet);
        row.addEventListener('click', () => {
            // preview and populate editor
            preview.innerHTML = '';
            const clone = p.cloneNode(true);
            clone.style.width = '100%';
            preview.appendChild(clone);
            const front = p.querySelector('.front');
            const back = p.querySelector('.back');
            frontTA.value = front ? front.innerHTML : '';
            backTA.value = back ? back.innerHTML : '';
            // attach selected id to modal for actions
            const modal = document.getElementById('page-manager');
            modal.dataset.selected = p.id || idx;
            modal.dataset.selectedIndex = idx;
        });
        list.appendChild(row);
    });
}

// Wire manager buttons
document.addEventListener('DOMContentLoaded', function() {
    const pmBtn = document.getElementById('page-manager-btn');
    if (pmBtn) pmBtn.addEventListener('click', openPageManager);
    const pmClose = document.getElementById('pm-close');
    if (pmClose) pmClose.addEventListener('click', closePageManager);
    const pmAdd = document.getElementById('pm-add');
    if (pmAdd) pmAdd.addEventListener('click', () => { addBlankSpreads(1); renderPageManager(); });
    const pmSave = document.getElementById('pm-save');
    const pmExport = document.getElementById('pm-export');
    const pmDelete = document.getElementById('pm-delete');
    if (pmSave) pmSave.addEventListener('click', function(){
        const modal = document.getElementById('page-manager');
        const idx = parseInt(modal.dataset.selectedIndex || '0', 10);
        const book = getBookEl();
        const pages = book ? Array.from(book.querySelectorAll('.page')) : [];
        const frontTA = document.getElementById('pm-front');
        const backTA = document.getElementById('pm-back');
        if (pages[idx]) {
            const front = pages[idx].querySelector('.front');
            const back = pages[idx].querySelector('.back');
            if (front) front.innerHTML = frontTA.value;
            if (back) back.innerHTML = backTA.value;
            renderPageManager();
        }
    });
    if (pmExport) pmExport.addEventListener('click', function(){
        const modal = document.getElementById('page-manager');
        const idx = parseInt(modal.dataset.selectedIndex || '0', 10);
        exportPageToPDFIndex(idx);
    });
    if (pmDelete) pmDelete.addEventListener('click', function(){
        const modal = document.getElementById('page-manager');
        const idx = parseInt(modal.dataset.selectedIndex || '0', 10);
        const book = getBookEl();
        const pages = book ? Array.from(book.querySelectorAll('.page')) : [];
        if (pages.length <= 1) { alert('Cannot delete the last page'); return; }
        if (pages[idx]) pages[idx].remove();
        updateIndices();
        renderPageManager();
    });
});

/* ===== Export to PDF (per page index) ===== */
function exportPageToPDFIndex(index) {
    const book = getBookEl();
    if (!book) return;
    const pages = Array.from(book.querySelectorAll('.page'));
    if (!pages[index]) return;
    const pageEl = pages[index];
    exportPageToPDF(pageEl, `page-${index}.pdf`);
}

function exportPageToPDF(pageEl, filename) {
    // Open a new window, write page content and styles, then print
    const w = window.open('', '_blank');
    if (!w) { alert('Popup blocked. Allow popups to export PDF.'); return; }
    const doc = w.document;
    doc.open();
    const cssLinks = `
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="flipbook.css">
        <link rel="stylesheet" href="mobile.css">
        <style>body{margin:0; background:#fff; color:#111;} .export-wrap{width:100%; display:flex; gap:8px; padding:18px;}</style>
    `;
    const clone = pageEl.cloneNode(true);
    // Wrap clone inside export container
    const html = `<!doctype html><html><head><meta charset="utf-8">${cssLinks}</head><body><div class="export-wrap">${clone.outerHTML}</div><script>window.onload=function(){setTimeout(function(){window.print();},200);};</script></body></html>`;
    doc.write(html);
    doc.close();
}

