import React, { useState, useEffect, Fragment } from "react";
import cn from "classnames";
import { fetcYtsMoviesdetail, moviesuggestion } from "../../api/api";
import style from "./moviedetail.module.css";

const Moviedetail = ({ movieid, closedetails, suggestId }) => {
  const [moviedata, setmoviedetail] = useState();

  useEffect(() => {
    if (movieid) {
      const movieapi = async () => {
        setmoviedetail(await fetcYtsMoviesdetail(movieid));
      };
      movieapi();
    }
  }, [movieid]);

  const [suggestmovie, setSuggest] = useState();

  useEffect(() => {
    if (movieid) {
      const suggestapi = async () => {
        setSuggest(await moviesuggestion(movieid));
      };
      suggestapi();
    }
  }, [movieid]);
  return (
    <Fragment>
      <div className={movieid && style.open}>
        <div className={cn(style.detailwrapper)}>
          {moviedata && (
            <Fragment>
              <div className={style.headinfo}>
                <span className={style.close} onClick={closedetails}>
                  &times;
                </span>
                <figure>
                  <img
                    src={moviedata.background_image_original}
                    alt={moviedata.title}
                  />
                </figure>
                <div className={style.info}>
                  <h1>{moviedata.title}</h1>
                  <span>Year: {moviedata.year}</span>
                  <span>Rating: {moviedata.rating}/10</span>
                  <span>Language: {moviedata.language}</span>
                  <div>
                    Category:
                    <ul className={style.tags}>
                      {moviedata.genres &&
                        moviedata.genres.map((data) => (
                          <li key={data}>{data}</li>
                        ))}
                    </ul>
                  </div>
                  <div className={style.socialinterest}>
                    <span>Download: {moviedata.download_count}</span>
                    <span>Like: {moviedata.like_count}</span>
                  </div>
                </div>
              </div>

              <div className={style.moviesinfo}>
                <h3>About Movie</h3>
                <p>{moviedata.description_full}</p>

                <h3>Gallery</h3>
                <div className={style.screenshot}>
                  <iframe
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    id="player0"
                    title="trailer"
                    className={style.yt_players}
                    src={
                      "https://www.youtube.com/embed/" +
                      moviedata.yt_trailer_code +
                      "?enablejsapi=1&amp;mode=opaque&amp;rel=0&amp;autohide=1&amp;showinfo=0&amp;wmode=transparent"
                    }
                    allowFullScreen
                  ></iframe>
                  <img
                    src={moviedata.large_screenshot_image1}
                    alt={moviedata.title}
                  />
                  <img
                    src={moviedata.large_screenshot_image2}
                    alt={moviedata.title}
                  />
                  <img
                    src={moviedata.large_screenshot_image3}
                    alt={moviedata.title}
                  />
                </div>
                <h3>Cast:</h3>
                <ul className={style.cast}>
                  {moviedata.cast &&
                    moviedata.cast.map((data) => (
                      <li key={data.name}>
                        <figure>
                          <img src={data.url_small_image} alt={data.name} />
                        </figure>
                        <div>
                          <h3>{data.name}</h3>
                        </div>
                      </li>
                    ))}
                </ul>
                <h3>Download Link</h3>

                <ul className={style.downloadlink}>
                  {moviedata.torrents &&
                    moviedata.torrents.map((data) => (
                      <li key={data.quality}>
                        <div>
                          <span className={style.title}>{data.quality}</span>
                          <span>{data.type}</span>
                          <span>
                            File Size: <i>{data.size}</i>
                          </span>
                          <span>Torrent: </span>
                          <a download href={data.url}>
                            Torrent Link
                          </a>
                          <span>Megnet: </span>
                          <a
                            href={`magnet:?xt=urn:btih:${data.hash}&dn=Url${moviedata.title}`}
                          >
                            Magnet Link
                          </a>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </Fragment>
          )}
          {suggestmovie && (
            <div className={style.suggestionlist}>
              <h3>Suggestion</h3>
              <ul>
                {suggestmovie.map((data) => {
                  return (
                    <li
                      className={style.item}
                      key={data.id}
                      id={data.id}
                      onClick={() => suggestId(data.id)}
                    >
                      <figure>
                        <img src={data.medium_cover_image} alt={data.title} />
                      </figure>
                      <div className={style.info}>
                        <h1>{data.title}</h1>
                        <div className={style.short}>
                          <span>Language: {data.language}</span>
                          <span>Year: {data.year}</span>
                          <span>Rate: {data.rating}/10</span>
                          <span>Run Time: {data.runtime}</span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        {moviedata && (
          <Fragment>
            <div className={style.mask} onClick={closedetails}></div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Moviedetail;
