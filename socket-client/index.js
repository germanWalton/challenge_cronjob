const socket = io('http://localhost:5500');
const messages = document.getElementById('messages');

socket.on('message', (data) => {
  data.map((entry) => {
    const parsed = JSON.stringify(entry);
    handleNewMessage(parsed);
  });
});

const handleNewMessage = (message) => {
  messages.appendChild(buildNewMessage(message));
};

const buildNewMessage = (message) => {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(message));
  return li;
};
