import { Box, Heading, Icon } from "@chakra-ui/react";

import Error from "../components/Error";
import Loading from "../components/Loading";
import { TagIcon } from "../assets/icons";
import VideoList from "../components/VideoList";
import config from "../config";
import fetcher from "../lib/fetcher";
import { useParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";

function Tags({ defaultTag, heading }) {
    const { tag } = useParams();
    const _tag = tag || defaultTag;
    const { data, error } = useSWRImmutable(
        config.api.tag + "?tag=" + _tag,
        fetcher
    );

    window.scrollTo({
        top: 0,
    });

    if (error) return <Error status={error.status} message={error.message} />;
    if (!data) return <Loading />;

    !heading && (document.title = _tag + " - " + config.SITENAME);

    return (
        <Box>
            <Heading
                textAlign={"center"}
                size={"lg"}
                py={8}
                fontWeight={"semibold"}
            >
                {heading || (
                    <Icon mb={-1} as={TagIcon} color={"blue.500"}></Icon>
                )}{" "}
                {_tag}
            </Heading>
            <VideoList files={data} />
        </Box>
    );
}

export default Tags;
