import { extendTheme } from "@chakra-ui/react";

const config = {
    initialColorMode: "dark",
    useSystemColorMode: false,
};

const theme = extendTheme({
    colors: {
        black: {
            700: "#161b22",
            800: "#0d1117",
            900: "#010409",
        },
        gray: {
            800: "#010409",
            700: "#161b22",
        },
    },
    config,
});

export default theme;
