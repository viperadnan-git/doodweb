const useLikedVideos = () => {
    const getLikedVideosFromLocalStorage = () => {
        const likedVideos = [];
        for (let key in localStorage) {
            if (key.startsWith("liked-video-")) {
                likedVideos.push(JSON.parse(localStorage.getItem(key)));
            }
        }
        return likedVideos;
    };

    // Function to add a video to likedVideos
    const addLikedVideo = (file_code, video) => {
        const key = `liked-video-${file_code}`;
        localStorage.setItem(key, JSON.stringify(video));
        console.log(localStorage);
    };

    // Function to remove a video from likedVideos
    const removeLikedVideo = (videoId) => {
        localStorage.removeItem(`liked-video-${videoId}`);
    };

    // Function to get all liked videos
    const getAllLikedVideos = () => {
        return getLikedVideosFromLocalStorage();
    };

    // Function to remove all liked videos
    const removeAllLikedVideos = () => {
        for (let key in localStorage) {
            if (key.startsWith("liked-video-")) {
                localStorage.removeItem(key);
            }
        }
    };

    // Function to check if a video exists in likedVideos
    const isLikedVideoExists = (videoId) => {
        return localStorage.getItem(`liked-video-${videoId}`);
    };

    return {
        addLikedVideo,
        removeLikedVideo,
        getAllLikedVideos,
        removeAllLikedVideos,
        isLikedVideoExists,
    };
};

export default useLikedVideos;
