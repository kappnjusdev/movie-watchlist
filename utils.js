const mainEl = document.querySelector("main");
const cache = new Map();

async function fetchMovie(id) {
  if (!cache.has(id)) {
    const res = await fetch(`/.netlify/functions/movie?i=${id}`);
    cache.set(id, await res.json());
  }
  return cache.get(id);
}

export async function renderMovieList(movies) {
  const results = await Promise.all(movies.map(fetchMovie));

  const html = results
    .map((movie) => {
      const movieId = movie.imdbID;
      return `
        <div class="movie-container">
          <img src="${movie.Poster}" class="movie-poster"/>
          <div class="movie-info-container">
            <div class="movie-header">
              <h3>${movie.Title}</h3>
              <img src="/favorite-icon.png" />
              <span class="movie-rating">${movie.imdbRating}</span>
            </div>
            <div class="movie-info">
              <p>${movie.Runtime}</p>
              <p>${movie.Genre}</p>
              <button class="add-movie-btn" id="${movieId}">
                <img
                  src="${localStorage.getItem(movieId) ? "/remove-icon.png" : "/add-icon.png"}"
                  class="add-movie-icon"
                />
                <span>${localStorage.getItem(movieId) ? "Remove" : "Watchlist"}</span>
              </button>
            </div>
            <p class="movie-plot">${movie.Plot}</p>
          </div>
        </div>
      `;
    })
    .join("");

  mainEl.classList.remove("default");
  mainEl.innerHTML = html;
}
