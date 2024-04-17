import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPopularMovies } from "./api";

const initialState = {
  movies: [],
  status: "idle", // 'idle' / 'loading' / 'succeeded' / 'failed'
  error: null,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const data = await fetchPopularMovies();
  return data.data;
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload.results;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllMovies = (state) => state.movies.movies;
export const selectMoviesStatus = (state) => state.movies.status;
export const selectMoviesError = (state) => state.movies.error;
export const selectMovieById = (state, movieId) =>
  state.movies.movies.find((movie) => movie.id === Number(movieId));

export default moviesSlice.reducer;
