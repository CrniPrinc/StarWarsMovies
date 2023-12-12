import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
  },
  reducers: {
    setMovies(state, action) {
      state.movies = action.payload;
    },
    addMovie(state, action) {
      state.movies.push(action.payload);
    },
    editMovie(state, action) {
      const existingMovie = state.movies.find(
        (movie) => movie.id === action.payload.id
      );
      if (existingMovie) {
        existingMovie.title = action.payload.title;
        existingMovie.director = action.payload.director;
        existingMovie.producer = action.payload.producer;
        existingMovie.opening_crawl = action.payload.description;
      }
    },
    deleteMovie(state, action) {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});

export const moviesAction = moviesSlice.actions;

export default moviesSlice;
