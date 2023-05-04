import axios from 'axios';
async function fetchPictures(name, page = 1){
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY_API = '36046838-0b05e687cf37fd856e4032cd7';
    return await axios.get(
        `${BASE_URL}?key=${KEY_API}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );
}

export {fetchPictures};
