import { Box } from "@chakra-ui/react";

function Layout({ children }) {
    return <Box minH={"100vh"}>{children}</Box>;
}

export default Layout;
