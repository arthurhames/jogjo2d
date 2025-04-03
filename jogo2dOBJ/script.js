const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')

document.addEventListener('keypress', (e)=>{
    if(e.code=='Space'){
        personagem.saltar()
    }
})

class Entidade{
    constructor(x, y, largura, altura, cor){
        this.x = x
        this.y = y
        this.largura = largura
        this.altura = altura
        this.cor = cor
    }
    desenhar(){
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
}

class Personagem extends Entidade{
    #velocidade_y
    constructor(x, y, largura, altura, cor){
        super(x, y, largura, altura, cor)
        this.#velocidade_y = 0
        this.pulando = false
    }
    saltar(){
        this.#velocidade_y= 15
        this.pulando = true
    }
    atualizar(){
        if (this.pulando){
            this.y -= this.#velocidade_y
            this.#velocidade_y -= Jogo.gravidade
            if (this.y >= canvas.height - 50){
                this.y = canvas.height - 50
                this.#velocidade_y = 0
                this.pulando = false
            }
        }
        
    }
    verificarColisao(){
        if(
            obstaculo.x < this.x + this.largura &&
            obstaculo.x + obstaculo.largura > this.x &&
            this.y < obstaculo.y + obstaculo.altura &&
            this.y + this.altura > obstaculo.y
        ){            
            obstaculo.velocidade_x = 0
            this.velocidade_y = 0
            ctx.fillStyle = 'black'
            ctx.font = '50px Times new Roman'
            ctx.fillText('GAME OVER', 250, 200)
            Jogo.gameOver = true
            ctx.font = '20px Times new Roman'
            if (pontuacao_atual > pontuacaoMaxima) {
                localStorage.setItem('PM', pontuacao_atual)
                ctx.fillText(`Novo recorde: ${pontuacao_atual}`, 50, 150)
                return
            }
            ctx.fillText(`Pontos da Jogada: ${pontuacao_atal}`, 50, 150)
        }
    }
}

class Obstaculo extends Entidade{
    #velocidade_x
    constructor(x, y, largura, altura, cor){
        super(x, y, largura, altura, cor)
        this.#velocidade_x = 0
    }
    atualizar(){
        this.x -= this.#velocidade_x
        if (this.x <=0 - this.largura < 0) {
            this.x = canvas.width
            this.#velocidade_x += 1
            this.altura = Math.random() * (150-90) +90
            this.altura = nova_altura
            this.y = canvas.height - nova_altura
        }
        
    }
}

class Jogo{
    static gravidade = 0.5
    static gameOver = false
    constructor(){   
        this.personagem= new Personagem(100, canvas.heigth -50, 50, 50, 'red')
        this.obstaculo= new Obstaculo(canvas.width -50, canvas.heigth -100, 50, 'black')
    }
    loop(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.personagem.desenhar()
        this.obstaculo.desenhar()
        this.obstaculo.atualizar()
        this.personagem.atualizar()
        this.personagem.verificarColisao()
        requestAnimationFrame(this.loop)
    }
}

const jogo = new Jogo()
jogo.loop()