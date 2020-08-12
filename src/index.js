import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import uvGrid from './textures/uv_grid_opengl.jpg';

function main() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  // Max out ambient light for now, eventually the sun will have full ambient light with a light source at the center
  // to create shadows
  const ambientLight = new THREE.AmbientLight(0xCCCCCC, 1);
  scene.add(ambientLight);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const controls = new OrbitControls(camera, renderer.domElement);

  const map = new THREE.TextureLoader().load(uvGrid);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = 16;

  const material = new THREE.MeshPhongMaterial({ map, side: THREE.DoubleSide });

  let sphereGeometry = new THREE.SphereGeometry(1, 64, 32);
  let sphere = new THREE.Mesh(sphereGeometry, material);

  scene.add(sphere);

  sphereGeometry = new THREE.SphereGeometry(1, 64, 32);
  sphere = new THREE.Mesh(sphereGeometry, material);
  sphere.position.x += 5;

  scene.add(sphere);

  const size = 10;
  const divisions = 10;

  const gridHelper = new THREE.GridHelper(size, divisions);
  scene.add(gridHelper);

  camera.position.copy(sphere.position);
  camera.position.y = 5;
  controls.update();

  let angle = 0;

  const animate = () => {
    requestAnimationFrame(animate);

    controls.update();

    sphere.position.x = 5 * Math.cos(angle * (Math.PI / 180));
    sphere.position.z = 5 * Math.sin(angle * (Math.PI / 180));

    // controls.target.copy(sphere.position);
    angle += 1;

    renderer.render(scene, camera);
  };

  animate(angle);

  return renderer.domElement;
}

document.body.appendChild(main());
