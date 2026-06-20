// Select elements
const images = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const caption = document.querySelector('.caption');

let currentIndex = 0;

// Open lightbox
function openLightbox(index) {
  currentIndex = index;

  lightbox.style.display = "flex";
  document.body.style.overflow = "hidden";

  updateImage();
}

// Update displayed image
function updateImage() {
  lightboxImg.src = images[currentIndex].src;
  lightboxImg.alt = images[currentIndex].alt;
  caption.textContent = images[currentIndex].alt;
}

// Close lightbox
function closeLightbox() {
  lightbox.style.display = "none";
  document.body.style.overflow = "auto";
}

// Next image
function showNext(e) {
  if (e) e.stopPropagation();

  currentIndex++;

  if (currentIndex >= images.length) {
    currentIndex = 0;
  }

  updateImage();
}

// Previous image
function showPrev(e) {
  if (e) e.stopPropagation();

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }

  updateImage();
}

// Attach click to every image
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    openLightbox(index);
  });
});

// Buttons
closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);

// Click outside image closes
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard support
document.addEventListener("keydown", (e) => {

  if (lightbox.style.display !== "flex") return;

  if (e.key === "ArrowRight") {
    showNext();
  }

  if (e.key === "ArrowLeft") {
    showPrev();
  }

  if (e.key === "Escape") {
    closeLightbox();
  }
});

// Prevent image click from closing
lightboxImg.addEventListener("click", (e) => {
  e.stopPropagation();
});
