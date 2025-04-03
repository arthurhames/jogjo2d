const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')
let gravidade = 0.5
let gameOver = false
let pontuacao = 0
let pontuacaoMaxima = localStorage.getItem('pontuacaoMaxima') || 0

document.addEventListener('click', reiniciarJogo)
document.addEventListener('keypress', (evento) => {
    if (evento.code == 'Space' && !personagem.pulando) {
        personagem.velocidade_y = 15
        personagem.pulando = true
    }
})

let personagem = {
    x: 100,
    y: canvas.height - 50,
    largura: 50,
    altura: 50,
    velocidade_y: 0,
    pulando: false,
    imagem: new Image()
}
personagem.imagem.src='./perso.png'

let obstaculo = {
    x: canvas.width - 100,
    y: canvas.height - 100,
    largura: 60,
    altura: 100,
    velocidade_x: 4, // Velocidade de movimento do obstáculo
    imagem: new Image()
}
obstaculo.imagem.src='./vilao.png'


function desenharPersonagem() {
    ctx.drawImage(
        personagem.imagem,
        personagem.x,
        personagem.y,
        personagem.largura,
        personagem.altura
    )
    // ctx.fillStyle = 'black'
    // ctx.fillRect(personagem.x, personagem.y, personagem.largura, personagem.altura)
}

function atualizaPersonagem() {
    if (personagem.pulando) {
        personagem.y -= personagem.velocidade_y
        personagem.velocidade_y -= gravidade
        if (personagem.y >= canvas.height - 50) {
            personagem.y = canvas.height - 50
            personagem.velocidade_y = 0
            personagem.pulando = false
        }
    }
}

function desenharObstaculo() {
    ctx.drawImage(
        obstaculo.imagem,
        obstaculo.x,
        obstaculo.y,
        obstaculo.largura,
        obstaculo.altura
    )
    // ctx.fillStyle = 'grey'
    // ctx.fillRect(obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura)
}

function atualizarObstaculo() {
    if (!gameOver) {
        obstaculo.x += obstaculo.velocidade_x
        if (obstaculo.x + obstaculo.largura < 0) {
            obstaculo.x = canvas.width
            obstaculo.velocidade_x -= 1
            obstaculo.altura = Math.random() * (150-90) +90
            pontuacao++
        }
    }
}

function desenharPontuacao() {
    ctx.fillStyle = 'black'
    ctx.font = '15px Times New Roman'
    ctx.fillText(`Pontuação: ${pontuacao}`, 20, 30)
    ctx.fillText(`Recorde: ${pontuacaoMaxima}`, 20, 60)
}

function verificaColisao() {
    if (
        obstaculo.x < personagem.x + personagem.largura &&
        obstaculo.x + obstaculo.largura > personagem.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y
    ) {
        gameOver = true
        obstaculo.velocidade_x = 0
        personagem.velocidade_y = 0
        ctx.fillStyle = 'black'
        ctx.font = '50px Times new Roman'
        ctx.fillText('GAME OVER', 250, 200)
        if (pontuacao > pontuacaoMaxima) {
            pontuacaoMaxima = pontuacao
            localStorage.setItem('pontuacaoMaxima', pontuacaoMaxima)
        }
    }
}

function reiniciarJogo() {
    gameOver = false
    personagem.y = canvas.height - 50
    personagem.velocidade_y = 0
    obstaculo.x = canvas.width - 100
    obstaculo.velocidade_x = -3
    pontuacao = 0
}

function loop() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenharPersonagem()
        atualizaPersonagem()
        desenharObstaculo()
        atualizarObstaculo()
        desenharPontuacao()
        verificaColisao()
    }
    requestAnimationFrame(loop)
}

loop()