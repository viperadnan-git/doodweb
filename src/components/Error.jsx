import { Box, Heading, Icon, Text } from "@chakra-ui/react";

import { ErrorIcon } from "../assets/icons";

function Error({ status, message, children }) {
    return (
        <Box p={20} textAlign={"center"}>
            <Icon as={ErrorIcon} boxSize={16} color={"red.500"} />
            <Heading>{status}</Heading>
            <Heading as="h2" size={["lg", "xl"]}>
                {message}
            </Heading>
            <Text as="p" mt={2} fontSize={"xl"}>
                {children}
            </Text>
            <Text as="p" fontFamily={"mono"} fontSize={["xs", "sm"]} my={8}>
                Contact the administrator if you think this is an error.
            </Text>
        </Box>
    );
}

export default Error;
