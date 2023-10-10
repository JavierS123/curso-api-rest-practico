searchFormBtn.addEventListener('click', () =>{
  location.hash = '#search='
})
trendingBtn.addEventListener('click', () =>{
  location.hash = '#trends';
})
arrowBtn.addEventListener('click', () =>{
  location.hash = '#home'
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
  
  getTrendingMoviesPreview();
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
 
}

function trendsPage() {
  console.log('TRENDS!!');

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
 
}