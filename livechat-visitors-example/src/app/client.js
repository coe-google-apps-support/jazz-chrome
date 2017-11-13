// LiceChat license number

const LICENSE = 9242305
const GROUP = 0

// init LiveChat visitor SDK

const sdk = window.LivechatVisitorSDK.init({
  license: LICENSE,
  group: GROUP,
})

// Used to swap in variables for template strings. ${0} would access the 0th var.

function template(strings, ...keys) {
  return (function(...values) {
    var dict = values[values.length - 1] || {};
    var result = [strings[0]];
    keys.forEach(function(key, i) {
      var value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  });
}

const goodRateMessage = 
`
<div class="rating-tile">
  <div>
      <svg width="71px" height="66px" viewBox="0 0 71 66" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
          <title>ic_thumb_up_black_24px copy 2</title>
          <desc>Created with Sketch.</desc>
          <defs></defs>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Exit-intent-02b-Copy-26" transform="translate(-1067.000000, -612.000000)">
                  <g id="Group-2" transform="translate(950.000000, 288.000000)">
                      <g id="Group-8" transform="translate(42.000000, 324.000000)">
                          <g id="ic_thumb_up_black_24px-copy-2" transform="translate(75.000000, 0.000000)">
                              <path d="M5.66666667,60.2121212 L16.5757576,60.2121212 L16.5757576,27.4848485 L5.66666667,27.4848485 L5.66666667,60.2121212 Z M65.6666667,30.2121212 C65.6666667,27.2121212 63.2121212,24.7575758 60.2121212,24.7575758 L43.0030303,24.7575758 L45.5939394,12.2939394 L45.6757576,11.4212121 C45.6757576,10.3030303 45.2121212,9.26666667 44.4757576,8.53030303 L41.5848485,5.66666667 L23.6393939,23.6393939 C22.630303,24.6212121 22.030303,25.9848485 22.030303,27.4848485 L22.030303,54.7575758 C22.030303,57.7575758 24.4848485,60.2121212 27.4848485,60.2121212 L52.030303,60.2121212 C54.2939394,60.2121212 56.230303,58.8484848 57.0484848,56.8848485 L65.2848485,37.6575758 C65.530303,37.030303 65.6666667,36.3757576 65.6666667,35.6666667 L65.6666667,30.4575758 L65.6393939,30.430303 L65.6666667,30.2121212 Z"
                                  id="Shape-Copy" fill="#46CA84"></path>
                              <path d="M5.66666667,60.2121212 L16.5757576,60.2121212 L16.5757576,27.4848485 L5.66666667,27.4848485 L5.66666667,60.2121212 Z M5.66666667,65.2121212 C2.90524292,65.2121212 0.666666667,62.973545 0.666666667,60.2121212 L0.666666667,27.4848485 C0.666666667,24.7234247 2.90524292,22.4848485 5.66666667,22.4848485 L16.5757576,22.4848485 C19.3371813,22.4848485 21.5757576,24.7234247 21.5757576,27.4848485 L21.5757576,60.2121212 C21.5757576,62.973545 19.3371813,65.2121212 16.5757576,65.2121212 L5.66666667,65.2121212 Z M65.6666667,30.2121212 C65.6666667,27.2121212 63.2121212,24.7575758 60.2121212,24.7575758 L43.0030303,24.7575758 L45.5939394,12.2939394 L45.6757576,11.4212121 C45.6757576,10.3030303 45.2121212,9.26666667 44.4757576,8.53030303 L41.5848485,5.66666667 L23.6393939,23.6393939 C22.630303,24.6212121 22.030303,25.9848485 22.030303,27.4848485 L22.030303,54.7575758 C22.030303,57.7575758 24.4848485,60.2121212 27.4848485,60.2121212 L52.030303,60.2121212 C54.2939394,60.2121212 56.230303,58.8484848 57.0484848,56.8848485 L65.2848485,37.6575758 C65.530303,37.030303 65.6666667,36.3757576 65.6666667,35.6666667 L65.6666667,30.4575758 L65.6666667,30.2121212 Z M70.6666667,35.6666667 C70.6666667,36.9905734 70.4177452,38.2613832 69.9410624,39.4795725 L61.6638695,58.8079254 C60.0567357,62.6650465 56.2805493,65.2121212 52.030303,65.2121212 L27.4848485,65.2121212 C21.7234247,65.2121212 17.030303,60.5189995 17.030303,54.7575758 L17.030303,27.4848485 C17.030303,24.6578073 18.1595849,21.9949327 20.1011765,20.1065456 L38.0466311,2.13381832 C39.9922805,0.185211931 43.1472522,0.176537942 45.1035868,2.11441657 L48.0112915,4.99476912 C49.696729,6.68020664 50.6757576,8.99135606 50.6757576,11.4212121 C50.6757576,11.5770351 50.6684733,11.732773 50.6539287,11.8879157 L50.5721105,12.7606429 C50.5547631,12.9456824 50.5271122,13.1296108 50.4892866,13.3115717 L49.1493077,19.7575758 L60.2121212,19.7575758 C65.973545,19.7575758 70.6666667,24.4506975 70.6666667,30.2121212 C70.6661637,30.3756756 70.6666667,35.6666667 70.6666667,35.6666667 Z"
                                  fill="#FFFFFF" fill-rule="nonzero"></path>
                          </g>
                      </g>
                  </g>
              </g>
          </g>
      </svg>
      <div>You rated this chat as good.</div>
  </div>
</div>
`

const newAgentConnectMessage = 
template`
<div class="agent-message">
  <img src="${0}">
  <div>
    <div class="agent-name">${1}</div>
    <div class="agent-role">${2}</div>
  </div>
</div>
`

const newVisitorMessage = 
template`
<div class="message">
  <div>${0}</div>
</div>
<div class="error">Failed to send.</div>
`

const newSystemMessage = 
template`
<div class="message">
  <div>${0}</div>
</div>
`

const newAgentMessage = 
template`
<img src="${1}" class="agent-avatar">
<div class="message">
  <div>${0}</div>
</div>
`

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
const rateGood = document.getElementById('rate-good')
const rateBad = document.getElementById('rate-bad')
const rateComment = document.getElementById('rate-comment')
const rateSubmit = document.getElementById('rate-submit')
const headerTitle = document.getElementById('header-title')
const overlayClose = document.getElementById('overlay-close')
const overlay = document.getElementById('overlay')
const feedbackName = document.getElementById('feedback-agent-name')
const feedbackAvatar = document.getElementById('feedback-agent-avatar')
// Agents array, 'is visitor chatting' flag

const agents = []
let chatting = false

const findAgentById = (agentId) => agents.find((agent) => agent.id === agentId)

// Append message function

const appendVisitorMessage = (text) => {
  const messageDivContainer = document.createElement('div')
  messageDivContainer.classList.add('message-container', 'visitor')
  messageDivContainer.innerHTML = newVisitorMessage(text);
  messageList.appendChild(messageDivContainer)
  messageList.scrollTop = messageList.scrollHeight
}

const appendAgentMessage = (text, agent) => {
  const messageDivContainer = document.createElement('div')
  messageDivContainer.classList.add('message-container', 'agent')
  messageDivContainer.innerHTML = newAgentMessage(text, agent.avatarUrl);
  messageList.appendChild(messageDivContainer)
  messageList.scrollTop = messageList.scrollHeight
}

const appendSystemMessage = (text) => {
  const messageDivContainer = document.createElement('div')
  messageDivContainer.classList.add('message-container', 'system')
  messageDivContainer.innerHTML = newSystemMessage(text);
  messageList.appendChild(messageDivContainer)
  messageList.scrollTop = messageList.scrollHeight
}

const appendRating = () => {
  const messageDivContainer = document.createElement('div')
  messageDivContainer.classList.add('message-container', 'system')

  messageDivContainer.innerHTML = goodRateMessage;
  messageList.appendChild(messageDivContainer)
  messageList.scrollTop = messageList.scrollHeight
}

const appendAgent = (agent) => {
  console.log(agent);
  const messageDivContainer = document.createElement('div')
  messageDivContainer.classList.add('message-container', 'system')

  messageDivContainer.innerHTML = newAgentConnectMessage(agent.avatarUrl, agent.name, agent.jobTitle);
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

const writeWelcomeMessage = () => {
  appendSystemMessage('Welcome! To connect with an agent, type your problem into the text area below.')
}

// hide prechat

const hidePrechat = () => prechatForm.classList.add('hide')

// Set the active agent
const setAgent = (agent) => {
  if (!agent.avatarUrl.startsWith('https://') && !agent.avatarUrl.startsWith('http://')) {
    agent.avatarUrl = 'https://' + agent.avatarUrl;
  }

  headerTitle.innerHTML = agent.name
  feedbackName.innerHTML = agent.name
  feedbackAvatar.src = agent.avatarUrl

  appendSystemMessage('Now connected with');
  appendAgent(agent)
  rate.classList.remove('hide')
}

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
  writeWelcomeMessage()
}

overlayClose.addEventListener('click', () => {
  overlay.classList.add('hide');
})

rate.addEventListener('click', () => {
  overlay.classList.remove('hide');
})

rateGood.addEventListener('click', () => {
  rateGood.classList.toggle('selected');
  rateBad.classList.remove('selected');
});

rateBad.addEventListener('click', () => {
  rateBad.classList.toggle('selected');
  rateGood.classList.remove('selected');
});

rateSubmit.addEventListener('click', () => {
  let rating
  if (rateGood.classList.contains('selected')) {
    rating = 'good'
  }
  else if (rateBad.classList.contains('selected')) {
    rating = 'bad'
  }
  else {
    // Close the rating and don't submit
    overlay.classList.add('hide')
    return;
  }

  sdk.rateChat({
    rate: rating,
    comment: rateComment.value
  })
  overlay.classList.add('hide')
  //appendRating();
});

// ***************************************** //
// ************* SDK Events **************** //
// ***************************************** //

// New message callback handler - detect author, append message

sdk.on('new_message', (data) => {
  console.log('new_message')
  const authorType = data.authorId.indexOf('@') === -1 ? 'visitor' : 'agent'
  if (authorType === 'agent') {
    const agent = findAgentById(data.authorId)
    appendAgentMessage(data.text, agent)
  }
  else {
    appendVisitorMessage(data.text)
  }  
})

sdk.on('new_file', (data) => {
  console.log('new_file')
})

sdk.on('visitor_queued', (queueData) => {
  console.log('visitor_queued')
  showQueueMessage(queueData.waitingTime, queueData.numberInQueue)
})


// Connection status changed callback handler - toggle message about connection problems, toggle input

sdk.on('connection_status_changed', (data) => {
  console.log('connection_status_changed')
  if (data.status === 'connected') {
    enableInput()
    connectionMessage.classList.add('hide')
    if (!chatting) {
      setTimeout(showPrechat, 100)      
    }
  } else {
    disableInput('Disconnected')
    connectionMessage.classList.add('disconnected')
    connectionMessage.classList.remove('hide')
  }
})

// Chat ended callback handler, append system message and disable input

sdk.on('chat_ended', (data) => {
  console.log('chat_ended')
  appendSystemMessage('Chat is closed')
  disableInput('Chat is closed')
})

// Chat started callback handler - set chatting flag, hide prechat form

sdk.on('chat_started', () => {
  console.log('chat_started')
  chatting = true
  hidePrechat()
  hideQueueMessage()
})

// Agent changed callback handler - add agent to agent's array

sdk.on('agent_changed', (data) => {
  console.log('agent_changed')
  agents.push(data)
  setAgent(data);
})

// Typing indicator callback handler, show / hide bar

sdk.on('typing_indicator', (data) => {
  console.log('typing_indicator')
  if (data.isTyping) {
    return showTypingIndicator()
  }
  hideTypingIndicator()
})

// Status changed callback handler - show offline message if all agents are offline

sdk.on('status_changed', (data) => {
  console.log('status_changed')
  if (data.status !== 'online') {
    offlineMessage.classList.remove('hide')
    disableInput('Chat is offline')

  } else {
    offlineMessage.classList.add('hide')
    enableInput()
  }
})