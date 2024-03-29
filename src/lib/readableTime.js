function redableTime(datetimeString) {
    const now = new Date(datetimeString);
    return `${now.getHours()}:${now.getMinutes()} ${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`;
}

export default redableTime;
