searchFormBtn.addEventListener('click', () => {

  location.hash = `#search=${searchFormInput.value.trim()}`;
})
trendingBtn.addEventListener('click', () => {
  location.hash = '#trends';
})
arrowBtn.addEventListener('click', () => {
 history.back();
})

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
  console.log({ location });

  if (location.hash.startsWith('#trends')) {
    trendsPage();
  } else if (location.hash.startsWith('#search=')) {
    searchPage();
  } else if (location.hash.startsWith('#movie=')) {
    movieDetailsPage();
  } else if (location.hash.startsWith('#category=')) {
    categoriesPage();
  } else {
    homePage();
  }
  window.scrollTo(0,0)
}


function homePage() {
  console.log('Home!!');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = ""
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');

  searchForm.classList.remove('inactive');
  arrowBtn.classList.add('inactive');
  arrowBtn.classList.remove('header-arrow--white');


  trendingPreviewSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');
  genericSection.classList.add('inactive')
  movieDetailSection.classList.add('inactive');
  

  //trends section
  getAndAppendMovies(`${API_BASE_URL}${TRENDING_ALL_DAY}`, API_CONFIG, trendingMoviesPreviewList, undefined, true);
  getCategoriesPreview();
  
}

function categoriesPage() {
  console.log('categories!!');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = ""
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');

  searchForm.classList.add('inactive');
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');


  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive')
  movieDetailSection.classList.add('inactive');

  const [, categoryData] = location.hash.split('=');
  const [categoryId, categoryName] = categoryData.split('-')
  const titleName = categoryName.replace('%20', ' ');
  console.log(categoryId)
  headerCategoryTitle.innerHTML = titleName;
  //getMoviesByCategory(categoryId);

  //get movies by category
  getAndAppendMovies(`${API_BASE_URL}${DISCOVER_MOVIES}?language=en-US&page=1&with_genres=${categoryId}`, API_CONFIG, genericSection, categoryId, true);
}

function movieDetailsPage() {
  console.log('Movie!!');

  headerSection.classList.add('header-container--long');
  //headerSection.style.background = ""
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');

  searchForm.classList.add('inactive');
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.add('inactive')
  movieDetailSection.classList.remove('inactive');

  // ['#search', 'query'];
  const [_, movieId] = location.hash.split('=');
  console.log(movieId)
  getMovieById(movieId);
}

function searchPage() {
  console.log('Search!!');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = ""
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');

  searchForm.classList.remove('inactive');
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');


  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive')
  movieDetailSection.classList.add('inactive');

  // ['#search', 'query'];
  const [_, query] = location.hash.split('=');
  getAndAppendMovies(`${API_BASE_URL}/search/movie?query=${query}`, API_CONFIG, genericSection, undefined, true);
}

function trendsPage() {
  console.log('TRENDS!!');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = ""
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  headerCategoryTitle.innerHTML = 'Tendencias'

  searchForm.classList.add('inactive');
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');


  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive')
  movieDetailSection.classList.add('inactive');

  getAndAppendMovies(`${API_BASE_URL}${TRENDING_ALL_DAY}`, API_CONFIG, genericSection, undefined, true);
}