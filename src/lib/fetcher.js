const fetcher = (url) =>
    fetch(url).then((r) => {
        if (r.status >= 400) {
            throw new Error("Bad response from server");
        }
        return r.json();
    });
export default fetcher;
