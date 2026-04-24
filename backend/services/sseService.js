let clients = {};

function addClient(userId, res) {
  if (!clients[userId]) clients[userId] = [];
  clients[userId].push(res);
}

function emitEvent(userId, data) {
  const userClients = clients[userId] || [];

  userClients.forEach((res) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  });
}

module.exports = { addClient, emitEvent };