import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Heading, SimpleGrid, Spinner, useToast } from "@chakra-ui/react";
import { MOVIEDB_IMAGES_URL } from "src/common/constants";
import MovieCard from "./MovieCard";
import {
  fetchMovies,
  selectAllMovies,
  selectMoviesError,
  selectMoviesStatus,
} from "./moviesSlice";

function MoviesList() {
  const dispatch = useDispatch();
  const toast = useToast();
  const movies = useSelector(selectAllMovies);
  const moviesStatus = useSelector(selectMoviesStatus);
  const moviesError = useSelector(selectMoviesError);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchMovies()).unwrap();
      } catch (err) {
        toast({
          title: "Failed to load movies",
          description:
            "Please refresh the page and check your internet connection!",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };

    fetchData();
  }, [dispatch, toast]);

  let content;
  if (moviesStatus === "succeeded") {
    content = (
      <SimpleGrid spacing={4} columns={{ sm: 1, md: 3, lg: 4 }}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={`${MOVIEDB_IMAGES_URL}/${movie.poster_path}`}
            overview={movie.overview}
          />
        ))}
      </SimpleGrid>
    );
  } else if (moviesStatus === "loading") {
    content = (
      <Flex alignItems="center" justifyContent="center" minH="100vh">
        <Spinner text="Loading..." />
      </Flex>
    );
  } else if (moviesStatus === "failed") {
    content = (
      <Flex alignItems="center" justifyContent="center" minH="100vh">
        {moviesError}
      </Flex>
    );
  }

  return (
    <>
      <Heading textAlign="center" size="xl" mb={4}>
        Trending Movies
      </Heading>
      {content}
    </>
  );
}
export default MoviesList;
