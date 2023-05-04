import { Notify } from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import {fetchPictures} from "./fetchPictures";


const form = document.querySelector('#search-form');
const containerGallery = document.querySelector('.gallery');

const target = document.querySelector('.js-guard');

let currentPage = 1;

let gallery = new SimpleLightbox('.gallery a',{
    captionDelay: 250,
});

form.addEventListener('submit', onSearch);
function onSearch(evt){
    evt.preventDefault();
    const {searchQuery} = evt.currentTarget.elements;

    fetchPictures(searchQuery.value)
    .then(datas =>{
        const {hits, totalHits, total} = datas.data;

        if (!hits.length){
            return Notify.failure(
                'Sorry, there are no images matching your search query. Please try again.'
            );
        } else {
            containerGallery.innerHTML = createPictures(datas.data.hits);
            document.body.backgroundSize = 'contain';
            observer.observe(target);
            gallery.refresh();
            Notify.info(`Hooray! We found ${totalHits} images.`);
        }
        if (total === history.length){
            observer.unobserve(target);
            return Notify.failure(
                `We're sorry, but you've reached the end of search results.`
            )
        }
    })
    .catch(err => console.log(err));


} 


function createPictures(arr){
    return arr
    .map(
    ({
        webformatURL,
        largeImageURL, 
        tags, 
        likes, 
        views,
        comments, 
        downloads, 
    }) => 
    `<div class="photo-card">
    < a class="link-img" href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" width="300px" height="200px" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b> ${likes}
      </p>
      <p class="info-item">
        <b>Views</b>${views}
      </p>
      <p class="info-item">
        <b>Comments</b>${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>${downloads}
      </p>
    </div>
  </div>`
    )
    .join('');
}