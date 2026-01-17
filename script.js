const socket = io('http://localhost:3000')
const messageContainer = document.querySelector(".message-container")
const form = document.querySelector(".send-container")
const input = document.getElementById("message-input")

socket.on("chat-message", data =>{
    appendMessage(`${data.user}: ${data.message}`)
})

const name = prompt("What is your name?")
appendMessage("You Joined")
socket.emit("new-user", name)

socket.on("user-connected", user =>{
    appendMessage(`${user} connected`)
})

socket.on("user-disconnected", user=>{
    appendMessage(`${user} disconnected`)
})

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    const message = input.value
    appendMessage(`You: ${message}`)
    socket.emit("send-chat-message", message)
    input.value = ""
})

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}