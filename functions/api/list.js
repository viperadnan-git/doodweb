import {
    apiRequest,
    jsonResponse,
    makeApiErrorResponse,
    mapImagesWithCDN,
} from "../lib/requests";

export async function onRequestGet(context) {
    const url = new URL(context.request.url);
    const params = Object.fromEntries(url.searchParams.entries());
    const new_params = {};
    new_params.per_page = params.per_page || context.env.PAGE_SIZE || 40;
    new_params.page = params.page || 1;
    if (context.env.DOODSTREAM_ROOT_FOLDER) {
        new_params.fld_id = context.env.DOODSTREAM_ROOT_FOLDER;
    }
    const response = await apiRequest(context, "file/list", new_params);
    if (response.status === 200) {
        response.result.files = mapImagesWithCDN(response.result.files);
        return jsonResponse(response.result);
    }
    return makeApiErrorResponse(response);
}
