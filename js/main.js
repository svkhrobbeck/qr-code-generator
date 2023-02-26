const elForm = document.querySelector("[data-form]"),
  elCard = document.querySelector("[data-card]"),
  elQrImg = document.querySelector("[data-qr-img]"),
  elSubmitBtn = document.querySelector("[data-submit-btn]");

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let qrValue = elForm.text.value;

  if (!qrValue) return;

  elQrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${qrValue}`;

  elSubmitBtn.textContent = "Generating...";

  elQrImg.addEventListener("load", (evt) => {
    elCard.classList.add("active");
    elSubmitBtn.textContent = "Generate QR Code";
  });
});

elForm.text.addEventListener("keyup", () => {
  if (!elForm.text.value) {
    elCard.classList.remove("active");
  }
});
