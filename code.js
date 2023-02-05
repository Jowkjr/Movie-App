const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";

const API_URL_TV =
  "https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";

const API_URL_Kids =
  "https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");
const btnCategory = document.querySelectorAll(".btnCategory");
generatorMovies(API_URL);
btnCategory.forEach((category) => {
  category.addEventListener("click", (e) => {
    remove();
    category.classList.add("active");
    if (category.value === "movie") {
      generatorMovies(API_URL);
    } else if (category.value === "tv") {
      generatorMovies(API_URL_TV);
    } else {
      generatorMovies(API_URL_Kids);
    }
  });
});

function remove() {
  btnCategory.forEach((category) => {
    category.classList.remove("active");
  });
}

async function generatorMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `<div class="movie">
    <img src="${IMG_PATH + poster_path}" alt="${title}" />
    <div class="movie-info">
      <h2>${title}</h2>
      <span class="${getRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h2>Overview</h2>
      ${overview}
    </div>
  </div>`;
    main.appendChild(movieEl);
  });
}

function getRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("keyup", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    generatorMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});
