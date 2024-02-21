import "./style.css"
import gsap from 'gsap';
import * as THREE from 'three';
import * as dat from "dat.gui"
// import imgcolor from "./static/color.jpg"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const canvas = document.querySelector('canvas.webgl');
const image = new Image();


/*
//behind the scence of the texture loader
const texture = new THREE.Texture(image);
image.onload = () => {
    console.log('hey');
    texture.needsUpdate = true
}
console.log(texture);
image.src = "./static/images/color.jpg" */


const textureleLoader = new THREE.TextureLoader();
const texture = textureleLoader.load("./static/images/color.jpg")
console.log(image);
const Configuracion = function () {
    this.color = "#ff0000",
        this.spin = () => {
            gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10 })
        }
}
const conf = new Configuracion();
// console.log(conf);




const scene = new THREE.Scene();
/* Cursor */
const cursor = {
    x: 0,
    y: 0
};
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight

};
window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height)
})


const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 2, 1, 1),

    new THREE.MeshBasicMaterial({
        // color: conf.color,
        map: texture
        // wireframe: true
    })
);

scene.add(mesh);



const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000);
camera.position.x = .1,
    camera.position.z = 2,

    scene.add(camera);
/* orbit */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true


/*  */

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen();
    }
    else {
        console.log('object');
        document.exitFullscreen()
    };
})




renderer.setSize(sizes.width, sizes.height);

const tick = () => {


    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick)
};

tick();
