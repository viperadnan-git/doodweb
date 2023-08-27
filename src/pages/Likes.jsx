import {
    Box,
    HStack,
    Heading,
    Icon,
    IconButton,
    SimpleGrid,
    Text,
    VStack,
} from "@chakra-ui/react";
import { DeleteIcon, HeartIcon } from "../assets/icons";

import { Link } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import toast from "react-hot-toast";
import useLikedVideos from "../hooks/useLikedVideos";

function LikesList({ videos }) {
    return (
        <VStack m={{ md: 4 }} mx={{ lg: 8 }}>
            <SimpleGrid columns={[2, 2, 2, 3, 4]} spacing={{ md: 4 }}>
                {videos.map((video) => {
                    return <VideoCard key={video.file_code} {...video} />;
                })}
            </SimpleGrid>
        </VStack>
    );
}

function Likes() {
    const { getAllLikedVideos, removeAllLikedVideos } = useLikedVideos();

    const likedVideos = getAllLikedVideos().reverse();

    const onClickRremoveALl = () => {
        removeAllLikedVideos();
        toast.success("Removed all liked videos", {
            icon: "🗑️",
            duration: 1000,
        });
    };

    return (
        <Box>
            <HStack justify={"space-between"} mx={{ base: 6, lg: 12 }}>
                <Heading size={"lg"} my={5} fontWeight={"semibold"}>
                    <Icon
                        me={3}
                        mb={-1.5}
                        as={HeartIcon}
                        color={"red.500"}
                        boxSize={9}
                    ></Icon>
                    My Likes
                </Heading>
                <IconButton
                    icon={<DeleteIcon />}
                    fontSize={24}
                    variant={"ghost"}
                    aria-label="Clear All"
                    onClick={onClickRremoveALl}
                ></IconButton>
            </HStack>
            {likedVideos.length > 0 ? (
                <LikesList videos={likedVideos} />
            ) : (
                <Text textAlign={"center"} mx={8}>
                    No favourites yet, visit{" "}
                    <Text as={Link} color={"blue.500"} to="/">
                        home
                    </Text>{" "}
                    and tap on the like button to add favourites.
                </Text>
            )}
        </Box>
    );
}

export default Likes;
