// Improved error handling and retry mechanism
const database = firebase.database();

function performOperation() {
  database.ref('/data').once('value').then((snapshot) => {
    // Handle success
  }).catch((error) => {
    if (error.code === 'offline') {
      console.log('Network offline. Retrying in 5 seconds...');
      setTimeout(performOperation, 5000); // Retry after 5 seconds
    } else {
      console.error('Firebase operation failed:', error);
    }
  });
}

//Check for network connectivity
window.addEventListener('online', () => {
  console.log('Back online! Re-attempting Firebase operations.')
  performOperation();
});

//Optional: Handle initial offline state
if (!navigator.onLine) {
  console.log('Currently offline. Attempting to connect...');
}
performOperation();