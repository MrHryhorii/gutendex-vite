const KEY = "favorites";

// get from localStorage
export function loadFavorites() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
}

// save in localStorage
export function saveFavorites(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
}

// add/update (replace by id)
export function upsertFavorite(bookMinimal) {
    const old = loadFavorites();
    const without = old.filter(b => b.id !== bookMinimal.id);
    const next = [bookMinimal, ...without];
    saveFavorites(next);
}

// remove
export function removeFavorite(id) {
    const old = loadFavorites();
    saveFavorites(old.filter(b => b.id !== id));
}


/////////////////////////////////////////////////////////////////////////////

export function onToggle(book) {
    const minimal = {id: book.id, title: book.title};
    upsertFavorite(minimal);
}