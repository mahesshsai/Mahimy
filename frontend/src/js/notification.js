// Function to send device notifications
function sendNotification(message) {
    if (Notification.permission === 'granted') {
        new Notification(message);
    }
}

// Request notification permission
if (Notification.permission !== 'granted') {
    Notification.requestPermission();
}
