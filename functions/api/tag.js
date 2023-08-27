import {
    apiRequest,
    jsonResponse,
    makeApiErrorResponse,
    mapImagesWithCDN,
} from "../lib/requests";

export async function onRequestGet(context) {
    const url = new URL(context.request.url);
    const params = Object.fromEntries(url.searchParams.entries());
    const response = await apiRequest(context, "search/videos", {
        search_term: params.tag,
    });
    if (response.status === 200) {
        response.result = mapImagesWithCDN(response.result);
        return jsonResponse(response.result.reverse());
    }
    return makeApiErrorResponse(response);
}
