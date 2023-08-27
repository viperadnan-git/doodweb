import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";

import config from "../config";

export default function Footer() {
    return (
        <Box
            bg={useColorModeValue("gray.50", "black.900")}
            color={useColorModeValue("gray.700", "gray.200")}
            pt={20}
        >
            <Box py={10}>
                <Flex
                    align={"center"}
                    _before={{
                        content: '""',
                        borderBottom: "1px solid",
                        borderColor: useColorModeValue("gray.200", "gray.700"),
                        flexGrow: 1,
                        mr: 8,
                    }}
                    _after={{
                        content: '""',
                        borderBottom: "1px solid",
                        borderColor: useColorModeValue("gray.200", "gray.700"),
                        flexGrow: 1,
                        ml: 8,
                    }}
                >
                    <Heading fontSize={"xl"}>{config.SITENAME}</Heading>
                </Flex>
                <Text pt={6} fontSize={"sm"} textAlign={"center"}>
                    Copyright &copy; {new Date().getFullYear()}. All rights
                    reserved
                </Text>
            </Box>
        </Box>
    );
}
