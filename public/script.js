const API = "/notes";
    let editId = null;

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
          <small>🕒 ${formatDate(note.createdAt)}</small>
          <div class="action">
            <button class="edit-btn" onclick='editNote(${JSON.stringify(note)})'>Edit</button>
            <button class="delete-btn" onclick='deleteNote(${note.id})'>Hapus</button>
          </div>
        `;

        container.appendChild(div);
      });
    }

    function formatDate(date) {
      const d = new Date(date);
      return d.toLocaleString();
    }

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

    function editNote(note) {
      document.getElementById('judul').value = note.judul;
      document.getElementById('isi').value = note.isi;
      editId = note.id;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async function deleteNote(id) {
      if (!confirm("Yakin mau hapus catatan ini?")) return;

      await fetch(`${API}/${id}`, {
        method: 'DELETE'
      });

      loadNotes();
    }

    function resetForm() {
      document.getElementById('judul').value = '';
      document.getElementById('isi').value = '';
      editId = null;
    }

    loadNotes();