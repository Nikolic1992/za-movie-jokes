import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { fetchPopularMovies } from "./api";

const moviesAdapter = createEntityAdapter({
  sortComparer: (movieA, movieB) => movieB.vote_average - movieA.vote_average,
});

const initialState = moviesAdapter.getInitialState({
  status: "idle", // 'idle' / 'loading' / 'succeeded' / 'failed'
  error: null,
});

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
        moviesAdapter.setMany(state, action.payload.results);
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { selectAll: selectAllMovies, selectById: selectMovieById } =
  moviesAdapter.getSelectors((state) => state.movies);
export const selectMoviesStatus = (state) => state.movies.status;
export const selectMoviesError = (state) => state.movies.error;

export default moviesSlice.reducer;
