export function formatDate(dueDate) {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
    };
    return new Date(dueDate).toLocaleString(undefined, options);
}
