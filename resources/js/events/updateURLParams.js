export function updateURLParams(params = {}) {
    const url = new URL(window.location.href);
    const search = url.searchParams;

    Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
            search.delete(key); // hapus jika kosong
        } else {
            search.set(key, value); // tambah / update
        }
    });

    // Push ke history tanpa reload
    window.history.replaceState({}, '', url.toString());
}
