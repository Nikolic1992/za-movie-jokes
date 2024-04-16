import {
  Box,
  Button,
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
import { MOVIEDB_IMAGES_URL } from "src/common/constants";
import { data } from "./data";

function MovieDetails() {
  const { movieId } = useParams();
  const movie = data.results.find((movie) => movie.id === Number(movieId));
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
            <Button bg="green.300" color="white">
              Generate Joke
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </Box>
  );
}

export default MovieDetails;
