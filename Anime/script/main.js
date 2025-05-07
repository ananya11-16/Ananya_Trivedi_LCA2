// Surprise Me button functionality for Hero section

const animeFacts = [
    "Did you know? Spirited Away is the only non-English hand-drawn animated film to win an Oscar!",
    "Naruto's favorite food is ramen!",
    "One Piece is the best-selling manga series of all time.",
    "Attack on Titan was inspired by Muv-Luv Alternative, a visual novel.",
    "The longest-running anime is Sazae-san, airing since 1969.",
    "Death Note was banned in China due to its influence on children.",
    "Dragon Ball's Goku was inspired by Sun Wukong from Journey to the West.",
    "Sailor Moon helped popularize the magical girl genre worldwide.",
    "My Hero Academia's creator is a huge fan of Western superhero comics.",
    "The word 'anime' is just the Japanese pronunciation of 'animation'."
];

const surpriseBtn = document.querySelector('.hero-surprise-btn');

if (surpriseBtn) {
    surpriseBtn.addEventListener('click', function() {
        // Remove any existing fact first
        const existingFact = document.querySelector('.anime-fact-float');
        if (existingFact) existingFact.remove();

        // Pick a random fact
        const fact = animeFacts[Math.floor(Math.random() * animeFacts.length)];
        // Create the floating fact element
        const factDiv = document.createElement('div');
        factDiv.className = 'anime-fact-float';
        factDiv.textContent = fact;
        document.body.appendChild(factDiv);

        // Animate in
        setTimeout(() => {
            factDiv.classList.add('show');
        }, 10);

        // Remove after 5 seconds
        setTimeout(() => {
            factDiv.classList.remove('show');
            setTimeout(() => factDiv.remove(), 500);
        }, 5000);
    });
}

// Add styles for the floating fact
const style = document.createElement('style');
style.textContent = `
.anime-fact-float {
    position: fixed;
    left: 50%;
    top: 20%;
    transform: translate(-50%, -50%) scale(0.8);
    background: rgba(30,30,30,0.97);
    color: #ffcc80;
    padding: 1.2rem 2.2rem;
    border-radius: 10px;
    font-size: 1.2rem;
    font-family: inherit;
    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
    opacity: 0;
    pointer-events: none;
    z-index: 9999;
    transition: opacity 0.5s, transform 0.5s;
}
.anime-fact-float.show {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
}
`;
document.head.appendChild(style);



// Select all the span elements inside the h1 tag
const spans = document.querySelectorAll('.hero h1 span');

// Add event listeners for mouse enter and leave
spans.forEach(span => {
  span.addEventListener('mouseenter', () => {
    span.classList.add('hovered'); // Add 'hovered' class on hover
  });

  span.addEventListener('mouseleave', () => {
    span.classList.remove('hovered'); // Remove 'hovered' class when hover ends
  });
});









// --- Anime Search Bar Functionality (triggered by search icon) ---


const animeList = [
  "Attack on Titan",
  "Demon Slayer",
  "Jujutsu Kaisen",
  "My Hero Academia",
  "One Punch Man",
  "Tokyo Ghoul",
  "Death Note",
  "Naruto",
  "One Piece",
  "Dragon Ball Z",
  "Sailor Moon",
  "Fullmetal Alchemist",
  "Bleach",
  "Hunter x Hunter",
  "Mob Psycho 100",
  "Black Clover"
];

const searchBtn = document.querySelector('.search-btn');
let searchInput, resultsDiv, searchOverlay;

function closeSearchBar() {
  if (searchOverlay) searchOverlay.remove();
  searchInput = null;
  resultsDiv = null;
  searchOverlay = null;
}

function showSearchBar() {
  // Prevent multiple overlays
  if (document.getElementById('searchOverlayAnime')) return;

  // Create overlay
  searchOverlay = document.createElement('div');
  searchOverlay.id = 'searchOverlayAnime';
  searchOverlay.innerHTML = `
    <div class="anime-search-modal">
      <input id="searchInput" type="text" placeholder="Search anime...">
      <div id="results"></div>
    </div>
  `;
  document.body.appendChild(searchOverlay);

  searchInput = document.getElementById('searchInput');
  resultsDiv = document.getElementById('results');

  console.log("Search input's parent element is:", searchInput.parentElement);


  // Focus input
  searchInput.focus();

  // Keydown for search and close
  searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      const query = searchInput.value.trim().toLowerCase();
      if (!query) {
        resultsDiv.innerHTML = '';
        return;
      }
      const matches = animeList.filter(name => name.toLowerCase().includes(query));
      if (matches.length === 0) {
        resultsDiv.innerHTML = '<div class="no-results">No results found.</div>';
      } else {
        resultsDiv.innerHTML = '<ul class="search-results">' +
          matches.map(name => `<li>${name}</li>`).join('') +
          '</ul>';
      }
    } else if (event.key === 'Escape') {
      closeSearchBar();
    }
  });

  // Click outside to close
  searchOverlay.addEventListener('mousedown', function(e) {
    if (e.target === searchOverlay) closeSearchBar();
  });
}

if (searchBtn) {
  searchBtn.addEventListener('click', showSearchBar);
}

// Add basic CSS for search modal
const searchStyle = document.createElement('style');
searchStyle.textContent = `
#searchOverlayAnime {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.45);
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 90px;
}
.anime-search-modal {
  background: #181818;
  border-radius: 14px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.18);
  padding: 32px 28px 22px 28px;
  min-width: 320px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#searchInput {
  width: 320px;
  max-width: 80vw;
  padding: 0.7rem 1rem;
  font-size: 1.1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  transition: border 0.2s;
  margin-bottom: 12px;
}
#searchInput:focus {
  border: 1.5px solid #ff6600;
}
#results {
  min-height: 24px;
  background: #222;
  border-radius: 8px;
  color: #fff;
  font-size: 1.05rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 8px 0 8px 0;
  width: 100%;
}
.search-results {
  list-style: none;
  margin: 0;
  padding: 0;
}
.search-results li {
  padding: 7px 12px;
  border-bottom: 1px solid #333;
  cursor: pointer;
  transition: background 0.2s;
}
.search-results li:last-child {
  border-bottom: none;
}
.search-results li:hover {
  background: #333;
  color: #ffcc80;
}
.no-results {
  color: #ff6666;
  padding: 8px 0 8px 12px;
}
`;
document.head.appendChild(searchStyle);
// --- End Anime Search Bar Functionality ---

