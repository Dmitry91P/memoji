var memoji = ['🐰', '🐹','🐻', '🐨', '🐯', '🐶'];
var box = Array.from(document.querySelectorAll(".box"));
var span = Array.from(document.querySelectorAll(".emoji"));
var timer = document.querySelector(".timer");
var again = document.querySelector(".again");
var result = document.querySelector(".result");
var letter = Array.from(result.querySelectorAll("span"));
var arr = [];
var interval;
var minute = "01";
var seconds = "00";
timer.innerHTML = minute + ":" + seconds;

function shuffle(arr){
	var j, temp;
	for(var i = arr.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

function sortMemoji(){
    shuffle(span);
    shuffle(memoji);
    var j = 0;
    var i = 0;
    span.forEach(s => {
        for(i; i == j; i++){
            s.textContent = memoji[i]
        }
        j++
        if(i == 6){
          i = 0;
          j= 0;
        shuffle(memoji);
        }
    })
 }
 
 box.forEach(el => el.addEventListener("click", function() {
    if(seconds == "00"){
            minute = "00"
            seconds = 60;
            timer.innerHTML = minute + ":" + seconds;
            interval = setInterval(time, 1000);
        }
        var back = el.querySelector(".back");
        var front = el.querySelector(".front");
        back.classList.toggle("rotate");
        front.classList.toggle("rotate");
       if(front.classList.contains("rotate") == true){
            arr.push(front);
         if(arr.length > 1 & arr.length < 3){
                if(arr[0].innerHTML == arr[1].innerHTML){
                   arr.forEach((a) =>{
                       a.classList.add("green")
                       a.parentElement.classList.add("disabled");
                       
                   })
               } if(arr[0].innerHTML !== arr[1].innerHTML){
                arr.forEach((a) =>{
                    a.classList.add("red");
                    a.parentElement.classList.add("disabled");
                })
               }
            }
            if(arr.length == 3){
                arr.forEach(a =>{
                    if(a.classList.contains("red") == true){
                        a.classList.remove("rotate");
                        a.previousElementSibling.classList.remove("rotate");
                        a.parentElement.classList.remove("disabled");
                        a.classList.remove("red");
                    }
                })
                 while(arr.length != 1){
                    arr.shift()
                }
            }
 } if (front.classList.contains("rotate") == false ) {
           var index = arr.indexOf(front)
           arr.splice(index, 1)
        }
}));

function addWindow (style){
        var shadow = document.querySelector(".shadow");
        shadow.style.display = style;
        var window = document.querySelector(".big_window");
        window.style.display = style;
}

function time (){
    seconds--;
       timer.innerHTML = minute + ":" + seconds;
        if(seconds < 10){
            timer.innerHTML = minute + ":0"+ seconds; 
        }
    if( box.every(el => el.classList.contains("disabled") == true)){
        clearInterval(interval);
        addWindow("flex");
        letter[0].textContent = "W";
        letter[1].textContent = "i";
        letter[2].textContent = "n";
        again.textContent = "Play again";
    }
    if(seconds == 0){
        clearInterval(interval)
        addWindow("flex");
        var last_letter = document.createElement("span");
        last_letter.textContent = "e";
        result.append(last_letter);
        letter.push(last_letter);
        letter[0].textContent = "L";
        letter[1].textContent = "o";
        letter[2].textContent = "s";
        again.textContent = "Try again";
    }
}

  function arr_Clean(arr){
    arr.forEach( a => {
        a.innerHTML = ""
    })
}

again.addEventListener("click", function(){
    box.forEach(el => {
        el.classList.remove("disabled");
        var back = el.querySelector(".back");
        var front = el.querySelector(".front");
        back.classList.remove("rotate");
        front.classList.remove("rotate");
        front.classList.remove("red");
        front.classList.remove("green");
    })
    arr_Clean(span);
    sortMemoji();
    arr_Clean(letter);
    if( letter.length > 3){
        letter.splice(3,1)
        result.removeChild(result.lastElementChild);
    }
    addWindow("none");
    while(arr.length != 0){
        arr.shift()
    }
    minute = "01";
    seconds = "00";
    timer.innerHTML = minute + ":" + seconds;
})