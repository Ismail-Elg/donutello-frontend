





const steps = document.querySelectorAll("[data-step]");
let progress = 0;
steps.forEach((step) => {
    step.style.display = "none";
    steps[0].style.display = "flex";
}
);

document.querySelector(".configurator__editor__next__button").addEventListener('click', () => {
  if(progress==0){
    document.querySelector(".configurator__editor__title").innerHTML = "GLAZUUR";
  steps.forEach((step) => {
        step.style.display = "none";
        steps[0].style.display = "none";
        steps[1].style.display = "flex";
  });
  progress=1;
  }
  else if(progress==1){
    document.querySelector(".configurator__editor__title").innerHTML = "SIROOP PATROON";
    steps.forEach((step) => {
        step.style.display = "none";
        steps[1].style.display = "none";
        steps[2].style.display = "flex";
  });
  progress=2;
}
else if(progress==2){
    document.querySelector(".configurator__editor__title").innerHTML = "TOPPING";
    steps.forEach((step) => {
        step.style.display = "none";
        steps[2].style.display = "none";
        steps[3].style.display = "flex";
    });
    progress=3;
}
else if(progress==3){
    document.querySelector(".configurator__editor__title").innerHTML = "LOGO";
    steps.forEach((step) => {
        step.style.display = "none";
        steps[3].style.display = "none";
        steps[4].style.display = "flex";
    });
    progress=4;
}
else if(progress==4){
    document.querySelector(".configurator__editor__title").innerHTML = "PROFICIAT JE DONUT IS KLAAR!";

    document.querySelector(".configurator__editor__next__button").innerHTML = "VOLTOOI";
    steps.forEach((step) => {
        step.style.display = "none";
        steps[4].style.display = "none";
        steps[5].style.display = "flex";
    });
    progress=5;
}
});
