let largura_pagina
let comprimento_pagina
let vidas_jogador = 5

let dificuldade_jogo = ''

function atualizaResolucao() {
    largura_pagina = window.innerWidth
    comprimento_pagina = window.innerHeight
}

function atualizaVidaJogador() {
    let container = document.getElementById('container-vidas')
    container.innerHTML = ''
    let x = 1

    // Gera os corações cheios
    while (x <= vidas_jogador ) {
        let coracao = document.createElement('img')
        coracao.src = 'assets/coracao_cheio.png'
        coracao.className = 'coracao'
        container.appendChild(coracao)
        x += 1
    }

    // Gera os corações vazios
    while (x <= 5) {
        let coracao = document.createElement('img')
        coracao.src = 'assets/coracao_vazio.png'
        coracao.className = 'coracao'
        container.appendChild(coracao)
        x += 1

    }
}

function selecionaDificuldade() {
    dificuldade_jogo = document.getElementById('seletor-dificuldade').value
}

function gerarMosquito() {

    let vivo = true

    // Atributos mosquito
    let posicao_x = Math.floor(Math.random() * ((largura_pagina - 100) - 10 ) + 10)
    let posicao_y = Math.floor(Math.random() * ((comprimento_pagina - 100) - 10 ) + 10)
    let tamanho_mosquito = Math.floor(Math.random() * (100 - 60) + 60)
    let mosquito = document.createElement('img')

    // Propriedades mosquito
    mosquito.src = 'assets/mosquito.png'
    mosquito.draggable = false
    mosquito.style.height = `${tamanho_mosquito}px`
    mosquito.style.width = `${tamanho_mosquito}px`
    mosquito.style.position = 'absolute'
    mosquito.style.left = `${posicao_x}px`
    mosquito.style.top = `${posicao_y}px`
    
    // Atribui a função matarmosquito ao clicar no elemento
    
    function matarMosquito() {
        mosquito.remove()
        vivo = false
    }

    // Função para verificar se o mosquito foi morto ou não
    function perdeVida() {
        if (vivo) {
            console.log('Perdeu uma vida')
            mosquito.remove()
            vidas_jogador -= 1
        } else {
            console.log('Matou o mosquito a tempo')
        }
        atualizaVidaJogador()
    }

    mosquito.onclick = matarMosquito

    if (dificuldade_jogo === 'Fácil') {
        document.body.appendChild(mosquito)
        setTimeout(perdeVida, 3000)
    }

    else if (dificuldade_jogo === 'Normal') {
        document.body.appendChild(mosquito)
        setTimeout(perdeVida, 2000)
    }

    else if (dificuldade_jogo === 'Difícil') {
        document.body.appendChild(mosquito)
        setTimeout(perdeVida, 1000)
    }

    else {
        alert('Nenhuma das opções possíveis foram selecionadas')
    }

    // Adiciona o mosquito na tela
    
    console.log('Gerou mosquito')
}


function iniciarJogo() {
    atualizaResolucao()
    selecionaDificuldade()
    atualizaVidaJogador()
    let imagem_inicio_jogo = document.getElementById('opcoes-inicio-jogo')
    imagem_inicio_jogo.remove()


    if (dificuldade_jogo === 'Fácil') {
        setInterval(gerarMosquito, 3000)
        console.log('Gerando mosquito: Facil')
    }

    else if (dificuldade_jogo === 'Normal') {
        setInterval(gerarMosquito, 2000)
        console.log('Gerando mosquito: Normal')
    }

    else if (dificuldade_jogo === 'Difícil') {
        setInterval(gerarMosquito, 1000)
        console.log('Gerando mosquito: Dificil')
    }

    else {
        alert('Mosquito não sendo gerado na iniciarJogo()')
    }
}
/*
 Começa o jogo
atualizaResolucao()
atualizaVidaJogador()
setInterval(gerarMosquito, 3000)
*/
