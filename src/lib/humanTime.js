const humanTime = (datetimeString) => {
    const now = new Date();
    const date = new Date(datetimeString);
    const diff = now - date;
    const sec = diff / 1000;
    if (sec < 60) {
        return `${Math.round(sec)} second${Math.round(sec) > 1 ? "s" : ""} ago`;
    }
    const min = sec / 60;
    if (min < 60) {
        return `${Math.round(min)} minute${Math.round(min) > 1 ? "s" : ""} ago`;
    }
    const hour = min / 60;
    if (hour < 24) {
        return `${Math.round(hour)} hour${Math.round(hour) > 1 ? "s" : ""} ago`;
    }
    const day = hour / 24;
    if (day < 30) {
        return `${Math.round(day)} day${Math.round(day) > 1 ? "s" : ""} ago`;
    }
    const month = day / 30;
    if (month < 12) {
        return `${Math.round(month)} month${
            Math.round(month) > 1 ? "s" : ""
        } ago`;
    }
    const year = month / 12;
    return `${Math.round(year)} year${Math.round(year) > 1 ? "s" : ""} ago`;
};

export default humanTime;
