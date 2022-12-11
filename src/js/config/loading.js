let config = document.querySelector(".configurator");
config.style.display = "none";
let loading = document.querySelector(".loadingContainer");

var loading2 = bodymovin.loadAnimation({
    container: document.getElementById('loading'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'load.json'
});

window.onload = function(){
    setTimeout(loadAfterTime, 3000);
};

function loadAfterTime(){
    loading.style.display = "none";
    config.style.display = "block";
}