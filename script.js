const note = document.getElementById("note");
const status = document.getElementById("status");

// Sayfa açılınca eski notu yükle
note.value = localStorage.getItem("autoNote") || "";

// Her 1 saniyede bir kaydet
setInterval(() => {
  localStorage.setItem("autoNote", note.value);
  status.textContent = "✔ Kaydedildi: " + new Date().toLocaleTimeString();
}, 1000);
