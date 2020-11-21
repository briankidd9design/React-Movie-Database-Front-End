import http from './httpService';
// import { apiUrl } from '../config.json';

export function getGenres() {
    // return genres.filter(g => g);
    return http.get("/genres");
  }
  