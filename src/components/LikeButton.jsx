import { Button, Icon } from "@chakra-ui/react";
import { HeartIcon, LinedHeartIcon } from "../assets/icons";

import toast from "react-hot-toast";
import useLikedVideos from "../hooks/useLikedVideos";
import { useState } from "react";

const redColor = "red.400";
const whiteColor = "whiteAlpha.500";
const LikedIcon = HeartIcon;
const UnlikedIcon = LinedHeartIcon;

const LikeIconElement = ({ isLiked, onToggle }) => {
    return (
        <Icon
            as={isLiked ? LikedIcon : UnlikedIcon}
            color={isLiked ? redColor : whiteColor}
            onClick={onToggle}
            boxSize={[3.5, 4, 5]}
        ></Icon>
    );
};

const LikeButtonElement = ({ isLiked, onToggle }) => {
    return (
        <Button
            bgColor={isLiked && redColor}
            onClick={onToggle}
            leftIcon={<Icon as={isLiked ? LikedIcon : UnlikedIcon}></Icon>}
            _focus={
                isLiked && {
                    bgColor: redColor,
                }
            }
        >
            {isLiked ? "Liked" : "Like"}
        </Button>
    );
};

function LikeButton({ file_code, data, isButton = false }) {
    const { addLikedVideo, removeLikedVideo, isLikedVideoExists } =
        useLikedVideos();
    const [isLiked, setLiked] = useState(isLikedVideoExists(file_code));

    const toggleFavourite = () => {
        if (isLiked) {
            removeLikedVideo(file_code);
            setLiked(false);
            toast.success("Removed from favourites", {
                icon: "🗑️",
                duration: 1000,
            });
        } else {
            addLikedVideo(file_code, data);
            setLiked(true);
            toast.success("Added to favourites", {
                icon: "❤",
                duration: 1000,
            });
        }
    };

    return (
        <>
            {isButton ? (
                <LikeButtonElement
                    isLiked={isLiked}
                    onToggle={toggleFavourite}
                />
            ) : (
                <LikeIconElement isLiked={isLiked} onToggle={toggleFavourite} />
            )}
        </>
    );
}

export default LikeButton;
