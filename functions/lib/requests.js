export const apiRequest = async (context, endpoint, params = {}) => {
    const DOODSTREAM_API_KEY = context.env.DOODSTREAM_API_KEY;
    const DOODSTREAM_API_URL =
        context.env.DOODSTREAM_API_URL || "https://doodapi.com/api";

    const url = new URL(`${DOODSTREAM_API_URL}/${endpoint}`);
    url.searchParams.append("key", DOODSTREAM_API_KEY);

    Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
    );

    const response = await fetch(url.toString());
    return await response.json();
};

export const jsonResponse = (data, status = 200) => {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            "content-type": "application/json;charset=UTF-8",
            "access-control-allow-origin": "*",
        },
    });
};

export const makeApiErrorResponse = (response) => {
    const { status, msg } = response;
    return new Response(JSON.stringify({ code: status, message: msg }), {
        status: status,
        headers: {
            "content-type": "application/json;charset=UTF-8",
            "access-control-allow-origin": "*",
        },
    });
};

export const mapImagesWithCDN = (items) => {
    return items.map((item) => {
        item.single_img = item.single_img.replace("://", "://i0.wp.com/");
        return item;
    });
};
