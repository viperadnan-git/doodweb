import { jsonResponse, makeApiErrorResponse } from "../lib/requests";

export async function onRequestGet(context) {
    if (!context.env.TAGLIST) {
        return makeApiErrorResponse({
            status: 500,
            message: "TAGLIST is not available",
        });
    }
    const response = await fetch(
        context.env.TAGLIST + "?" + new Date().getTime()
    );
    if (response.status === 200) {
        const tags = (await response.text()).split("\n");
        return jsonResponse(tags);
    }
    return makeApiErrorResponse(response);
}
