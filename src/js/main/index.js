let bg = document.querySelector('.bg');

let color = ['#82D1E4', '#F7F249', '#E72C70', '#F7F249'];

let i = 0;
setInterval(function(){
    bg.style.backgroundColor = color[i];
    i++;
    if(i == color.length){
        i = 0;
    }
}, 1000);