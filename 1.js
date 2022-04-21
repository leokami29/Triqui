const selectBox = document.querySelector(".select-box"),
selectBtnX = selectBox.querySelector(".options .playerX"),
selectBtnO = selectBox.querySelector(".options .playerO"),
playBoard = document.querySelector(".play-board"),
players = document.querySelector(".players"),
allBox = document.querySelectorAll("section span"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");

window.onload = ()=>{
    for (let i = 0; i < allBox.length; i++) {
       allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

selectBtnX.onclick = ()=>{
    selectBox.classList.add("hide");//ocultar el cuadro de selección en el botón  del X jugador en el que se hizo clic
    playBoard.classList.add("show");//mostrar la sección del tablero de juego en el botón del X jugador al hacer clic
}

selectBtnO.onclick = ()=>{ 
    selectBox.classList.add("hide");//ocultar el cuadro de selección en el botón del O jugador en el que se hizo clic
    playBoard.classList.add("show");//mostrar la sección del tablero de juego en el botón del O  jugador al hacer clic
    players.setAttribute("class", "players active player");//agregando tres nombres de clase en el elemento del jugador
}

let playerXIcon = "fas fa-times",//nombre de clase de la fuente impresionante icono de cruz
playerOIcon = "far fa-circle",//nombre de clase de la fuente impresionante icono de circulo
playerSign = "X",//Supongamos que la jugadora será x
runBot = true;

function clickedBox(element){
    if(players.classList.contains("player")){//si el elemento de jugadores tiene contiene
        playerSign = "O";
        element.innerHTML = `<i class="${playerOIcon}"></i>`;//agregando una etiqueta de icono de círculo dentro del elemento en el que el usuario hizo clic
        players.classList.remove("active");
        //si el jugador selecciona O, cambiaremos el valor de playerSing a O
        element.setAttribute("id", playerSign);
    }else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`;//agregando una etiqueta de icono de equis dentro del elemento en el que el usuario hizo clic
        element.setAttribute("id", playerSign);
        players.classList.add("active");
    }
    selectWinner();//llamando la funcion selectWinner
    element.style.pointerEvents = "none";//una vez que el usuario selecciona cualquier cuadro, ese cuadro no se puede seleccionar de nuevo
    playBoard.style.pointerEvents = "none";//una vez que el usuario selecciona, no puede seleccionar ningún otro cuadro hasta que seleccione el cuadro
    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();//generando un retraso de tiempo aleatorio para que el bot se retrase aleatoriamente para seleccionar el cuadro
    setTimeout(()=>{
        bot(runBot);//llamando la funcion del bot 
    }, randomTimeDelay);//pasando el tiempo de retraso aleatorio
}

// función de clic de bot
function bot(){
    let array = [];//creando una matriz vacía, almacenaremos el índice de cuadro no seleccionado en esta matriz
    if(runBot){//si runbot es verdadero, ejecute los siguientes códigos
        //primero cambie el playerSing...así que si el usuario tiene un valor X en la identificación, entonces el bot tendrá O
        playerSign = "O";
        for (let i = 0; i < allBox.length; i++) {
            if(allBox[i].childElementCount == 0){//si el span no tiene ningún elemento hijo
                array.push(i); //insertar cuadros sin hacer clic o sin seleccionar dentro de la matriz significa que el span no tiene hijos
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)];//obtener un índice aleatorio de la matriz para que el bot seleccione un cuadro aleatorio no seleccionado
        if(array.length > 0){
            if(players.classList.contains("player")){ 
                playerSign = "X";
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                allBox[randomBox].setAttribute("id", playerSign);
                players.classList.add("active");
            }else{
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner();//llamando al ganador
        }
        allBox[randomBox].style.pointerEvents = "none";//una vez que el bot selecciona cualquier cuadro, el usuario no puede seleccionar o hacer clic en ese cuadro
        playBoard.style.pointerEvents = "auto";
        playerSign = "X";//pasndo los valores de X
    }
}

function getIdVal(classname){
    return document.querySelector(".box" + classname).id;//retorna el id nombre
}
function checkIdSign(val1, val2, val3, sign){ 
    if(getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign){
        return true;
    }
}
function selectWinner(){//si una combinación de ellos coincide, entonces seleccione el ganador
    if(checkIdSign(1,2,3,playerSign) || checkIdSign(4,5,6, playerSign) || checkIdSign(7,8,9, playerSign) || checkIdSign(1,4,7, playerSign) || checkIdSign(2,5,8, playerSign) || checkIdSign(3,6,9, playerSign) || checkIdSign(1,5,9, playerSign) || checkIdSign(3,5,7, playerSign)){
        //una vez que alguien gana el partido, detiene al bot
        runBot = false;
        bot(runBot);
       
        setTimeout(()=>{//retrasaremos para mostrar el cuadro de resultados
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 700);//700 ms de retraso
        wonText.innerHTML = `<p>${playerSign}</p> ganó el juego!`;
    }else{//condicion para el empate
        if(getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != ""){
            runBot = false;
            bot(runBot);
            setTimeout(()=>{
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700);
            wonText.textContent = "El partido ha sido empatado!";
        }
    }
}

replayBtn.onclick = ()=>{
    window.location.reload();
}