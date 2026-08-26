// Not Veri Yapısı ve Değişkenler
let notes = JSON.parse(localStorage.getItem('my_notepad_notes')) || [];
let activeNoteId = null;

const titleInput = document.getElementById('noteTitleInput');
const contentInput = document.getElementById('noteContentInput');
const notesList = document.getElementById('notesList');
const saveBtn = document.getElementById('saveNoteBtn');
const saveAsNewBtn = document.getElementById('saveAsNewBtn');
const newNoteBtn = document.getElementById('newNoteBtn');

// Site açıldığında editör alanlarını temizle (Madde 5)
window.addEventListener('DOMContentLoaded', () => {
  clearInputs();
  renderNotesList();
});

// Girdi Alanlarını Temizleme Fonksiyonu
function clearInputs() {
  titleInput.value = '';
  contentInput.value = '';
  activeNoteId = null;
  renderNotesList();
}

// Menüyü Ekrana Çizme (Madde 2 & 4)
function renderNotesList() {
  notesList.innerHTML = '';
  
  notes.forEach(note => {
    const btn = document.createElement('button');
    btn.className = 'note-item-btn';
    if (note.id === activeNoteId) {
      btn.classList.add('active');
    }
    btn.textContent = note.title;

    // Tıklandığında notu editöre aktar (Madde 4)
    btn.addEventListener('click', () => {
      activeNoteId = note.id;
      titleInput.value = note.title;
      contentInput.value = note.content;
      renderNotesList();
    });

    notesList.appendChild(btn);
  });
}

// Yerel Depolamaya Kaydetme
function saveToStorage() {
  localStorage.setItem('my_notepad_notes', JSON.stringify(notes));
  renderNotesList();
}

// 1. "NOTU KAYDET" (Madde 3: Aktif not varsa günceller, yoksa yeni oluşturur)
saveBtn.addEventListener('click', () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title) {
    alert('Lütfen nota bir isim verin!');
    return;
  }

  if (activeNoteId !== null) {
    // Var olan notu güncelle
    const index = notes.findIndex(n => n.id === activeNoteId);
    if (index !== -1) {
      notes[index].title = title;
      notes[index].content = content;
    }
  } else {
    // Seçili not yoksa yeni not ekle
    const newNote = { id: Date.now(), title, content };
    notes.push(newNote);
    activeNoteId = newNote.id;
  }

  saveToStorage();
});

// 2. "YENİ NOT OLARAK KAYDET" (Madde 3: Her zaman yeni bir not ekler)
saveAsNewBtn.addEventListener('click', () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title) {
    alert('Lütfen nota bir isim verin!');
    return;
  }

  const newNote = { id: Date.now(), title, content };
  notes.push(newNote);
  activeNoteId = newNote.id;

  saveToStorage();
});

// 3. "YENİ NOT OLUŞTUR" (Madde 5: Editörü sıfırlar, yeni nota hazırlar)
newNoteBtn.addEventListener('click', () => {
  clearInputs();
});
