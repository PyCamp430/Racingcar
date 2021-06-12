var player = {};
keys = {ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false}
var roadloc = document.querySelector(".road").getBoundingClientRect();
var hitsspeed = 5; 
var score = 0;
var count = 100;

function movelines() {
    var alllines = document.querySelector(".alllines");
    if(alllines){
        linesloc = alllines.getBoundingClientRect();
        if(linesloc.y > roadloc.y-240){
            linesloc.y = 0;
        }
        linesloc.y += -20;
        alllines.style.marginTop = linesloc.y+"px";
    }
}

function movehits(car) {
    let hits = document.querySelectorAll(".hits");
    hits.forEach(element => {
        if(element.y >= roadloc.height-75){
            score += 10;
            element.y = 0;
            element.style.left = (Math.floor(Math.random()*(roadloc.right-roadloc.left-50))+roadloc.left+5)+"px";
        }
        element.y += hitsspeed;
        element.style.top = element.y+"px";
        if(collision(car, element) == true){
            count = count-1;
            document.querySelector(".car").style.backgroundImage = "url('./images/carthree.png')";
            setTimeout(() => {
                document.querySelector(".car").style.backgroundImage = "url('./images/car.png')"}, 1000);
        }
    })
}

function collision(a, b) {
    var acar = a.getBoundingClientRect();
    var bcar = b.getBoundingClientRect();
    if((acar.bottom < bcar.top) || (acar.top > bcar.bottom) || (acar.right < bcar.left) || (acar.left > bcar.right)){
       return false
    }
    else {
        return true
    }
}

function endGame() {
    player.start = false;
    document.querySelector(".car").remove();
    document.querySelectorAll(".hits").forEach((element) => {
        element.remove();
    })
    document.querySelector(".road").style.display = "none";
    document.querySelector("#message1").innerText = "Game Over!";
    document.querySelector("#message2").innerText = `Your Score is: ${score}`;
    document.querySelector("#message3").innerText = "Press here to Play again";
    document.querySelector(".heading").style.display = "block";
}
   
function playgame() {
    if(player.start == true){
        let car = document.querySelector(".car");
        movelines();
        movehits(car);
        document.addEventListener("keydown", (e) => {
            keys[e.key] = true
        })
        if(keys.ArrowUp && car.offsetTop > 20){
            car.style.top = (car.offsetTop-10)+"px";
            keys.ArrowUp = false;
        }
        else if(keys.ArrowDown && car.offsetTop < (roadloc.height-100)){
            car.style.top = (car.offsetTop+10)+"px";
            keys.ArrowDown = false;
        }
        else if(keys.ArrowLeft && car.offsetLeft > (roadloc.left+30)){
            car.style.left = (car.offsetLeft-20)+"px";
            keys.ArrowLeft = false;
        }
        else if(keys.ArrowRight && car.offsetLeft < (roadloc.right-60)){
            car.style.left = (car.offsetLeft+20)+"px";
            keys.ArrowRight = false;
        }
        window.requestAnimationFrame(playgame)
        document.querySelector(".score").innerText = `Score: ${score}
        ❤ ${Math.round(count/5)}`;
        if(Math.round(count/5) <= 0){
            endGame();
        }
    }
}

document.addEventListener("DOMContentLoaded", function start() {
    document.querySelector(".road").style.display = "none";
    document.querySelector(".start").onclick = function() {
        player.start = true;
        score = 0;
        count = 100;
        document.querySelector("body").style.backgroundImage = "url('./images/garden.jpg')";
        document.querySelector(".heading").style.display = "none";
        document.querySelector(".road").style.display = "block";
        var cardiv = document.createElement("div");
        cardiv.setAttribute("class", "car");
        document.querySelector(".road").appendChild(cardiv);
        for(i=0; i<3; i++){
            var hitdiv = document.createElement("div");
            hitdiv.setAttribute("class", "hits");
            hitdiv.y = (i*150);
            hitdiv.style.top = hitdiv.y+"px";
            hitdiv.style.left = (Math.floor(Math.random()*(roadloc.right-roadloc.left-50))+roadloc.left+5)+"px";
            document.querySelector(".road").appendChild(hitdiv);
        }
        var scorediv = document.createElement("div");
        scorediv.setAttribute("class", "score");
        document.querySelector(".road").appendChild(scorediv);
        window.requestAnimationFrame(playgame);
    }
})
