const API_BASE_URL = 'https://api.themoviedb.org/3/';
const TRENDING_ALL_DAY = 'trending/all/day';
const TRENDING_ALL_WEEK = 'trending/all/week';
const GENRE_MOVIES = 'genre/movie/list'
const API_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';
const DISCOVER_MOVIES = 'discover/movie'


function createMovies(movies, container){
    container.innerHTML = "";
    
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            'src',
            `${API_IMAGE_BASE_URL}${movie.poster_path}`)

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    })
}

function createCategories(categories, container){
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
    const res = await fetch(`${API_BASE_URL}${GENRE_MOVIES}`, {
        method: 'GET',
        headers: {
            accept: 'application/json;charset=utf-8',
            Authorization: `Bearer ${API_KEY_BEARER}`,
        },
    })
    const data = await res.json();
    console.log(data, 'esta es la data de categories')
    //ya que el objeto anterior simplemente contiene 'genres' se lo asigno a la variable y empiezo a acceder sus propiedades internas;
    const categories = data.genres;
    createCategories(categories, categoriesPreviewList);
}

async function getAndAppendMovies(api_url, api_config, parentContainer, id) {
    const res = await fetch(api_url, api_config);
    const data = await res.json();
    //llamado a la api, almacenas la respuesta en data
    console.log(data) // para ver la estructura de la respuesta
    const movies = data.results

    createMovies(movies, parentContainer)
}

const API_CONFIG = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY_BEARER}`,
    }
};


