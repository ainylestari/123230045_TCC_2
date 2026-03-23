const API = "/notes";

let editId = null;

// LOAD DATA
async function loadNotes() {
    const res = await fetch(API);
    const data = await res.json();

    const container = document.getElementById('notes');
    container.innerHTML = '';

    data.forEach(note => {
        const div = document.createElement('div');
        div.className = 'note';

        div.innerHTML = `
            <h3>${note.judul}</h3>
            <p>${note.isi}</p>
            <small>${formatDate(note.createdAt)}</small><br><br>
        `;

        const btnEdit = document.createElement('button');
        btnEdit.textContent = 'Edit';
        btnEdit.onclick = () => editNote(note);

        const btnDelete = document.createElement('button');
        btnDelete.textContent = 'Hapus';
        btnDelete.onclick = () => deleteNote(note.id);

        div.appendChild(btnEdit);
        div.appendChild(btnDelete);

        container.appendChild(div);
    });
}

// FORMAT TANGGAL
function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleString();
}

// TAMBAH / UPDATE
async function saveNote() {
    const judul = document.getElementById('judul').value;
    const isi = document.getElementById('isi').value;

    if (!judul || !isi) {
        alert("Isi semua field!");
        return;
    }

    if (editId) {
        await fetch(`${API}/${editId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ judul, isi })
        });

        editId = null;
    } else {
        await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ judul, isi })
        });
    }

    resetForm();
    loadNotes();
}

// EDIT
function editNote(note) {
    document.getElementById('judul').value = note.judul;
    document.getElementById('isi').value = note.isi;

    editId = note.id;
}

// DELETE
async function deleteNote(id) {
    if (!confirm("Yakin mau hapus?")) return;

    await fetch(`${API}/${id}`, {
        method: 'DELETE'
    });

    loadNotes();
}

// RESET FORM
function resetForm() {
    document.getElementById('judul').value = '';
    document.getElementById('isi').value = '';
    editId = null;
}

loadNotes();