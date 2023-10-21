const API_BASE_URL = 'https://api.themoviedb.org/3/';
const API_CONFIG = {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${API_KEY_BEARER}`,
        accept: 'application/json',
    }
};
const API_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';
const TRENDING_ALL_DAY = 'trending/movie/day';
const TRENDING_ALL_WEEK = 'trending/movie/week';
const GENRE_MOVIES = 'genre/movie/list'
const DISCOVER_MOVIES = 'discover/movie'


//Lazy loading optimization
const lazyLoader = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const url = entry.target.getAttribute('data-img');
                entry.target.setAttribute('src', url)
            }
        })
    })

function likedMoviesList() {
    const item = JSON.parse(localStorage.getItem('liked_movies'));
    let movies;
    if (item) {
        movies = item;
    } else {
        movies = {}
    }
    return movies
}
function likeMovie(movie) {
    const likedMovies = likedMoviesList();
    if (likedMovies[movie.id]) {
        likedMovies[movie.id] = undefined;
    } else {
        likedMovies[movie.id] = movie;
    }
    localStorage.setItem('liked_movies',JSON.stringify(likedMovies));
}
//el parametro lazyLoad es para poder alternar si quieres secciones con lazyload
//clean es para limpiar el html
function createMovies(movies, container, lazyLoad, clean = true) {
    if (clean) {
        container.innerHTML = "";
    }

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieTitle = movie.title;

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            lazyLoad ? 'data-img' : 'src',
            `${API_IMAGE_BASE_URL}${movie.poster_path}`)

        movieImg.addEventListener('click', () => {
            movieURL = `#movie=${movie.id}`
            location.hash = movieURL;
        })

        const movieBtn = document.createElement('button');
        movieBtn.classList.add('movie-btn');

        likedMoviesList()[movie.id] && movieBtn.classList.add('movie-btn--liked')
        movieBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            movieBtn.classList.toggle('movie-btn--liked');
            likeMovie(movie);
            getLikedMovies();
        })
        if (lazyLoad) {
            lazyLoader.observe(movieImg);
        }

        movieContainer.appendChild(movieImg);
        movieContainer.appendChild(movieBtn)
        container.appendChild(movieContainer);
    })
}

function createCategories(categories, container) {
    container.innerHTML = '';

    categories.forEach(category => {
        const CATEGORY_CONTAINER = document.createElement('div');
        CATEGORY_CONTAINER.classList.add('category-container');

        const CATEGORY_TITLE = document.createElement('h3');
        CATEGORY_TITLE.classList.add('category-title');
        CATEGORY_TITLE.setAttribute('id', `id${category.id}`);
        CATEGORY_TITLE.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`
        })
        const CATEGORY_TITLE_TEXT = document.createTextNode(category.name);

        CATEGORY_TITLE.appendChild(CATEGORY_TITLE_TEXT)
        CATEGORY_CONTAINER.appendChild(CATEGORY_TITLE);
        container.appendChild(CATEGORY_CONTAINER);
    })
}

async function getCategoriesPreview() {
    const res = await fetch(`${API_BASE_URL}${GENRE_MOVIES}`, API_CONFIG)
    const data = await res.json();
    console.log(data, 'esta es la data de categories')
    //ya que el objeto anterior simplemente contiene 'genres' se lo asigno a la variable y empiezo a acceder sus propiedades internas;
    const categories = data.genres;
    createCategories(categories, categoriesPreviewList);
}

//el parametro lazyLoad es para poder alternar si quieres secciones con lazyload o no.
async function getAndAppendMovies(api_url, api_config, parentContainer, id, lazyLoad = false) {
    const res = await fetch(api_url, api_config);
    const data = await res.json();
    //llamado a la api, almacenas la respuesta en data
    console.log(data) // para ver la estructura de la respuesta
    const movies = data.results

    createMovies(movies, parentContainer, lazyLoad)
}

async function getMovieById(id) {
    const res = await fetch(`${API_BASE_URL}movie/${id}`, API_CONFIG);
    const data = await res.json();
    const movieImgURL = `https://image.tmdb.org/t/p/w500${data.poster_path}`
    console.log(data)

    headerSection.style.background = `linear-gradient(
        180deg, 
        rgba(0, 0, 0, 0.35) 19.27%, 
        rgba(0, 0, 0, 0) 29.17%
        ), url(${movieImgURL})`

    movieDetailTitle.textContent = data.title;
    movieDetailDescription.textContent = data.overview;
    movieDetailScore.textContent = data.vote_average.toFixed(1);

    createCategories(data.genres, movieDetailCategoriesList);
    getRelatedMoviesByID(id);
}

async function getRelatedMoviesByID(id) {
    const res = await fetch(`${API_BASE_URL}movie/${id}/recommendations`, API_CONFIG);
    const data = await res.json();
    console.log(data, 'data')
    const relatedMovies = data.results;
    console.log(relatedMovies, 'relatedMovies')
    createMovies(relatedMovies, relatedMoviesContainer)

}

async function getPaginatedTrendingMovies(container, page = 1) {


    const res = await fetch(`${API_BASE_URL}${TRENDING_ALL_DAY}?page=${page}`, API_CONFIG);
    const data = await res.json();
    console.log(data, 'paginated trending data');
    const paginatedMovies = data.results;
    maxPage = data.total_pages;
    console.log(maxPage)
    createMovies(paginatedMovies, container, true, page == 1)

    

    /*const btnLoadMore = document.createElement('button');
    btnLoadMore.innerText = "Load more"
    btnLoadMore.classList.add('trendingPreview-btn')
    btnLoadMore.style.margin = "0 auto"
    btnLoadMore.addEventListener('click', () => {
        btnLoadMore.remove();
        getPaginatedTrendingMovies(genericSection, page += 1)
    })
    container.appendChild(btnLoadMore)*/
}

function getLikedMovies(){
    const likedMovies = likedMoviesList();
    
    const moviesArray = Object.values(likedMovies);

    createMovies(moviesArray, likedMoviesListContainer, true, true)
    console.log(likedMovies)
    console.log('se ejecuta getlikedmovies');
}