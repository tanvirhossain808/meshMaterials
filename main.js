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

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
    console.log('onStart')
}
loadingManager.onLoad = () => {
    console.log('onLoaded')
}
loadingManager.onProgress = () => {
    console.log('onProgress')
}
loadingManager.onError = () => {
    console.log('onError')
}
const textureleLoader = new THREE.TextureLoader(loadingManager);
// const colorTexture = textureleLoader.load("./static/images/color.jpg",
//     () => { console.log('load') },
//     () => { console.lqg("progress") },
//     () => { console.log("error") },
// )
// const colorTexture = textureleLoader.load("./static/images/color.jpg");
const colorTexture = textureleLoader.load("./static/images/checkerboard-8x8.png");
// const colorTexture = textureleLoader.load("./static/images/minecraft.png");
// const colorTexture = textureleLoader.load("./static/images/checkerboard-1024x1024.png");
const alphaTexture = textureleLoader.load("./static/images/alpha.jpg");
const heightTexture = textureleLoader.load("./static/images/height.jpg");
const normalTexture = textureleLoader.load("./static/images/normal.jpg");
const ambientOcclusionTexture = textureleLoader.load("./static/images/ambientOcclusion.jpg");
const metalnessTexture = textureleLoader.load("./static/images/metalness.jpg");
const roughnessTexture = textureleLoader.load("./static/images/roughness.jpg");
// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping
// colorTexture.offset.x = 0.5
// colorTexture.offset.y = .5
// colorTexture.rotation = Math.PI * .25;
/* moving the rotaion point to the center */
// colorTexture.center.x = .5;
// colorTexture.center.y = .5
colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter
/*  */
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
        map: colorTexture
        // wireframe: true
    })
);

scene.add(mesh);



const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, .1, 1000);
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
