const API_BASE_URL = 'https://api.themoviedb.org/3/';
const TRENDING_ALL_DAY = 'trending/all/day';
const TRENDING_ALL_WEEK = 'trending/all/week';
const GENRE_MOVIES = 'genre/movie/list'
const API_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';

async function getTrendingMoviesPreview(){
    //haces el llamado a la api, esto retorna un JSON
    const res = await fetch(`${API_BASE_URL}${TRENDING_ALL_DAY}`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY_BEARER}`,
        }
    })
    //almacenas el JSON en una variable
    const data = await res.json();
    //para ver la estructura del objeto de la API
    console.log(data)
    //empiezas a extraer las propiedades del objeto
    const movies = data.results;
    //esto es un objeto con un objeto interno que tiene las propiedades del API, iteramos para acceder a las propiedades del objeto interno
    //en cada iteracion dentro del objeto va a crear elementos html y asignar las propiedades del objeto para crear html dinamico
    trendingMoviesPreviewList.innerHTML = "";
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
        trendingMoviesPreviewList.appendChild(movieContainer)
    })
}

async function getCategoriesPreview(){
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
    categoriesPreviewList.innerHTML = '';
    
    categories.forEach(category => {
        const CATEGORY_CONTAINER = document.createElement('div');
        CATEGORY_CONTAINER.classList.add('category-container');

        const CATEGORY_TITLE = document.createElement('h3');
        CATEGORY_TITLE.classList.add('category-title');
        CATEGORY_TITLE.setAttribute('id', `id${category.id}`)
        const CATEGORY_TITLE_TEXT = document.createTextNode(category.name);

        CATEGORY_TITLE.appendChild(CATEGORY_TITLE_TEXT)
        CATEGORY_CONTAINER.appendChild(CATEGORY_TITLE);
        categoriesPreviewList.appendChild(CATEGORY_CONTAINER);
    })
}


