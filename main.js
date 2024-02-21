import "./style.css"
import gsap from 'gsap';
import * as THREE from 'three';
import * as dat from "dat.gui"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const canvas = document.querySelector('canvas.webgl');
const image = new Image();




// colorTexture.center.y = .5
/*  */
const textureleLoader = new THREE.TextureLoader();
const doorColorTexture = textureleLoader.load("./door/color.jpg");
const doorAphaColorTexture = textureleLoader.load("./door/alpha.jpg");
const doorDmbientOcclusionTexture = textureleLoader.load("./door/ambientOcclusion.jpg");
const doorHeightTexture = textureleLoader.load("./door/height.jpg");
const doorNormalTexture = textureleLoader.load("./door/normal.jpg");
const doorMetalessTexture = textureleLoader.load("./door/metalness.jpg");
const doorRoughnessTexture = textureleLoader.load("./door/roughness.jpg");
const matCapTexture = textureleLoader.load("./matcaps/1.png")
const gradientsTexture = textureleLoader.load("./gradients/3.jpg")
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

const material = new THREE.MeshBasicMaterial({ /* color: 0xff0000 */
    map: doorColorTexture
});
// material.color.set('pink')
material.alphaMap = doorAphaColorTexture
// material.side = THREE.DoubleSide
// material.color = new THREE.Color("orange")
// material.color = new THREE.Color("green")
// material.opacity = .5;
material.transparent = true
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(.5, 16, 16),
    material
)
sphere.position.x = -1.5
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    material
);
// plane.position.x = 1
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(.3, .2, 16, 32),
    material
)
torus.position.x = 1.5
scene.add(sphere, plane, torus);



const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, .01, 1000);
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
const clock = new THREE.Clock();
const tick = () => {
    const elapseTime = clock.getElapsedTime();
    sphere.rotation.y = .1 * elapseTime
    plane.rotation.y = .1 * elapseTime
    torus.rotation.y = .1 * elapseTime
    sphere.rotation.x = .15 * elapseTime
    plane.rotation.x = .15 * elapseTime
    torus.rotation.x = .15 * elapseTime
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick)
};

tick();
