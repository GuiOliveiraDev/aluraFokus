const html = document.querySelector('html');
const btnFoco = document.querySelector('.app__card-button--foco')
const btnCurto = document.querySelector('.app__card-button--curto')
const btnLongo = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const title = document.querySelector('.app__title')
const listBtn = document.querySelectorAll('.app__card-button')
const startPauseBtn = document.querySelector('#start-pause')
const musicInput = document.querySelector('#alternar-musica')
const startOrPauseBtn = document.querySelector('#start-pause span')
const playPauseIcon = document.querySelector('.app__card-primary-butto-icon')
const timerOnScreen = document.querySelector('#timer')

const musicAudio = new Audio('/sons/luna-rise-part-one.mp3')
const pauseTimerAudio = new Audio('/sons/pause.mp3');
const playTimerAudio = new Audio('/sons/play.wav');
const endTimerAudio = new Audio('/sons/beep.mp3');

let timeElapsedInSeconds = 1500;
let idInterval = null;

musicAudio.loop = true

musicInput.addEventListener('change', () => {

    if (musicAudio.paused) {
        musicAudio.play();
    } else {
        musicAudio.pause();
    }

})

btnFoco.addEventListener('click', () => {
    timeElapsedInSeconds = 1500;
    changeContext('foco')
    btnFoco.classList.add('active')
})

btnCurto.addEventListener('click', () => {
    timeElapsedInSeconds = 300;
    changeContext('descanso-curto')
    btnCurto.classList.add('active')

})

btnLongo.addEventListener('click', () => {
    timeElapsedInSeconds = 900;
    changeContext('descanso-longo')
    btnLongo.classList.add('active')

})

const changeContext = (context) => {
    
    //loop to remove "active" class of all buttons.
    
    // listBtn.forEach((context) => {
    //     context.classList.remove('active')
    //     console.log(context);
    // })

    showTimer();

    for (let i = 0; i < listBtn.length; i++) {
        listBtn[i].classList.remove('active')
    }
    
    // change HTML and IMG's by the context.
    
    html.setAttribute('data-contexto' , context)
    banner.setAttribute('src', `/imagens/${context}.png`)
    
    // change the title by the context.
    
    if (context === 'foco'){
        
        title.innerHTML = `
        Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>
        `
        
    } else if (context === 'descanso-curto') {
        
        title.innerHTML = `Que tal dar uma respirada? <br>
        <strong class="app__title-strong">Faça uma pausa curta!</strong>`
        
    } else if (context === 'descanso-longo') {
        
        title.innerHTML = `Hora de voltar à superfície.
        <br>
        <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        
    }

}

// Countdown function:

const countdown = () => {
    
    
    if (timeElapsedInSeconds <= 0 ) {
        endTimerAudio.play();
        console.log('tempo finalizado');
        resetInterval();
        return
    }
    
    timeElapsedInSeconds -= 1
    showTimer();
    
}    

const startOrPauseCountdown = () => {
    
    if(idInterval) {
        resetInterval()
        pauseTimerAudio.play()
        startOrPauseBtn.innerHTML = 'Começar'
        playPauseIcon.setAttribute('src', '/imagens/play_arrow.png')
        return
    }

    playTimerAudio.play()
    idInterval = setInterval(countdown, 1000);
    startOrPauseBtn.innerHTML = 'Pausar'
    playPauseIcon.setAttribute('src', '/imagens/pause.png')
    
}

const resetInterval = () => {
    clearInterval(idInterval);
    idInterval = null;
    return
}

const showTimer = () => {
    const time = new Date(timeElapsedInSeconds * 1000);
    const formattedTime = time.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    timerOnScreen.innerHTML = `${formattedTime}`
}

showTimer();

startPauseBtn.addEventListener('click', startOrPauseCountdown)

