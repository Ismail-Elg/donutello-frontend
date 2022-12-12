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
    this.colorStep2 = null;

    this.configuration = {
     donut: {
      dough: 1,
      glaze: 2,
      pattern: {
        type: 1,
        color: 0,
      },
      topping: {
        type: 0,
        color: 0,
      },
      logo:{
        type: 1,
        img: null,
      },
      user:{
        name: null,
        email: null,
        phone: null,
        message: null,
      }
     }
    }

 

  }

  init() {
    this.addEvents();
    this.helpers();
    this.load();
    this.lights();
  }

  load() {
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
    const doughChoice = document.querySelectorAll(".configurator__editor__choices__pick");
    const colorChoice = document.querySelectorAll(".configurator__editor__choices__color__pick");
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

    colorChoice.forEach((choice) => {
      choice.addEventListener("click", (e) => {
        colorChoice.forEach((choice) => {
          choice.classList.remove("configurator__editor__choices__color__pick-active");
        });
        e.target.classList.add("configurator__editor__choices__color__pick-active");
        const colorPattern = e.target.dataset.colorpattern;
        this.changeColorPattern(colorPattern);

        const colorTopping = e.target.dataset.colortopping;
        this.changeColorTopping(colorTopping);



      });
    });


    let progress = 0;
    const button = document.querySelector(".configurator__editor__next__button");
    button.addEventListener("click", (e) => {
      this.colorStep2 = document.querySelectorAll(".configurator__editor__choices__color[data-colorstep='2']");

      this.colorStep2.forEach((color) => {
        color.style.display = "none";
      });

      console.log(this.configuration);

      if (progress == 0) {
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
      else if (progress == 1) {
        this.donut.children[1].visible = false;

        this.donut.children[3].visible = false;
        this.donut.children[4].visible = false;
        this.donut.children[5].visible = true;
        this.donut.children[6].visible = false;
        progress = 2;
      }
      else if (progress == 2) {

        this.donut.children[4].visible = false;

        this.donut.children[6].visible = false;
        progress = 3;
      }
      else if (progress == 3) {
        this.donut.children[7].visible = true;

        progress = 4;
      }
      else if (progress == 4) {
        //log the configuration
        console.log(this.configuration);

        this.configuration.donut.logo.img = "test";
        this.configuration.donut.user.name = "John Doe";
        this.configuration.donut.user.email = "john@test.com";
        this.configuration.donut.user.phone = "123456789";
        this.configuration.donut.user.message = "test";

        console.log(JSON.stringify(this.configuration));
        fetch("https://salmon-puffer-tie.cyclic.app/api/v1/donuts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.configuration),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
          }
          );
     

      }
    });

    document.getElementById('file').addEventListener('change', (e) => {

      let file = e.target.files[0];


      if (file.type == "image/png" || file.type == "image/jpeg") {

        const logoMaterial = new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load(URL.createObjectURL(file)),
          color: 0xFFFFFF,
        });
        this.donut.children[7].material = logoMaterial;
        this.donut.children[8].material = logoMaterial;
        this.donut.children[9].material = logoMaterial;

      }
    });
  }

  changeDough(dough) {

    if (dough == 0) {
      this.donut.children[1].children[2].visible = false;
      this.donut.children[1].children[0].visible = false;
     this.configuration.donut.dough = 0;
    }
    else if (dough == 1) {
      this.donut.children[1].children[2].visible = true;
      this.donut.children[1].children[0].visible = true;
      this.donut.children[1].children[2].material.color.setHex(0x3C2317);
      this.donut.children[1].children[0].material.color.setHex(0x3C2317);
      this.configuration.donut.dough = 1;
    }
    else if (dough == 2) {
      this.donut.children[1].children[2].visible = true;
      this.donut.children[1].children[0].visible = true;
      this.donut.children[1].children[2].material.color.setHex(0xFF577F);
      this.donut.children[1].children[0].material.color.setHex(0xFF577F);
      this.configuration.donut.dough = 2;
    }
    else if (dough == 3) {
      this.donut.children[1].children[2].visible = true;
      this.donut.children[1].children[0].visible = true;
      this.donut.children[1].children[2].material.color.setHex(0x8CE0C8);
      this.donut.children[1].children[0].material.color.setHex(0x8CE0C8);
      this.configuration.donut.dough = 3;
    }
    else if (dough == 4) {
      this.donut.children[1].children[2].visible = true;
      this.donut.children[1].children[0].visible = true;
      this.donut.children[1].children[2].material.color.setHex(0xF23F00);
      this.donut.children[1].children[0].material.color.setHex(0xF23F00);
      this.configuration.donut.dough = 4;
    }

  }

  changeGlaze(glaze) {
    if (glaze == 0) {
      this.donut.children[2].visible = false;
      this.configuration.donut.glaze = 0;
    }
    else if (glaze == 1) {
      this.donut.children[2].visible = true;
      this.donut.children[2].material.color.setHex(0x3C2317);
      this.configuration.donut.glaze = 1;
    }
    else if (glaze == 2) {
      this.donut.children[2].visible = true;
      this.donut.children[2].material.color.setHex(0xFF577F);
      this.configuration.donut.glaze = 2;
    }
    else if (glaze == 3) {
      this.donut.children[2].visible = true;
      this.donut.children[2].material.color.setHex(0x8CE0C8);
      this.configuration.donut.glaze = 3;
    }
    else if (glaze == 4) {
      this.donut.children[2].visible = true;
      this.donut.children[2].material.color.setHex(0xF23F00);
      this.configuration.donut.glaze = 4;
    }
  }

  changePattern(pattern) {
    if (pattern == 0) {
      this.donut.children[5].visible = false;
      this.configuration.donut.pattern.type = 0;
    }
    else if (pattern == 1) {
      this.donut.children[5].visible = true;
      this.donut.children[5].material.color.setHex(0x3C2317);
      this.configuration.donut.pattern.type = 1;
      this.configuration.donut.pattern.color = 0;
    }
  }

  changeTopping(topping) {
    if (topping == 0) {
      this.donut.children[3].visible = false;
      this.donut.children[4].visible = false;
      this.donut.children[6].visible = false;
      this.colorStep2.forEach((color) => {
        color.style.display = "none";
      });
      this.configuration.donut.topping.type = 0;
    }
    else if (topping == 1) {
      this.donut.children[3].visible = true;
      this.donut.children[4].visible = false;
      this.donut.children[6].visible = false;
      this.colorStep2.forEach((color) => {
        color.style.display = "none";
      });
      this.configuration.donut.topping.type = 1;
    }
    else if (topping == 2) {
      this.donut.children[3].visible = false;
      this.donut.children[4].visible = true;
      this.donut.children[6].visible = false;
      this.colorStep2.forEach((color) => {
        color.style.display = "flex";
      });
      this.configuration.donut.topping.type = 2;
    }
    else if (topping == 3) {
      this.donut.children[3].visible = false;
      this.donut.children[4].visible = false;
      this.donut.children[6].visible = true;
      this.colorStep2.forEach((color) => {
        color.style.display = "none";
      });
      this.configuration.donut.topping.type = 3;
    }
  }

  changeLogo(logo) {
    if (logo == 0) {
      this.donut.children[7].visible = false;
      this.donut.children[8].visible = false;
      this.donut.children[9].visible = false;
      this.configuration.donut.logo.type = 0;
    }
    else if (logo == 1) {
      this.donut.children[7].visible = true;
      this.donut.children[8].visible = false;
      this.donut.children[9].visible = false;
      this.configuration.donut.logo.type = 1;
    }
    else if (logo == 2) {
      this.donut.children[7].visible = false;
      this.donut.children[8].visible = true;
      this.donut.children[9].visible = false;
      this.configuration.donut.logo.type = 2;
    }
    else if (logo == 3) {
      this.donut.children[7].visible = false;
      this.donut.children[8].visible = false;
      this.donut.children[9].visible = true;
      this.configuration.donut.logo.type = 3;
    }
  }

  changeColorPattern(color) {
    if (color == 0) {
      this.donut.children[5].material.color.setHex(0x3C2317);
      this.configuration.donut.pattern.color = 0;
    }
    else if (color == 1) {
      this.donut.children[5].material.color.setHex(0xFF577F);
      this.configuration.donut.pattern.color = 1;
    }
    else if (color == 2) {
      this.donut.children[5].material.color.setHex(0x3C2317);
      this.configuration.donut.pattern.color = 2;
    }
    else if (color == 3) {
      this.donut.children[5].material.color.setHex(0xFF577F);
      this.configuration.donut.pattern.color = 3;
    }
    else if (color == 4) {
      this.donut.children[5].material.color.setHex(0x3C2317);
      this.configuration.donut.pattern.color = 4;
    }
    else if (color == 5) {
      this.donut.children[5].material.color.setHex(0xFF577F);
      this.configuration.donut.pattern.color = 5;
    }
    else if (color == 6) {
      this.donut.children[5].material.color.setHex(0x3C2317);
      this.configuration.donut.pattern.color = 6;
    }
  }

  changeColorTopping(color) {
    if (color == 0) {
      this.donut.children[4].material.color.setHex(0x3C2317);
      this.configuration.donut.topping.color = 0;
    }
    else if (color == 1) {
      this.donut.children[4].material.color.setHex(0xFF577F);
      this.configuration.donut.topping.color = 1;
    }
    else if (color == 2) {
      this.donut.children[4].material.color.setHex(0x3C2317);
      this.configuration.donut.topping.color = 2;
    }
    else if (color == 3) {
      this.donut.children[4].material.color.setHex(0xFF577F);
      this.configuration.donut.topping.color = 3;
    }
    else if (color == 4) {
      this.donut.children[4].material.color.setHex(0x3C2317);
      this.configuration.donut.topping.color = 4;
    }
    else if (color == 5) {
      this.donut.children[4].material.color.setHex(0xFF577F);
      this.configuration.donut.topping.color = 5;
    }
    else if (color == 6) {
      this.donut.children[4].material.color.setHex(0x3C2317);
      this.configuration.donut.topping.color = 6;
    }
  }


  run() {
    this.render();
  }

  render() {
    requestAnimationFrame(this.run.bind(this));
    this.renderer.render(this.scene, this.camera);

    //rotate donut transition
    if (this.donut) {
      this.donut.rotation.y += 0.005;
    }

  }

  onResize() {
    this.CANVAS_WIDTH = document.querySelector(".configurator__scene").clientWidth;
    this.CANVAS_HEIGHT = document.querySelector(".configurator__scene").clientHeight;
    this.camera.aspect = this.CANVAS_WIDTH / this.CANVAS_HEIGHT;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
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
