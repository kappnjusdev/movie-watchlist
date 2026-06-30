import { renderMovieList } from "../utils.js";

const searchForm = document.getElementById("search-bar");
const searchInput = document.getElementById("search-input");
const mainEl = document.querySelector("main");

mainEl.classList.add("default");
mainEl.innerHTML = `
  <img src="/movie-tape-icon.png" />
  <h2>Start exploring</h2>
`;

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const movie = searchInput.value.trim().toLowerCase();

  try {
    const response = await fetch(
      `/.netlify/functions/search?s=${encodeURIComponent(movie)}`,
    );

    if (!response.ok) {
      throw new Error("Something is wrong with the server!");
    }

    const data = await response.json();

    if (data.Response === "False") {
      throw new Error("Movie not found!");
    }

    const movieIds = data.Search.map((movie) => movie.imdbID);
    await renderMovieList(movieIds);
  } catch (error) {
    console.error(error);
    mainEl.classList.remove("default");
    mainEl.classList.add("null-search");
    mainEl.innerHTML = `
      <h2>Unable to find what you're looking for. Please try another search.</h2>
    `;
  }
});

mainEl.addEventListener("click", (event) => {
  const btn = event.target.closest(".add-movie-btn");
  if (!btn) return;
  toggleWatchList(btn);
});

function toggleWatchList(btn) {
  if (!localStorage.getItem(btn.id)) {
    localStorage.setItem(btn.id, btn.id);
    btn.children[0].src = "/remove-icon.png";
    btn.children[1].innerText = "Remove";
  } else {
    localStorage.removeItem(btn.id);
    btn.children[0].src = "/add-icon.png";
    btn.children[1].innerText = "Watchlist";
  }
}
