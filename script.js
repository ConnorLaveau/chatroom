// Get required elements from the DOM
var messageInput = document.getElementById('message-input');
var sendButton = document.getElementById('send-button');
var chatMessages = document.getElementById('chat-messages');

var username = prompt("Please enter your name:"); // Prompt the user to enter their name

// Function to handle sending messages
function sendMessage() {
    var messageText = messageInput.value;
    
    if (messageText.trim() !== '') {
        var messageData = {
            text: messageText,
            timestamp: Date.now(),
            username: username // Include the username in the message data
        };

        // Generate a new push ID for the message
        var newMessageRef = database.ref('messages').push();

        // Save the message data under the generated push ID
        newMessageRef.set(messageData);

        // Clear the input field after sending a message
        messageInput.value = '';
    }
}

// Listen for new messages in the database
database.ref('messages').on('child_added', function(snapshot) {
    var message = snapshot.val();

    var messageElement = document.createElement('div');
    messageElement.textContent = message.text;
    messageElement.className = 'message';

    var timestampElement = document.createElement('div');
    timestampElement.innerHTML = formatTimestamp(message.timestamp, message.username); // Include the username in the timestamp
    timestampElement.className = 'timestamp';

    // Append the message and timestamp elements to the chat messages area
    chatMessages.appendChild(messageElement);
    chatMessages.appendChild(timestampElement);
});

// Function to format the timestamp as desired
function formatTimestamp(timestamp, messageUsername) {
    var date = new Date(timestamp);
    var formattedDate = date.toLocaleDateString();
    var formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    var nameSpan = document.createElement('span');
    nameSpan.textContent = messageUsername;
    
    if (messageUsername === username) {
        // Display "from Me" for the current user's messages with "Me" in a different color
        nameSpan.classList.add('current-user');
    } else {
        // Display "from (User's name)" for other messages with a different color
        nameSpan.classList.add('other-user');
    }

    var timestampContainer = document.createElement('div');
    timestampContainer.innerHTML = formattedDate + ' ' + formattedTime + ' from ';
    timestampContainer.appendChild(nameSpan);

    return timestampContainer.outerHTML;
}

// Event listener for the send button
sendButton.addEventListener('click', sendMessage);

// Event listener for the Enter key in the message input field
messageInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
