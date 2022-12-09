import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

class Scene {
  constructor() {
    //log the size of .configurator__scene
  
    this.CANVAS_WIDTH = document.querySelector(".configurator__scene").clientWidth;
    this.CANVAS_HEIGHT = document.querySelector(".configurator__scene").clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.CANVAS_WIDTH / this.CANVAS_HEIGHT,
      0.1,
      1000
    );
    


    this.camera.position.set(0, 0, 3);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector(".webgl"),
      antialias: true,
      alpha: true,
    });



    this.renderer.setSize(this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

   

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
            this.scene.add(gltf.scene);
            }
        );
  }
  addEvents() {
    requestAnimationFrame(this.run.bind(this));
    window.addEventListener("resize", this.onResize.bind(this), false);
  }
 
   
  run() {
    this.render();
  }

  render() {
    requestAnimationFrame(this.run.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    this.camera.aspect = this.CANVAS_WIDTH / this.CANVAS_HEIGHT;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.CANVAS_WIDTH , this.CANVAS_HEIGHT);
  }

    lights() {
    
      

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      this.scene.add(ambientLight);


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
