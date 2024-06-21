// API金鑰
const API_KEY = "21595016d5497b10530c6a5162f7e9c2";

//獲取熱門電影資料
export const getPopularMovies = async (option: string, page:number) => {
  const url = `https://api.themoviedb.org/3/trending/movie/${option}?api_key=${API_KEY}&language=zh-TW&page=${page}`;
  try {
    const response = await fetch(url, { method: "GET" }).then((res) =>
      res.json()
    );
    const data = response.results.map((val: any) => ({
      ...val,
      poster_path: val.poster_path
        ? "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + val.poster_path
        : "/image/movie_image.jpg",
      backdrop_path: val.backdrop_path
        ? "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + val.backdrop_path
        : "/image/movie_image.jpg",
    }));

    return data;
  } catch (error) {
    console.log("Error fetching popular movies:" + error);
    return [];
  }
};

//搜尋電影資料
export const getMovies = async (query: string) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=zh-TW&page=1&query=${query}`;
  // console.log(url);
  try {
    const response = await fetch(url, { method: "GET" }).then((res) =>
      res.json()
    );
    const data = response.results.map((val: any) => ({
      ...val,
      poster_path: val.poster_path
        ? "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + val.poster_path
        : "/image/movie_image.jpg",
      backdrop_path: val.backdrop_path
        ? "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + val.backdrop_path
        : "/image/movie_image.jpg",
    }));

    return data;
  } catch (error) {
    console.log("err:" + error);
    return [];
  }
};

//獲取電影詳細資料
export const getMoviesDetails = async (id: Number) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=zh-TW&page=1`;
  try {
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    const movieData = {
      ...data,
      poster_path: data.poster_path
        ? "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + data.poster_path
        : "/image/movie_image.jpg",
    };
    return movieData;
  } catch (error) {
    console.log("err:" + error);
    return [];
  }
};

// 取得預告片
export const getMovieVideos = async (id: Number) => {
  const movieBox: any = document.querySelector(".movieBox");
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;
  await fetch(url, { method: "GET" })
    .then((res) => res.json())
    .then((videoData) => {
      if (videoData.results.length > 0) {
        let target = videoData.results.filter(
          (val: any) => val.type == "Trailer"
        );
        let { name, key, site, id } = target[0];
        let YoutubeIframe = `<iframe class="video" src="https://www.youtube.com/embed/${key}" title="${name}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
        // 加入影片
        movieBox.innerHTML = YoutubeIframe;
      }
    })
    .catch((e) => {
      console.log("error:" + e);
    });
};

//工作人員資料
export const getCredits = async (id: Number) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=zh-TW`;
  // console.log(url);
  try {
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();

    // 處理資料-演員照片
    const actors = data.cast.slice(0, 6).map((actor: any) => ({
      ...actor,
      profile_path: actor.profile_path
        ? "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + actor.profile_path
        : "/image/nullActor.jpg",
    }));
    // 找出導演資料
    const director = data.crew
      .filter((val: { [key: string]: any }) => val['job'] === 'Director')
      .map((val: any) => ({
        ...val,
        profile_path: val.profile_path
          ? "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + val.profile_path
          : "/image/nullActor.jpg",
      }))[0];
    
    return {actors, director} ;
  } catch (err) {
    console.log("error:" + err);
    return [];
  }
};
