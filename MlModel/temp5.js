// document.addEventListener("DOMContentLoaded", function () {
//     const carousel = document.querySelector('.carousel');
//     const cardsContainer = document.querySelector('.cards-container');
//     const cards = document.querySelectorAll('.card');
//     const prevBtn = document.querySelector('.prev-btn');
//     const nextBtn = document.querySelector('.next-btn');

//     let currentIndex = 0;
//     const cardWidth = cards[0].offsetWidth + 20;

//     prevBtn.addEventListener('click', function () {
//         if (currentIndex > 0) {
//             currentIndex--;
//             updateCardsPosition();
//         }
//     });

//     nextBtn.addEventListener('click', function () {
//         if (currentIndex < cards.length - 3) {
//             currentIndex++;
//             updateCardsPosition();
//         }
//     });

//     function updateCardsPosition() {
//         const newPosition = -currentIndex * cardWidth;
//         cardsContainer.style.transform = `translateX(${newPosition}px)`;
//     }
// });

document.addEventListener("DOMContentLoaded", function() {
    const carousels = document.querySelectorAll('.carousel');
  
    carousels.forEach(function(carousel) {
      const cardsContainer = carousel.querySelector('.cards-container');
      const cards = carousel.querySelectorAll('.card');
      const prevBtn = carousel.querySelector('.prev-btn');
      const nextBtn = carousel.querySelector('.next-btn');
  
      let currentIndex = 0;
      const cardWidth = cards[0].offsetWidth + 25;
  
      prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
          currentIndex--;
          updateCardsPosition('prev');
        }
      });
  
      nextBtn.addEventListener('click', function() {
        if (currentIndex < cards.length - 3) {
          currentIndex++;
          updateCardsPosition('next');
        }
      });
  
      function updateCardsPosition(direction) {
        const newPosition = -currentIndex * cardWidth;
        cardsContainer.style.transition = 'transform 1s ease';
        cardsContainer.style.transform = `translateX(${newPosition}px)`;
  
        // Reset transition after animation completes
        setTimeout(() => {
          cardsContainer.style.transition = '';
        }, 500);
      }
    });
  });
  