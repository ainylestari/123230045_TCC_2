const API = "https://notes-backend-194342266835.asia-southeast2.run.app/notes";
let editId = null;

// LOAD NOTES
async function loadNotes() {
  const res = await fetch(API);
  const data = await res.json();

  const container = document.getElementById("notes");
  container.innerHTML = "";

  data.forEach(note => {
    const div = document.createElement("div");
    div.className = "note";

    div.innerHTML = `
      <h3>${note.judul}</h3>
      <p>${note.isi}</p>

      <small>${formatDate(note.tanggal_dibuat)}</small>

      <div class="action">
        <button class="edit-btn" onclick='editNote(${JSON.stringify(note)})'>
          Edit
        </button>
        <button class="delete-btn" onclick='deleteNote(${note.id})'>
          Hapus
        </button>
      </div>
    `;

    container.appendChild(div);
  });
}

// FORMAT DATE
function formatDate(date) {
  if (!date) return "-";

  const d = new Date(date);
  return d.toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

// SAVE NOTE
async function saveNote() {
  const judul = document.getElementById("judul").value;
  const isi = document.getElementById("isi").value;

  if (!judul || !isi) {
    alert("Isi semua field!");
    return;
  }

  // otomatis ambil tanggal sekarang
  const tanggal_dibuat = new Date().toISOString();

  if (editId) {
    // UPDATE
    await fetch(`${API}/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        judul,
        isi,
        tanggal_dibuat
      })
    });

    editId = null;
  } else {
    // CREATE
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        judul,
        isi,
        tanggal_dibuat
      })
    });
  }

  resetForm();
  loadNotes();
}

// EDIT NOTE
function editNote(note) {
  document.getElementById("judul").value = note.judul;
  document.getElementById("isi").value = note.isi;

  editId = note.id;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// DELETE NOTE
async function deleteNote(id) {
  if (!confirm("Yakin mau hapus catatan ini?")) return;

  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  loadNotes();
}

// RESET FORM
function resetForm() {
  document.getElementById("judul").value = "";
  document.getElementById("isi").value = "";
  editId = null;
}

// INIT
loadNotes();