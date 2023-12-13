import api from "axios";

const baseurl = "https://yts.mx/api/v2/list_movies.json";
const moivedetailurl = "https://yts.mx/api/v2/movie_details.json";
const suggesturl = "https://yts.mx/api/v2/movie_suggestions.json";

export const fetchYtsData = async () => {
  try {
    const response = await api.get(baseurl);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

/* fetch movie list */
export const fetcYtsMovies = async (searchdata, filterData, page) => {
  let pagenumber = 1;
  let genre = "";
  console.log(filterData);
  if (page) {
    pagenumber = page;
  }
  if (Number.isInteger(filterData)) {
    searchdata = filterData;
  } else {
    genre = filterData;
  }
  try {
    const response = await api.get(
      `${baseurl}/?page=${pagenumber}&query_term=${searchdata}&sort_by=download_count&genre=${genre}&limit=50`
    );
    let datavalue = response.data.data.movies;
    const modifieddata = datavalue.map((data) => ({
      id: data.id,
      title: data.title,
      year: data.year,
      rating: data.rating,
      runtime: data.runtime,
      genres: data.genres,
      summary: data.summary,
      description_full: data.description_full,
      language: data.language,
      background_image: data.background_image,
      background_image_original: data.background_image_original,
      small_cover_image: data.small_cover_image,
      medium_cover_image: data.medium_cover_image,
      torrents: data.torrents,
    }));
    return modifieddata;
  } catch (error) {
    console.log(error);
  }
};

/* movie details */
export const fetcYtsMoviesdetail = async (movieid) => {
  try {
    const moviedetails = await api.get(
      `${moivedetailurl}?movie_id=${movieid}&with_images=true&with_cast=true`
    );
    return moviedetails.data.data.movie;
  } catch (error) {
    console.log(error);
  }
};

/* movie suggestion */

export const moviesuggestion = async (movieid) => {
  try {
    const fetchdata = await api.get(`${suggesturl}?movie_id=${movieid}`);
    return fetchdata.data.data.movies;
  } catch (error) {
    console.log(error);
  }
};
