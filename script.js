// Get required elements from the DOM
var messageInput = document.getElementById('message-input');
var sendButton = document.getElementById('send-button');
var chatMessages = document.getElementById('chat-messages');

// Function to handle sending messages
function sendMessage() {
    var messageText = messageInput.value;
    
    if (messageText.trim() !== '') {
        var messageElement = document.createElement('div');
        messageElement.textContent = messageText;
        messageElement.className = 'message';
        
        chatMessages.appendChild(messageElement);
        
        // Clear the input field after sending a message
        messageInput.value = '';
    }
}

// Event listener for the send button
sendButton.addEventListener('click', sendMessage);

// Event listener for the Enter key in the message input field
messageInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
