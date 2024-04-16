import { Box, Flex } from "@chakra-ui/react";
import JokesSettings from "src/features/ai-jokes/JokesSettings";

export default function Header() {
  return (
    <Box bg="gray.50" px={4} borderBottom="1px" borderColor="gray.200">
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"flex-end"}
        maxW={{ xl: "1200px" }}
        m="0 auto"
        px="6"
      >
        <JokesSettings />
      </Flex>
    </Box>
  );
}
