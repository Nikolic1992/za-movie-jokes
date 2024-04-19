import { useSelector } from "react-redux";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link, useParams } from "react-router-dom";
import JokesGenerator from "src/features/ai-jokes/JokesGenerator";
import { MOVIEDB_IMAGES_URL } from "src/common/constants";
import { selectMovieById } from "./moviesSlice";

function MovieDetails() {
  const { movieId } = useParams();
  const movie = useSelector((state) => selectMovieById(state, movieId));
  return (
    <Box minH="100vh">
      <Link to="/">
        <IconButton
          aria-label="Go back"
          mb={4}
          bg="white"
          border="1px"
          borderColor="gray.300"
          icon={<ArrowBackIcon />}
        />
      </Link>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={`${MOVIEDB_IMAGES_URL}/${movie.poster_path}`}
          alt={`${movie.title}'s poster`}
        />
        <Stack>
          <CardBody>
            <Heading size="md">{movie.title}</Heading>
            <Text py="2">{movie.overview}</Text>
          </CardBody>
          <CardFooter>
            <JokesGenerator
              movieId={movie.id}
              movieTitle={movie.title}
              movieDescription={movie.overview}
            />
          </CardFooter>
        </Stack>
      </Card>
    </Box>
  );
}
export default MovieDetails;
