export async function onRequest(context) {
    return await fetch("https://api.ipify.org?format=json");
}
