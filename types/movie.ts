// 熱門電影資料定義型別
export interface MovieType {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
  original_title: string;
}
interface GenreType {
  id: number;
  name: string;
}

// 電影詳細資料
export interface MovieDetailsType {
  genres: GenreType[];
  runtime: number;
  video: string;
  [key:string]: any;
}

interface directorType {
  job: string;
  name: string;
  profile_path: string | null;
  [key: string]: any; 
}

//電影演員資料
export interface CreditsType {
  actors: {};
  director: directorType[];
}

export interface ActorsType{
    name: string;
    profile_path: string;
    [key: string]: any; 
}
