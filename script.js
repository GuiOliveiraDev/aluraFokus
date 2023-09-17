const html = document.querySelector('html');
const btnFoco = document.querySelector('.app__card-button--foco')
const btnCurto = document.querySelector('.app__card-button--curto')
const btnLongo = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const title = document.querySelector('.app__title')
const listBtn = document.querySelectorAll('.app__card-button')

btnFoco.addEventListener('click', () => {
    changeContext('foco')
    btnFoco.classList.add('active')
})

btnCurto.addEventListener('click', () => {
    changeContext('descanso-curto')
    btnCurto.classList.add('active')

})

btnLongo.addEventListener('click', () => {
    changeContext('descanso-longo')
    btnLongo.classList.add('active')

})

const changeContext = (context) => {
    
    //loop to remove "active" class of all buttons.
    
    // listBtn.forEach((context) => {
    //     context.classList.remove('active')
    //     console.log(context);
    // })

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


