document.addEventListener("DOMContentLoaded", function () {
  function loadPage(page) {
      fetch(page) 
          .then(response => response.text())
          .then(data => {
              document.getElementById("content").innerHTML = data;
              if (document.getElementById("gallery")) {
                initializeGallery(); 
            }
          })
          .catch(error => console.log("Error loading page:", error));
  }

  const page = window.location.hash.substring(1) || "intro";
  loadPage(`${page}.html`);

  document.querySelectorAll("nav a").forEach(link => {
      link.addEventListener("click", function (event) {
          event.preventDefault();
          const page = this.getAttribute("href").replace(".html", "");
          window.location.hash = page;
          loadPage(`${page}.html`);
      });
  });

  function initializeGallery() {
    const gallery = document.getElementById("gallery");

    const modal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-image");
    const modalCaption = document.getElementById("modal-caption");
    const closeModal = document.getElementById("close-modal");
    const prevImage = document.getElementById("prev-image");
    const nextImage = document.getElementById("next-image");

    let currentIndex = null; 

    if (gallery) {
        gallery.addEventListener("click", function (event) {
            if (event.target.tagName === "IMG") {
                const clickedImage = event.target;

                modal.style.display = "flex"; 
                modalImage.src = clickedImage.src; 
                modalImage.alt = clickedImage.alt;
                modalCaption.textContent = clickedImage.alt;

                const images = Array.from(gallery.getElementsByTagName("img"));
                currentIndex = images.indexOf(clickedImage);
            }
        });
    }

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    prevImage.addEventListener("click", function () {
        const images = gallery.getElementsByTagName("img");
        if (currentIndex > 0) {
            currentIndex--;
            modalImage.src = images[currentIndex].src;
            modalImage.alt = images[currentIndex].alt;
            modalCaption.textContent = images[currentIndex].alt;
        }
    });

    nextImage.addEventListener("click", function () {
        const images = gallery.getElementsByTagName("img");
        if (currentIndex < images.length - 1) {
            currentIndex++;
            modalImage.src = images[currentIndex].src;
            modalImage.alt = images[currentIndex].alt;
            modalCaption.textContent = images[currentIndex].alt;
        }
    });

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
  }
});
