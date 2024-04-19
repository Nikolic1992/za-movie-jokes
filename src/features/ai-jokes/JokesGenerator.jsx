import { useDispatch, useSelector } from "react-redux";
import { Badge, Button, Flex, Text, useToast } from "@chakra-ui/react";
import {
  fetchJoke,
  selectJokeByMovieId,
  selectJokesStatus,
} from "./aiJokesSlice";

function JokesGenerator({ movieId, movieTitle, movieDescription }) {
  const toast = useToast();
  const dispatch = useDispatch();
  const joke = useSelector((state) => selectJokeByMovieId(state, movieId));
  const jokeStatus = useSelector(selectJokesStatus);

  const handleGenerateJoke = async () => {
    try {
      await dispatch(
        fetchJoke({ movieId, movieTitle, movieDescription })
      ).unwrap();
    } catch (err) {
      toast({
        title: "Failed to load joke",
        description:
          "Please refresh the page and check your internet connection!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex display="column" gap={4} w="100%">
      {joke && (
        <Text mb={2} fontWeight="bold" fontSize="md">
          <Badge fontSize="0.9em" colorScheme="green" mr={1}>
            JOKE:
          </Badge>
          <Text as="span">{joke.joke}</Text>
        </Text>
      )}
      <Button
        isLoading={jokeStatus === "loading"}
        variant="solid"
        bg="green.300"
        color="white"
        w="100%"
        onClick={handleGenerateJoke}
      >
        {joke ? "Regenerate" : "Generate"} Joke
      </Button>
    </Flex>
  );
}

export default JokesGenerator;
