let loading = document.querySelector(".loadingContainer");

var loading2 = bodymovin.loadAnimation({
    container: document.getElementById('loading'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'load.json'
});

window.onload = function(){
    loading.style.animation = "fadeOut 0.2s 3s ease-in-out forwards";
    setTimeout(loadAfterTime, 3200);
};

function loadAfterTime(){

    loading.style.display = "none";
}