function formatDuration(seconds) {
    if (seconds < 0) {
        throw new Error("Duration must be a positive number.");
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const padWithZero = (num) => (num < 10 ? `0${num}` : num);

    if (hours > 0) {
        return `${hours}:${padWithZero(minutes)}:${padWithZero(
            remainingSeconds
        )}`;
    } else {
        return `${padWithZero(minutes)}:${padWithZero(remainingSeconds)}`;
    }
}

export default formatDuration;
