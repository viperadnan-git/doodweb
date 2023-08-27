import {
    Badge,
    Box,
    Center,
    HStack,
    Heading,
    Icon,
    Image,
    Tag,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";

import LikeButton from "./LikeButton";
import { Link } from "react-router-dom";
import { TagIcon } from "../assets/icons";
import config from "../config";
import formatDuration from "../lib/formatDuration";
import humanTime from "../lib/humanTime";
import toast from "react-hot-toast";

export default function VideoCard(props) {
    const {
        single_img,
        title,
        uploaded,
        file_code,
        views,
        canplay,
        length,
        splash_img,
    } = props;

    const uploaded_time = uploaded + ".000Z";
    const _new =
        new Date(uploaded_time) > new Date(new Date() - 1000 * 60 * 60 * 8);
    const tag = title.split(" ")[0];

    return (
        <Center>
            <Box
                w="100vw"
                overflow={"hidden"}
                bg={useColorModeValue("white", "black.800")}
                border={"1px"}
                borderColor="black.900"
                borderRadius={{ md: 10 }}
                h={"100%"}
            >
                <Box
                    h={[130, 200]}
                    borderBottom={"1px"}
                    borderColor="black"
                    position={"relative"}
                >
                    <Link
                        to={"/video/" + file_code}
                        {...(!canplay && {
                            onClick: () => {
                                toast.error(
                                    "Video is not ready to play, you can download it instead.",
                                    {
                                        icon: "📺",
                                        duration: 5000,
                                    }
                                );
                            },
                        })}
                    >
                        <Image
                            src={single_img}
                            objectFit="cover"
                            h="full"
                            w="full"
                            alt={title}
                            loading="lazy"
                            cursor="pointer"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                    splash_img ||
                                    `https://placehold.co/600x400/0d1117/white?font=Montserrat&text=${config.SITENAME}`;
                            }}
                            {...(splash_img && {
                                _hover: {
                                    content: `url(${splash_img})`,
                                },
                            })}
                        />
                    </Link>
                    <Tag
                        fontSize={["xs", "sm"]}
                        size={["sm", "md"]}
                        bottom={1}
                        right={1}
                        position={"absolute"}
                        backgroundColor={"rgba(0, 0, 0, 0.7)"}
                    >
                        {formatDuration(length)}
                    </Tag>
                    <Badge
                        as={Link}
                        to={"/tag/" + tag}
                        position={"absolute"}
                        top={1}
                        left={1}
                        display={{ base: "none", sm: "block" }}
                    >
                        <Icon as={TagIcon} mb={-0.5} me={0.5} />
                        {tag}
                    </Badge>
                </Box>
                <Box p={[2, 4]}>
                    <Heading
                        fontWeight={"medium"}
                        fontSize={["sm", "lg"]}
                        noOfLines={2}
                    >
                        {_new && (
                            <Badge colorScheme={"green"} me={1} mb={1}>
                                New
                            </Badge>
                        )}
                        {title}
                    </Heading>
                    <HStack justify={"space-between"}>
                        <Box color={"whiteAlpha.500"}>
                            <Text as="small">{views} views</Text>
                            <Text as="small">&nbsp;&bull;&nbsp;</Text>
                            <Text as="small">{humanTime(uploaded_time)}</Text>
                        </Box>
                        <LikeButton file_code={file_code} data={props} />
                    </HStack>
                </Box>
            </Box>
        </Center>
    );
}
