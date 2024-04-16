import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <Box background="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(243,255,240,1) 0%, rgba(213,248,255,1) 100%);">
      <Header />
      <Flex
        direction="column"
        align="center"
        maxW={{ xl: "1200px" }}
        m="0 auto"
        px="6"
        py="8"
      >
        <Outlet />
      </Flex>
    </Box>
  );
}

export default Layout;
