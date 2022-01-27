function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = function(){
    backgroundEl = [
        document.getElementById('bg0'),
        document.getElementById('bg1'),
        document.getElementById('bg2'),
        document.getElementById('bg3'),
        document.getElementById('bg4'),
    ];
    contentHeader = document.getElementById('header-contents');
    HeaderSetPositions();
    content = document.getElementById('content');

    var canvasChar = document.getElementById('canvas-character');
    contextChar = canvasChar.getContext("2d");
    charSheet = document.getElementById('character-sheet');
    contextChar.drawImage(charSheet, 0, 0);
    charIndex = 0;
    charCanvasWidth = 72;
    charLock = false;
    charIndexMax = 8;
    characterCards = document.getElementsByClassName('character-card');

}

async function charNavigate(direction){
    var translateDistance = "40px";
    if(!charLock){
        charLock = true;
        var lastIndex = charIndex;
        characterCards[lastIndex].style.opacity = "0";
        switch(direction){
            case 1:
                var newIndex = charIndex+1;
                if(charIndex >= charIndexMax-1) newIndex = 0;
                characterCards[lastIndex].style.transform = "translateX(-"+translateDistance+")";
                characterCards[newIndex].style.transform = "translateX("+translateDistance+")";
                characterCards[newIndex].style.display = "block";
                for(var i=0; i<6; i++){
                    await sleep(50);
                    contextChar.drawImage(charSheet, -(charIndex*7+i+1)*charCanvasWidth, 0);
                }
                charIndex += 1;
                if(charIndex >= charIndexMax) charIndex = 0;
                await sleep(50);
                contextChar.drawImage(charSheet, -charIndex*7*charCanvasWidth, 0);
                break;
            case -1:
                if(charIndex == 0) charIndex = charIndexMax;
                characterCards[lastIndex].style.transform = "translateX("+translateDistance+")";
                characterCards[charIndex-1].style.transform = "translateX(-"+translateDistance+")";
                characterCards[charIndex-1].style.display = "block";
                for(var i=0; i<6; i++){
                    await sleep(50);
                    contextChar.drawImage(charSheet, -(charIndex*7-i)*charCanvasWidth, 0);
                }
                charIndex -= 1;
                await sleep(50);
                contextChar.drawImage(charSheet, -charIndex*7*charCanvasWidth, 0);
                break;
        }
        characterCards[lastIndex].style.display = "none";
        characterCards[charIndex].style.opacity = "1";
        characterCards[charIndex].style.transform = "translateX(0)";
        charLock = false;
    }
}

document.addEventListener('scroll', function(e){
    HeaderSetPositions();
});

function HeaderSetPositions(){
    ParallaxElement(backgroundEl[0], 5);
    ParallaxElement(backgroundEl[1], 1.7);
    ParallaxElement(backgroundEl[2], 1.5);
    ParallaxElement(backgroundEl[3], 1);
    ParallaxElement(backgroundEl[4], 1);
    ParallaxElement(contentHeader, 2);
}

function ParallaxElement(el, division){
    el.style.top = (-window.scrollY/division)+"px";
}