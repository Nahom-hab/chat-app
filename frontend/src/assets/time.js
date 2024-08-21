export function formatTime(timestamp) {
    // Create a new Date object from the timestamp
    const date = new Date(timestamp);

    // Get hours and minutes
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();

    // Format hours and minutes to always be two digits
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');

    // Return the formatted time
    return `${hours}:${minutes}`;
}