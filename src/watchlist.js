import { renderMovieList } from "/utils.js";

const mainEl = document.querySelector("main");

async function renderMain() {
  if (localStorage.length > 0) {
    mainEl.classList.remove("default");
    await renderMovieList(Object.values(localStorage));
  } else {
    mainEl.classList.add("default");
    mainEl.innerHTML = `
    <h2>Your watchlist is looking a little empty...</h2>
    <a class="add-movies-btn" href="/index.html">
      <img src="/add-icon.png" class="add-movies-icon" />
      <h4>Let's add some movies!</h4>
    </a>
  `;
  }
}

renderMain();

mainEl.addEventListener("click", async (event) => {
  const btn = event.target.closest(".add-movie-btn");
  if (!btn) return;
  localStorage.removeItem(btn.id);
  await renderMain();
});
