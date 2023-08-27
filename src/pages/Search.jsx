import { Box, Heading, Highlight } from "@chakra-ui/react";

import Error from "../components/Error";
import Loading from "../components/Loading";
import VideoList from "../components/VideoList";
import config from "../config";
import fetcher from "../lib/fetcher";
import useSWRImmutable from "swr/immutable";
import { useSearchParams } from "react-router-dom";

function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const { data, error } = useSWRImmutable(
        config.api.search + "?q=" + query,
        fetcher
    );

    document.title = query + " - Search - " + config.SITENAME;

    window.scrollTo({
        top: 0,
    });

    if (error) return <Error status={error.status} message={error.message} />;
    if (!data) return <Loading />;

    const heading =
        (data.length === 0 ? "No result found" : "Search results") +
        " for " +
        query;

    return (
        <Box>
            <Heading
                textAlign={"center"}
                size={"md"}
                my={5}
                fontFamily={"mono"}
            >
                <Highlight
                    query={query}
                    styles={{
                        px: "2",
                        py: "1",
                        rounded: "full",
                        bg: "teal.100",
                    }}
                >
                    {heading}
                </Highlight>
            </Heading>
            <VideoList files={data} />
        </Box>
    );
}

export default Search;
