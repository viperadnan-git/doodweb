const API_ENDPOINT =
    window.location.hostname === "localhost"
        ? "http://localhost:8788/api"
        : "/api";

const config = {
    SITENAME: window.env.SITENAME || "DoodStream",
    api: {
        list: `${API_ENDPOINT}/list`,
        search: `${API_ENDPOINT}/search`,
        info: `${API_ENDPOINT}/info`,
        tag: `${API_ENDPOINT}/tag`,
        taglist: `${API_ENDPOINT}/taglist`,
    },
    DOODSTREAM_URL: process.env.DOODSTREAM_URL || "https://doods.pro",
};

export default config;
