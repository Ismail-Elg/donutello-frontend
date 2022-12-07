let bg = document.querySelector('.bg');
let buttonBg = document.querySelector('.button');
let h1 = document.querySelector('.h1Container');

let color = ['#82D1E4', '#F7F249', '#E72C70', '#F7F249'];
let bgColor = ['#F7F249', '#82D1E4', '#F7F249', '#E72C70'];

let i = 0;
setInterval(function(){
    bg.style.backgroundColor = color[i];
    buttonBg.style.backgroundColor = bgColor[i];
    buttonBg.style.color = color[i]; 
    h1.style.color = bgColor[i];

    i++;
    if(i == color.length){
        i = 0;
    }
}, 1000);