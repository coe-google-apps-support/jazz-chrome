// LiceChat license number

const LICENSE = 9242305
const GROUP = 0

// init LiveChat visitor SDK

const sdk = window.LivechatVisitorSDK.init({
  license: LICENSE,
  group: GROUP,
})

// References to DOM elements

const liveChatWindow = document.getElementById('livechat')
const offlineMessage = document.getElementById('offline-message')
const connectionMessage = document.getElementById('connection-message')
const liveChatWindowMinimized = document.getElementById('livechat-minimized')
const messageList = document.getElementById('message-list')
const sendButton = document.getElementById('send-button')
const setDataButton = document.getElementById('set-data-button')
const input = document.getElementById('message-input')
const prechatForm = document.getElementById('prechat')
const prechatEmailInput = document.getElementById('prechat_email')
const prechatNameInput = document.getElementById('prechat_name')
const minimizeButton = document.getElementById('minimize')
const queueMessage = document.getElementById('queue-message')
const queueTime = document.getElementById('queue-time')
const queueNumber = document.getElementById('queue-number')
const typingIndicator = document.getElementById('typing-indicator')
const rate = document.getElementById('rate')
const headerTitle = document.getElementById('header-title')
const overlayClose = document.getElementById('overlay-close')
const overlay = document.getElementById('overlay')

// const rateGood = document.getElementById('rate-good')
// const rateBad = document.getElementById('rate-bad')
// const rateChat = document.getElementById('rate-chat')

// Agents array, 'is visitor chatting' flag

const agents = []
let chatting = false

const findAgentById = (agentId) => agents.find((agent) => agent.id === agentId)

// Append message function

const appendMessage = (text, authorType, authorId) => {
  const messageDivContainer = document.createElement('div')
  messageDivContainer.classList.add('message-container', authorType)
  if (findAgentById(authorId)) {
    const agent = findAgentById(authorId)
    const avatarImage = document.createElement('img')
    avatarImage.src = `https://${agent.avatarUrl}`
    avatarImage.classList.add('agent-avatar')
    messageDivContainer.append(avatarImage)
  }
  const messageDiv = document.createElement('div')
  messageDiv.classList.add('message')
  messageDiv.innerHTML = '<div>' + text + '</div>'
  messageDivContainer.append(messageDiv)
  messageList.appendChild(messageDivContainer)
  messageList.scrollTop = messageList.scrollHeight
}

// show bar with 'Agent is typing' info 

const showTypingIndicator = () => {
  typingIndicator.classList.remove('hide')
}

// hide bar with 'Agent is typing' info

const hideTypingIndicator = () => {
  typingIndicator.classList.add('hide')
}


// show queue message with information about estimated waiting time and queue order number

const showQueueMessage = (time, number) => {
  queueMessage.classList.remove('hide')
  queueTime.innerHTML = time
  queueNumber.innerHTML = number
}

// hide queue message

const hideQueueMessage = () => {
  queueMessage.classList.add('hide')
}

// disable message input

const disableInput = (text) => {
  input.placeholder = text
  input.disabled = true
}

// enable message input

const enableInput = () => {
  input.placeholder = 'Write a message'
  input.disabled = false
}

// show prechat - form with questions about visitor's name and email

const showPrechat = () => {
  if (chatting) {
    return
  }
  prechatForm.classList.remove('hide')
}

// hide prechat

const hidePrechat = () => prechatForm.classList.add('hide')

// New message callback handler - detect author, append message

sdk.on('new_message', (data) => {
  console.log('data', data)
  const authorType = data.authorId.indexOf('@') === -1 ? 'visitor' : 'agent'
  appendMessage(data.text, authorType, data.authorId)
})

sdk.on('new_file', (data) => {
  const authorType = data.authorId.indexOf('@') === -1 ? 'visitor' : 'agent'
  appendMessage(data.url, authorType, data.authorId)
})

sdk.on('visitor_queued', (queueData) => {
  showQueueMessage(queueData.waitingTime, queueData.numberInQueue)
})


// Connection status changed callback handler - toggle message about connection problems, toggle input

sdk.on('connection_status_changed', (data) => {
  if (data.status === 'connected') {
    enableInput()
    connectionMessage.classList.add('hide')
    if (!chatting) {
      setTimeout(showPrechat, 1000)
    }
  } else {
    disableInput('Disconnected')
    connectionMessage.classList.add('disconnected')
    connectionMessage.classList.remove('hide')
  }
})

// Chat ended callback handler, append system message and disable input

sdk.on('chat_ended', (data) => {
  appendMessage('Chat is closed', 'system')
  disableInput('Chat is closed')
})

