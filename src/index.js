import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function component() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  const controls = new OrbitControls(camera, renderer.domElement);

  let sphereGeometry = new THREE.SphereGeometry(1, 64, 32);
  let sphere = new THREE.Mesh(sphereGeometry, new THREE.MeshBasicMaterial({ color: 0xFFFF00 }));

  scene.add(sphere);

  sphereGeometry = new THREE.SphereGeometry(1, 64, 32);
  sphere = new THREE.Mesh(sphereGeometry, new THREE.MeshBasicMaterial({ color: 0x00FFFF }));
  sphere.position.x += 5;

  scene.add(sphere);

  const size = 10;
  const divisions = 10;

  const gridHelper = new THREE.GridHelper(size, divisions);
  scene.add(gridHelper);

  camera.position.z = 5;
  camera.position.y = 5;
  controls.update();

  let angle = 0;

  const animate = () => {
    requestAnimationFrame(animate);

    controls.update();
    sphere.position.x = 5 * Math.cos(angle * (Math.PI / 180));
    sphere.position.z = 5 * Math.sin(angle * (Math.PI / 180));

    angle += 1;

    renderer.render(scene, camera);
  };

  animate(angle);

  return renderer.domElement;
}

document.body.appendChild(component());
