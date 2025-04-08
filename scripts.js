// Variáveis iniciais
let largura_pagina
let comprimento_pagina
let vidas_jogador = 5
let dificuldade_jogo 
let jogo



function atualizaPagina() {
    location.reload()
}

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
    atualizaVidaJogador()
    if (vidas_jogador === 0) {
        jogoPerdido()
    }
    else {
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
    }
}

function iniciarJogo() {
    atualizaResolucao()
    selecionaDificuldade()
    atualizaVidaJogador()

    let tela_inicio_jogo = document.getElementById('inicio-jogo')
    tela_inicio_jogo.remove()

    if (dificuldade_jogo === 'Fácil') {
        jogo = setInterval(gerarMosquito, 3000)
        contador(30)
    }

    else if (dificuldade_jogo === 'Normal') {
        jogo = setInterval(gerarMosquito, 2000)
        contador(60)
    }

    else if (dificuldade_jogo === 'Difícil') {
        jogo = setInterval(gerarMosquito, 1000)
        contador(80)
    }

    else {
        alert('Erro ao gerar o mosquito! caso o erro persista entre em contato conosco =)')
    }
}

function jogoPerdido() {
    // Para o loop do jogo
    clearInterval(jogo)

    // Cria o container onde ficará os elementos da div
    let container = document.createElement('div')
    container.className = 'opcoes-jogo'

    // Cria o texto
    let texto_voce_perdeu = document.createElement('h1')
    texto_voce_perdeu.className = 'texto'
    texto_voce_perdeu.innerHTML = 'Você perdeu!'

    // Cria a imagem de fim de jogo
    let imagem_fim_de_jogo = document.createElement('img')
    imagem_fim_de_jogo.src = 'assets/game_over.png'

    // Cria o botão para iniciar novamente
    let botao_reiniciar = document.createElement('button')
    botao_reiniciar.className = 'btn btn-warning botao'
    botao_reiniciar.innerHTML = 'Voltar ao menu principal'
    botao_reiniciar.onclick = atualizaPagina

    document.body.appendChild(container)
    container.appendChild(imagem_fim_de_jogo)
    container.appendChild(texto_voce_perdeu)
    container.appendChild(botao_reiniciar)
}

function jogoGanho() {
    // Para o loop do jogo
    clearInterval(jogo)

    // Cria o container onde ficará os elementos da div
    let container = document.createElement('div')
    container.className = 'opcoes-jogo'

    let imagem_fim_de_jogo = document.createElement('img')
    imagem_fim_de_jogo.src = 'assets/vitoria.png'

    let botao_reiniciar = document.createElement('button')
    botao_reiniciar.className = 'btn btn-warning botao'
    botao_reiniciar.innerHTML = 'Voltar ao menu principal'
    botao_reiniciar.onclick = atualizaPagina

    document.body.appendChild(container)
    container.appendChild(imagem_fim_de_jogo)
    container.appendChild(botao_reiniciar)
}

function contador(tempo_total) {
    let segundos = 0;
    let contador = document.createElement('span');
    contador.className = 'contador';
    document.body.appendChild(contador)

    function somar() {
        if (segundos >= tempo_total) {
            clearInterval(contagem);
            jogoGanho();
        }
        else {
            segundos += 1;
            if (segundos <= 9) {
                contador.innerHTML = `0${segundos}`;
            } else {
                contador.innerHTML = segundos;
            }
        }
    }
    let contagem = setInterval(somar, 100);
}
