import {
    apiRequest,
    jsonResponse,
    makeApiErrorResponse,
} from "../lib/requests";

export async function onRequestGet(context) {
    const url = new URL(context.request.url);
    const params = Object.fromEntries(url.searchParams.entries());
    const response = await apiRequest(context, "file/info", {
        file_code: params.file_code,
    });
    if (response.status === 200) {
        return jsonResponse(response.result[0]);
    }
    return makeApiErrorResponse(response);
}
