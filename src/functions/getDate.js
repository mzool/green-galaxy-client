// Get the current date and time
function getDate() {
    const currentDate = new Date();

    // Define options for formatting
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Use 24-hour format
    };

    // Format the date and time
    return currentDate.toLocaleString('en-US', options);
}


export default getDate
