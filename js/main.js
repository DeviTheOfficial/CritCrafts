// js/main.js

const cardData = [
    { label: 'Arduino Projects', img: 'assets/images/arduino.png', description: 'Get inspired by creative Arduino projects and circuits.', url: 'cards/arduino-projects.html' },
    { label: 'CS2 Skins',        img: 'assets/images/pistol.png',  description: 'Explore the latest CS2 skins for your weapons.', url: 'cards/cs2-skins.html' },
    { label: 'Minecraft Mods',   img: 'assets/images/minecraft-logo.png', description: 'Browse essential Minecraft mods to enhance your gameplay.', url: 'cards/minecraft-mods.html' },
    { label: 'Pixel Art',        img: 'assets/images/pixel-art.png', description: 'Dive into unique pixel art designs and tutorials.', url: 'cards/pixel-art.html' }
  ];
  
  document.addEventListener('DOMContentLoaded', () => {
    const grid        = document.getElementById('craft-grid');
    const searchInput = document.getElementById('search');
    const randomBtn   = document.getElementById('random-btn');
    const sound       = document.getElementById('click-sound');
  
    function renderCards(cards) {
      grid.innerHTML = '';
      cards.forEach(({ label, img, description, url }) => {
        const card = document.createElement('a');
        card.className     = 'card';
        card.href          = url;
        card.target        = '_self';
        card.dataset.label = label;
        card.innerHTML = `
          <div class="card-inner">
            <div class="card-front">
              <img src="${img}" alt="${label}" />
              <div class="label">${label}</div>
            </div>
            <div class="card-back">
              <p>${description}</p>
            </div>
          </div>
        `;
  
        card.addEventListener('click', e => {
          e.preventDefault();
          const inner = card.querySelector('.card-inner');
          inner.classList.remove('flipped');    // ensure front shows
          card.classList.add('loading');        // block hover & show shot
          sound.currentTime = 0;
          sound.play();
          sound.addEventListener('ended', () => {
            window.location.href = url;
          }, { once: true });
        });
  
        grid.appendChild(card);
      });
    }
  
    // initial render
    cardData.sort((a, b) => a.label.localeCompare(b.label));
    renderCards(cardData);
  
    function allCards() {
      return Array.from(document.querySelectorAll('.card'));
    }
    function filterTo(term) {
      allCards().forEach(card => {
        card.style.display = card.dataset.label.toLowerCase().includes(term) ? '' : 'none';
      });
    }
  
    searchInput.addEventListener('input', e => filterTo(e.target.value.toLowerCase()));
  
    randomBtn.addEventListener('click', () => {
      searchInput.value = '';
      allCards().forEach(c => (c.style.display = ''));
      const pick = allCards()[Math.floor(Math.random() * allCards().length)];
      allCards().forEach(c => (c.style.display = c === pick ? '' : 'none'));
      pick.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
  