// Chat started callback handler - set chatting flag, hide prechat form

sdk.on('chat_started', () => {
  chatting = true
  hidePrechat()
  hideQueueMessage()
})

// Agent changed callback handler - add agent to agent's array

sdk.on('agent_changed', (data) => {
  console.log('agent data', data)
  agents.push(data)
})

// Typing indicator callback handler, show / hide bar

sdk.on('typing_indicator', (data) => {
  if (data.isTyping) {
    return showTypingIndicator()
  }
  hideTypingIndicator()
})

// Status changed callback handler - show offline message if all agents are offline

sdk.on('status_changed', (data) => {
  if (data.status !== 'online') {
    offlineMessage.classList.remove('hide')
    disableInput('Chat is offline')

  } else {
    offlineMessage.classList.add('hide')
    enableInput()
  }
})

// Use sendMessage method

const sendMessage = () => {
  const text = input.value
  sdk.sendMessage({
    customId: String(Math.random()),
    text: text,
  })
  input.value = ''
}

// Maximize / minimize chat widget

const minimize = () => {
  liveChatWindow.classList.add('minimized')
  liveChatWindowMinimized.classList.add('minimized')

  let data = {
    type: 'VC_MINIMIZE',
    content: 'The livechat window has been minimized.'
  }
  window.parent.postMessage(data, '*')
}

const maximize = () => {
  liveChatWindow.classList.remove('minimized')
  liveChatWindowMinimized.classList.remove('minimized')

  let data = {
    type: 'VC_MAXIMIZE',
    content: 'The livechat window has been maximized.'
  }
  window.parent.postMessage(data, '*')
}

sendButton.onclick = sendMessage

minimizeButton.onclick = minimize

liveChatWindowMinimized.onclick = maximize

input.onkeydown = (event) => {
  // send message if enter was pressed
  if (event.which === 13) {
    sendMessage()
    return false
  }
}

setDataButton.onclick = () => {
  const name = prechatNameInput.value
  const email = prechatEmailInput.value
  sdk.setVisitorData({
    name, email,
  })
  prechatNameInput.disabled = true
  prechatEmailInput.disabled = true
  hidePrechat()
}

overlayClose.addEventListener('click', () => {
  overlay.classList.add('hide');
});

rate.addEventListener('click', () => {
  overlay.classList.remove('hide');
})
// LiceChat license number

const LICENSE = 9242305
const GROUP = 0

// init LiveChat visitor SDK

const sdk = window.LivechatVisitorSDK.init({
  license: LICENSE,
  group: GROUP,
})

// References to DOM elements

const liveChatWindow = document.getElementById('livechat')
const offlineMessage = document.getElementById('offline-message')
const connectionMessage = document.getElementById('connection-message')
const liveChatWindowMinimized = document.getElementById('livechat-minimized')
const messageList = document.getElementById('message-list')
const sendButton = document.getElementById('send-button')
const setDataButton = document.getElementById('set-data-button')
const input = document.getElementById('message-input')
const prechatForm = document.getElementById('prechat')
const prechatEmailInput = document.getElementById('prechat_email')
const prechatNameInput = document.getElementById('prechat_name')
const minimizeButton = document.getElementById('minimize')
const queueMessage = document.getElementById('queue-message')
const queueTime = document.getElementById('queue-time')
const queueNumber = document.getElementById('queue-number')
const typingIndicator = document.getElementById('typing-indicator')
const rate = document.getElementById('rate')
const headerTitle = document.getElementById('header-title')
const overlayClose = document.getElementById('overlay-close')
const overlay = document.getElementById('overlay')

// const rateGood = document.getElementById('rate-good')
// const rateBad = document.getElementById('rate-bad')
// const rateChat = document.getElementById('rate-chat')

// Agents array, 'is visitor chatting' flag

const agents = []
let chatting = false

const findAgentById = (agentId) => agents.find((agent) => agent.id === agentId)

// Append message function

const appendMessage = (text, authorType, authorId) => {
  const messageDivContainer = document.createElement('div')
  messageDivContainer.classList.add('message-container', authorType)
  if (findAgentById(authorId)) {
    const agent = findAgentById(authorId)
    const avatarImage = document.createElement('img')
    avatarImage.src = `https://${agent.avatarUrl}`
    avatarImage.classList.add('agent-avatar')
    messageDivContainer.append(avatarImage)
  }
  const messageDiv = document.createElement('div')
  messageDiv.classList.add('message')
  messageDiv.innerHTML = '<div>' + text + '</div>'
  messageDivContainer.append(messageDiv)
  messageList.appendChild(messageDivContainer)
  messageList.scrollTop = messageList.scrollHeight
}

