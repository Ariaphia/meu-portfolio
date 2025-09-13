// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const close = document.getElementsByClassName("close")[0];

document.querySelectorAll(".grid img").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = img.src;
  });
});

close.onclick = () => {
  lightbox.style.display = "none";
};

window.onclick = (e) => {
  if (e.target == lightbox) {
    lightbox.style.display = "none";
  }
};
