import { Box, Button, Heading, SimpleGrid, Text } from "@chakra-ui/react";

import Error from "../components/Error";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import config from "../config";
import fetcher from "../lib/fetcher";
import swrImmutable from "swr/immutable";

function TagList() {
    const { data, error } = swrImmutable(config.api.taglist, fetcher);

    if (error) return <Error status={error.status} message={error.message} />;
    if (!data) return <Loading />;

    return (
        <Box m={{ base: 4, lg: 8 }} textAlign={"center"}>
            <Heading size={"lg"} my={5} fontWeight={"semibold"}>
                Available Tags
            </Heading>
            <Text>Tags are either a channel name or a popular keyword</Text>
            <SimpleGrid pt={8} columns={[2, 3, 4, 5, 6]} spacing={{ base: 4 }}>
                {data.map((tag) => (
                    <Button key={tag} as={Link} to={`/tag/${tag}`}>
                        {tag}
                    </Button>
                ))}
            </SimpleGrid>
        </Box>
    );
}

export default TagList;
