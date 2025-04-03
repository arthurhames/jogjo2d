const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')

class Entidade{
    constructor(x, y, largura, altura, cor){
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.cor = cor
    }
    desenhar(){
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
}
class Personagem extends Entidade{
    
}
class Jogo{
    constructor(){
        this.loop = this.loop.bind(this)
    }
    loop(entidade){
        entidade.desenhar()
        resquestAnimationFrame(this.loop)
    }
}

const entidade = new Entidade(100, 100, 50, 50, 'red')
const jogo = new Jogo()
jogo.loop(entidade)
