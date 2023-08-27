import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    HStack,
    Heading,
    Icon,
    Image,
    SimpleGrid,
    Stack,
    Text,
} from "@chakra-ui/react";
import {
    CopyIcon,
    DownloadIcon,
    DurationIcon,
    FileIcon,
    ShareIcon,
    TimeIcon,
    ViewIcon,
} from "../assets/icons";
import { Link, useParams } from "react-router-dom";

import CopyButton from "../components/CopyButton";
import Error from "../components/Error";
import LikeButton from "../components/LikeButton";
import Loading from "../components/Loading";
import Tags from "./Tags";
import config from "../config";
import fetcher from "../lib/fetcher";
import formatDuration from "../lib/formatDuration";
import readableSize from "../lib/readableSize";
import redableTime from "../lib/readableTime";
import useSWRImmutable from "swr/immutable";

function Video() {
    const { id } = useParams();

    const { data, error } = useSWRImmutable(
        config.api.info + "?file_code=" + id,
        fetcher
    );

    window.scrollTo({
        top: 0,
    });
    if (error) return <Error status={error.status} message={error.message} />;
    if (!data) return <Loading />;

    document.title = data.title + " - " + config.SITENAME;
    console.log(data);

    return (
        <Box pb={5}>
            <Card
                direction={{ base: "column" }}
                borderRadius={0}
                backgroundColor={"black.900"}
                mx={{ lg: 48 }}
                mt={{ lg: 2 }}
            >
                <Image
                    as={"iframe"}
                    objectFit="cover"
                    w={"100%"}
                    h={["234px", "280px", "75vh"]}
                    allowFullScreen={true}
                    scrolling="no"
                    src={config.DOODSTREAM_URL + data.protected_embed}
                    alt={data.title}
                />
                <CardBody>
                    <Stack mt="6" spacing="3">
                        <Heading size={["md", "lg"]}>{data.title}</Heading>
                        <Stack fontWeight={"semibold"} fontSize={"2xl"}>
                            <HStack>
                                <Icon as={DurationIcon}></Icon>
                                <Text fontSize={"sm"}>
                                    Duration: {formatDuration(data.length)}
                                </Text>
                            </HStack>
                            <HStack>
                                <Icon as={FileIcon}></Icon>
                                <Text fontSize={"sm"}>
                                    Size: {readableSize(data.size)}
                                </Text>
                            </HStack>
                            <HStack>
                                <Icon as={TimeIcon}></Icon>
                                <Text fontSize={"sm"}>
                                    Date: {redableTime(data.uploaded)}
                                </Text>
                            </HStack>
                            <HStack>
                                <Icon as={ViewIcon}></Icon>
                                <Text fontSize={"sm"}>Views: {data.views}</Text>
                            </HStack>
                        </Stack>
                    </Stack>
                </CardBody>

                <CardFooter>
                    <SimpleGrid
                        columns={[2, 3, 4]}
                        gap={4}
                        w={"full"}
                        display={{ base: "grid", md: "grid" }}
                        justifyContent={"center"}
                    >
                        <Button
                            as={Link}
                            leftIcon={<DownloadIcon />}
                            colorScheme="blue"
                            to={config.DOODSTREAM_URL + "/d/" + data.filecode}
                            target="_blank"
                        >
                            Download
                        </Button>
                        <LikeButton
                            file_code={data.filecode}
                            data={{ ...data, file_code: data.filecode }}
                            isButton={true}
                        ></LikeButton>
                        <CopyButton
                            leftIcon={<CopyIcon />}
                            text={config.DOODSTREAM_URL + "/d/" + data.filecode}
                        >
                            Copy Link
                        </CopyButton>
                        <CopyButton
                            leftIcon={<ShareIcon />}
                            text={window.location.href}
                        >
                            Share
                        </CopyButton>
                    </SimpleGrid>
                </CardFooter>
            </Card>
            <Tags defaultTag={data.title.split(" ")[0]} heading="More from" />
        </Box>
    );
}

export default Video;
