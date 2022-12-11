import * as THREE from "three";
import { TextureLoader } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

class Scene {
  constructor() {

 
  
    this.CANVAS_WIDTH = document.querySelector(".configurator__scene").clientWidth;
    this.CANVAS_HEIGHT = document.querySelector(".configurator__scene").clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.CANVAS_WIDTH / this.CANVAS_HEIGHT,
      0.1,
      1000
    );
    


    this.camera.position.set(0, 2, 2);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector(".webgl"),
      antialias: true,
      alpha: true,
    });



    this.renderer.setSize(this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    this.donut = null;

  }

  init() {
    this.addEvents();
    this.helpers();
    this.load();
    this.lights();
  }

  load(){
    const loader = new GLTFLoader();
    loader.load(
        "/src/assets/models/donut.glb",
        (gltf) => {

            this.donut = gltf.scene;
            

            this.scene.add(this.donut);


            this.donut.children[0].visible = false;
            this.donut.children[1].visible = true;
            this.donut.children[2].visible = false;
            this.donut.children[3].visible = false;
            this.donut.children[4].visible = false;
            this.donut.children[5].visible = false;
            this.donut.children[6].visible = false;
            this.donut.children[7].visible = false;
            this.donut.children[8].visible = false;
            this.donut.children[9].visible = false;

            //create a new material for first child
            const doughMaterial = new THREE.MeshStandardMaterial({
                color: 0xE5BA73,
                metalness: 0,
                roughness: 1,
            });

            const doughFilling = new THREE.MeshStandardMaterial({
                color: 0x3C2317,
                metalness: 0,
                roughness: 1,
            });

            const cartMaterial = new THREE.MeshStandardMaterial({
                color: 0xFFFFFF,
                metalness: 0,
                roughness: 1,
            });

           
            this.donut.children[0].material = doughMaterial;
            this.donut.children[1].children[1].material = doughMaterial;
            this.donut.children[1].children[2].material = doughFilling;
            this.donut.children[1].children[0].material = doughFilling;
            this.donut.children[5].material.color.setHex(0x3C2317);
            this.donut.children[6].children[0].material.color.setHex(0x3C2317);
            this.donut.children[6].children[2].material.color.setHex(0x3C2317);
          
            //create a material for sugar 
            const sugarMaterial = new THREE.MeshStandardMaterial({
              color: 0xF2DEBA,
              metalness: 0,
              roughness: 1,
           });

           this.donut.children[6].children[1].material = sugarMaterial;

           this.donut.children[7].material = cartMaterial;
            this.donut.children[8].material = cartMaterial;
            this.donut.children[9].material = cartMaterial;
  
          }
        );
     
  }
  
  addEvents() {
    requestAnimationFrame(this.run.bind(this));
    window.addEventListener("resize", this.onResize.bind(this), false);
    const doughChoice = document.querySelectorAll(".configurator__editor__choices");
    doughChoice.forEach((choice) => {
      choice.addEventListener("click", (e) => {
        doughChoice.forEach((choice) => {
          choice.classList.remove("configurator__editor__choices__pick-active");
        });
        e.target.classList.add("configurator__editor__choices__pick-active");
        const dough = e.target.dataset.doughfilling;
        const glaze = e.target.dataset.glaze;
        const pattern = e.target.dataset.pattern;
        const topping = e.target.dataset.topping;
        const logo = e.target.dataset.logo;
        this.changeDough(dough);
        this.changeGlaze(glaze);
        this.changePattern(pattern);
        this.changeTopping(topping);
        this.changeLogo(logo);
      });
    });

    let progress = 0;
    const button = document.querySelector(".configurator__editor__next__button");
    button.addEventListener("click", (e) => {
      if(progress==0){
        this.donut.children[0].visible = true;
        this.donut.children[1].visible = false;
        this.donut.children[2].visible = true;
        //add material to second child
        const glazeMaterial = new THREE.MeshStandardMaterial({
          color: 0xFF577F,
          metalness: 0,
          roughness: 1,
        });
        this.donut.children[2].material = glazeMaterial;
        progress = 1;
      }
      else if(progress==1){
        this.donut.children[1].visible = false;

        this.donut.children[3].visible = false;
        this.donut.children[4].visible = false;
        this.donut.children[5].visible = true;
        this.donut.children[6].visible = false;
        progress = 2;
      }
      else if(progress==2){
        
        this.donut.children[4].visible = false;
    
        this.donut.children[6].visible = false;
        progress = 3;
      }
      else if(progress==3){
        this.donut.children[7].visible = true;

        progress = 4;
      }
    });

    document.getElementById('file').addEventListener('change', (e) => {
      
      let file = e.target.files[0];
      if(file.type == "image/png" || file.type == "image/jpeg"){
        //use a texture loader 
        const logoMaterial = new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load(URL.createObjectURL(file)),
          transparent: true,
          opacity: 1,
          side: THREE.DoubleSide,
        });
        this.donut.children[7].material = logoMaterial;
        this.donut.children[8].material = logoMaterial;
        this.donut.children[9].material = logoMaterial;
       
      }
    });
  }
  imageIsLoaded() {
    const logoMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(img.src),
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
    });
    this.donut.children[9].material = logoMaterial;
  }
  
  changeDough(dough) {
 
    if(dough==0){
      this.donut.children[1].children[2].visible = false;
      this.donut.children[1].children[0].visible = false;
    }
    else if(dough==1){
      this.donut.children[1].children[2].visible = true;
      this.donut.children[1].children[0].visible = true;
      this.donut.children[1].children[2].material.color.setHex(0x3C2317);
      this.donut.children[1].children[0].material.color.setHex(0x3C2317);
    }
    else if(dough==2){
      this.donut.children[1].children[2].visible = true;
      this.donut.children[1].children[0].visible = true;
      this.donut.children[1].children[2].material.color.setHex(0xFF577F);
      this.donut.children[1].children[0].material.color.setHex(0xFF577F);
    }

  }

  changeGlaze(glaze) {
    if(glaze==0){
      this.donut.children[2].visible = false;
    }
    else if(glaze==1){
      this.donut.children[2].visible = true;
      this.donut.children[2].material.color.setHex(0x3C2317);
    }
    else if(glaze==2){
      this.donut.children[2].visible = true;
      this.donut.children[2].material.color.setHex(0xFF577F);
    }
  }

  changePattern(pattern) {
    if(pattern==0){
      this.donut.children[5].visible = false;
    }
    else if(pattern==1){
      this.donut.children[5].visible = true;
      this.donut.children[5].material.color.setHex(0x3C2317);
    }
  }

  changeTopping(topping) {
    if(topping==0){
      this.donut.children[3].visible = false;
      this.donut.children[4].visible = false;
      this.donut.children[6].visible = false;
    }
    else if(topping==1){
      this.donut.children[3].visible = true;
      this.donut.children[4].visible = false;
      this.donut.children[6].visible = false;
   
    }
    else if(topping==2){
      this.donut.children[3].visible = false;
      this.donut.children[4].visible = true;
      this.donut.children[6].visible = false;
    }
    else if(topping==3){
      this.donut.children[3].visible = false;
      this.donut.children[4].visible = false;
      this.donut.children[6].visible = true;
    }
  }
  
  changeLogo(logo) {
    if(logo==0){
      this.donut.children[7].visible = false;
      this.donut.children[8].visible = false;
      this.donut.children[9].visible = false;
    }
    else if(logo==1){
      this.donut.children[7].visible = true;
      this.donut.children[8].visible = false;
      this.donut.children[9].visible = false;
    }
    else if(logo==2){
      this.donut.children[7].visible = false;
      this.donut.children[8].visible = true;
      this.donut.children[9].visible = false;
    }
    else if(logo==3){
      this.donut.children[7].visible = false;
      this.donut.children[8].visible = false;
      this.donut.children[9].visible = true;
    }
  }

  run() {
    this.render();
  }

  render() {
    requestAnimationFrame(this.run.bind(this));
    this.renderer.render(this.scene, this.camera);

    //rotate donut transition
    if(this.donut){
      this.donut.rotation.y += 0.005;
    }

  }

  onResize() {
    this.CANVAS_WIDTH = document.querySelector(".configurator__scene").clientWidth;
    this.CANVAS_HEIGHT = document.querySelector(".configurator__scene").clientHeight;
    this.camera.aspect = this.CANVAS_WIDTH / this.CANVAS_HEIGHT;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.CANVAS_WIDTH , this.CANVAS_HEIGHT);
  }

    lights() {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      this.scene.add(ambientLight);

      //add point light
      this.pointLight = new THREE.PointLight(0xffffff, 0.8);
      this.pointLight.position.set(0, 2, 0);
      this.scene.add(this.pointLight);
    }

  helpers() {
    // this.scene.add(new THREE.GridHelper(10, 10));
    // this.scene.add(new THREE.AxesHelper(5));
    // this.spotLightHelper = new THREE.SpotLightHelper(this.spotLight);
    // this.scene.add(this.spotLightHelper);
    // this.pointLightHelper = new THREE.PointLightHelper(this.pointLight);
    // this.scene.add(this.pointLightHelper);
  }
}

export default Scene;
