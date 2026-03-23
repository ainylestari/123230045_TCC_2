const API = "http://localhost:3000/notes";

let editId = null;

// LOAD DATA
async function loadNotes() {
    const res = await fetch(API);
    const data = await res.json();

    const container = document.getElementById('notes');
    container.innerHTML = '';

    data.forEach(note => {
        container.innerHTML += `
            <div style="border:1px solid #ccc; padding:10px; margin:10px;">
                <h3>${note.judul}</h3>
                <p>${note.isi}</p>
                <small>${note.createdAt}</small><br><br>
                <button onclick="editNote(${note.id}, '${note.judul}', '${note.isi}')">Edit</button>
                <button onclick="deleteNote(${note.id})">Hapus</button>
            </div>
        `;
    });
}

// TAMBAH / UPDATE
async function saveNote() {
    const judul = document.getElementById('judul').value;
    const isi = document.getElementById('isi').value;

    if (editId) {
        // UPDATE
        await fetch(`${API}/${editId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ judul, isi })
        });

        editId = null;
    } else {
        // CREATE
        await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ judul, isi })
        });
    }

    document.getElementById('judul').value = '';
    document.getElementById('isi').value = '';

    loadNotes();
}

// EDIT (isi form)
function editNote(id, judul, isi) {
    document.getElementById('judul').value = judul;
    document.getElementById('isi').value = isi;

    editId = id;
}

// DELETE
async function deleteNote(id) {
    await fetch(`${API}/${id}`, {
        method: 'DELETE'
    });

    loadNotes();
}

loadNotes();