// show bar with 'Agent is typing' info 

const showTypingIndicator = () => {
  typingIndicator.classList.remove('hide')
}

// hide bar with 'Agent is typing' info

const hideTypingIndicator = () => {
  typingIndicator.classList.add('hide')
}


// show queue message with information about estimated waiting time and queue order number

const showQueueMessage = (time, number) => {
  queueMessage.classList.remove('hide')
  queueTime.innerHTML = time
  queueNumber.innerHTML = number
}

// hide queue message

const hideQueueMessage = () => {
  queueMessage.classList.add('hide')
}

// disable message input

const disableInput = (text) => {
  input.placeholder = text
  input.disabled = true
}

// enable message input

const enableInput = () => {
  input.placeholder = 'Write a message'
  input.disabled = false
}

// show prechat - form with questions about visitor's name and email

const showPrechat = () => {
  if (chatting) {
    return
  }
  prechatForm.classList.remove('hide')
}

// hide prechat

const hidePrechat = () => prechatForm.classList.add('hide')

// New message callback handler - detect author, append message

sdk.on('new_message', (data) => {
  console.log('data', data)
  const authorType = data.authorId.indexOf('@') === -1 ? 'visitor' : 'agent'
  appendMessage(data.text, authorType, data.authorId)
})

sdk.on('new_file', (data) => {
  const authorType = data.authorId.indexOf('@') === -1 ? 'visitor' : 'agent'
  appendMessage(data.url, authorType, data.authorId)
})

sdk.on('visitor_queued', (queueData) => {
  showQueueMessage(queueData.waitingTime, queueData.numberInQueue)
})


// Connection status changed callback handler - toggle message about connection problems, toggle input

sdk.on('connection_status_changed', (data) => {
  if (data.status === 'connected') {
    enableInput()
    connectionMessage.classList.add('hide')
    if (!chatting) {
      setTimeout(showPrechat, 1000)
    }
  } else {
    disableInput('Disconnected')
    connectionMessage.classList.add('disconnected')
    connectionMessage.classList.remove('hide')
  }
})

// Chat ended callback handler, append system message and disable input

sdk.on('chat_ended', (data) => {
  appendMessage('Chat is closed', 'system')
  disableInput('Chat is closed')
})

// Chat started callback handler - set chatting flag, hide prechat form

sdk.on('chat_started', () => {
  chatting = true
  hidePrechat()
  hideQueueMessage()
})

// Agent changed callback handler - add agent to agent's array

sdk.on('agent_changed', (data) => {
  console.log('agent data', data)
  agents.push(data)
})

// Typing indicator callback handler, show / hide bar

sdk.on('typing_indicator', (data) => {
  if (data.isTyping) {
    return showTypingIndicator()
  }
  hideTypingIndicator()
})

// Status changed callback handler - show offline message if all agents are offline

sdk.on('status_changed', (data) => {
  if (data.status !== 'online') {
    offlineMessage.classList.remove('hide')
    disableInput('Chat is offline')

  } else {
    offlineMessage.classList.add('hide')
    enableInput()
  }
})

// Use sendMessage method

const sendMessage = () => {
  const text = input.value
  sdk.sendMessage({
    customId: String(Math.random()),
    text: text,
  })
  input.value = ''
}

// Maximize / minimize chat widget

const minimize = () => {
  liveChatWindow.classList.add('minimized')
  liveChatWindowMinimized.classList.add('minimized')

  let data = {
    type: 'VC_MINIMIZE',
    content: 'The livechat window has been minimized.'
  }
  window.parent.postMessage(data, '*')
}

const maximize = () => {
  liveChatWindow.classList.remove('minimized')
  liveChatWindowMinimized.classList.remove('minimized')

  let data = {
    type: 'VC_MAXIMIZE',
    content: 'The livechat window has been maximized.'
  }
  window.parent.postMessage(data, '*')
}

sendButton.onclick = sendMessage

minimizeButton.onclick = minimize

liveChatWindowMinimized.onclick = maximize

input.onkeydown = (event) => {
  // send message if enter was pressed
  if (event.which === 13) {
    sendMessage()
    return false
  }
}

setDataButton.onclick = () => {
  const name = prechatNameInput.value
  const email = prechatEmailInput.value
  sdk.setVisitorData({
    name, email,
  })
  prechatNameInput.disabled = true
  prechatEmailInput.disabled = true
  hidePrechat()
}

overlayClose.addEventListener('click', () => {
  overlay.classList.add('hide');
});

rate.addEventListener('click', () => {
  overlay.classList.remove('hide');
})
