import {
  Badge,
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  IconButton,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link, useParams } from "react-router-dom";
import JokesGenerator from "src/features/ai-jokes/JokesGenerator";
import { MOVIEDB_IMAGES_URL } from "src/common/constants";
import { useGetMovieByIdQuery } from "./moviesApi";

function MovieDetails() {
  const { movieId } = useParams();
  const { data, isError, error, isLoading, isSuccess } =
    useGetMovieByIdQuery(movieId);

  let content;
  if (isSuccess) {
    content = (
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={`${MOVIEDB_IMAGES_URL}/${data.poster_path}`}
          alt={`${data.title}'s poster`}
        />

        <Stack>
          <CardBody>
            <Heading size="md">{data.title}</Heading>
            <Text py="2" color="gray.600">
              Rating: <Badge colorScheme="yellow">{data?.vote_average}</Badge>
            </Text>
            <Text py="2">{data.overview}</Text>
          </CardBody>

          <CardFooter>
            <JokesGenerator
              movieId={data.id}
              movieTitle={data.title}
              movieDescription={data.overview}
            />
          </CardFooter>
        </Stack>
      </Card>
    );
  } else if (isLoading) {
    content = (
      <Flex alignItems="center" justifyContent="center">
        <Spinner text="Loading..." />
      </Flex>
    );
  } else if (isError) {
    content = (
      <Flex alignItems="center" justifyContent="center">
        {error}
      </Flex>
    );
  }

  return (
    <Box minH="100vh" minW="100%" py={8}>
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
      {content}
    </Box>
  );
}
export default MovieDetails;
