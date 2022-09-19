const button = document.querySelector('button')
const text = document.querySelector('.text')

const recognition = createRecognition()
let listening = false

console.log('oi')

button.addEventListener('click', e => {
    if(!recognition) return;

    listening ? recognition.stop() : recognition.start()

    button.innerHTML = listening ? 'Aperte para falar' : 'Parar de escutar' 

    if(!listening) {
        return text.innerHTML = "Clique no botão para captar sua voz"
    }

    button.classList.toggle('#ff0')
    button.classList.toggle('#ff0000')

    recognition.start()
})

function createRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = SpeechRecognition !== undefined ? new SpeechRecognition() : null
    if(!recognition) {
        text.innerHTML = "Speech recognition is not found"
        return null
    }

    recognition.lang = "pt_BR"

    recognition.onstart = () => listening = true
    recognition.onend = () => listening = false
    recognition.onerror = e => console.log('error', e)
    recognition.onresult = e => text.innerHTML = e.results[0][0].transcript

    return recognition
}
