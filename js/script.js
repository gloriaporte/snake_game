//Pegar o id do canvas
let canvas = document.getElementById("snake");
//O contexto desenha/renderiza o desenho que estará dentro do canvas,
//ao colocar 2d, estamos colocando o arquivo como 2d
let context = canvas.getContext("2d");
//32 pixels cada quadrado
let box = 32;
//Cobrinha, um array
let snake = [];
//Tamanho da cobrinha
snake[0] = {
  x: 8 * box,
  y: 8 * box
};
//Criar variável com a direção da cobra
let direction = "right";
//Criar a variável da comidinha com números aleatórios
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
};
//Variável da pontuação
let pontuacao = 0;
//Variável do modal
let pontos = document.getElementById("pontos");
let fimDeJogo = document.getElementById("gameover");


//Essa função vai criar um background
function criarBG(){
    //Definir uma cor verde claro pro fundo
    context.fillStyle = "lightgreen";
    //Vai desenhar o retângulo
    //O fillRect trabalha com parâmetros: altura e largura
    //Então tanto a largura como altura terão 16 pixels por quadradinho (32 por cada)
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// __________________________________
//Criação da cobrinha: será um array, e pra ela se "Mexer" colocará um no começo e retirará o do final

function criarCobrinha(){
    //O for vai repassar
    for (i = 0;i < snake.length;i++){
        context.fillStyle = "green";
        //O tamanho do box que vai ser o quadradinho
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}
//###################################################
//Desenhar as comidinhas da cobra
function drawFood(){

    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//____________________________________
document.addEventListener('keydown', update);

//Pegar o código das setas e redirecionar a cobrinha
function update(event){

    //Se o botão for o < e a direção n for right, muda pra left, mesma lógica p outros
    if(event.key === "ArrowLeft" && direction !== "right") direction = "left";
    if(event.key === "ArrowUp" && direction !== "down") direction = "up";
    if(event.key === "ArrowRight" && direction !== "left") direction = "right";
    if(event.key === "ArrowDown" && direction !== "up") direction = "down";
}

//____________________________________
//Criar função pra iniciar o jogo
function iniciarJogo(){

    //Pontos
    pontos.innerHTML = pontuacao + " pontos.";

    //Impedir que a cobra passe pelas paredes, ai ela aparece do outro lado da tela
    if (snake[0].x > 15 * box && direction === "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction === "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction === "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction === "up") snake[0].y = 16 * box;

    //Pra quando se chocar
    for (i = 1; i < snake.length; i++){
        //Se a posição for a mesma da cobra
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y){
                clearInterval(jogo);

            //Inserir game over e pontuação final
            fimDeJogo.classList.add("bg-game-over")
            fimDeJogo.innerHTML = 
            "<div class='alertgameover text-center p-5 rounded' role='alert'>"  +
                    "<div>" +
                    "<h2> GAME OVER</h2>" +
                    "<p> Voce perdeu :(</p>" +
                "</div>" +
                "<div class='mt-5'>" +
                    "<button onclick='window.location.reload();' class='btn-game-over'>Recomeçar</button>"  +
                "</div>" +
            "</div>";
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    //Setar X e Y pra ter um ponto de partida
    //Posição 0 de X
    let snakeX = snake[0].x;
    //Posição 0 de Y
    let snakeY = snake[0].y;

    //Criar as coordenadas da cobrinha em largura
    //Se ela estiver indo pro lado direito, vai add
    if(direction === "right") snakeX += box;
    //Se ela estiver indo pro lado direito, vai decrementar
    if(direction === "left") snakeX -= box;

    //Criar as coordenadas da cobrinha em altura
    //Se ela estiver indo pra cima, vai add
    if(direction === "up") snakeY -= box;
    //Se ela estiver indo pra baixo, vai decrementar
    if(direction === "down") snakeY += box;

    //Fazer a cobrinha crescer quando comer
    if (snakeX !== food.x || snakeY !== food.y){

        //Retirar ultimo elemento do array
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;

        pontuacao ++;
    }

    //Criar cabeça da cobrinha
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    //Agora ela tem movimento
    snake.unshift(newHead);
}

//Intervalo de 100 milissegundos pra iniciar jogo e a cada 100milissegundos vai continuar o jogo
let jogo = setInterval(iniciarJogo, 100);