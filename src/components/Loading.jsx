import { Center, Spinner } from "@chakra-ui/react";

function Loading() {
    return (
        <Center m={88}>
            <Spinner p={8}></Spinner>
        </Center>
    );
}

export default Loading;
