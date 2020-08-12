import * as THREE from 'three';
import dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import CreateEarth from './planets/earth';
import CreateSun from './planets/sun';
import CreateSky from './sky/sky';

let setupGUI;
let gridChanged = true;

const effectController = {
  targetEarth: false,
  targetSun: true,
  grid: true,
  earthOrbit: true,
  earthRotate: true,
  sunRotate: true,
  earthSpeed: 0.005,
};

// createSolarSystem
function createSolarSystem() {
  const earth = CreateEarth();
  const sun = CreateSun();

  return { sun, earth };
}

function main() {
  const scene = new THREE.Scene();
  const far = 2000;
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, far);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const controls = new OrbitControls(camera, renderer.domElement);

  // Max out ambient light for now, eventually the sun will have full ambient light
  // with a light source at the center to create shadows
  const ambientLight = new THREE.AmbientLight(0xCCCCCC, 0.25);
  scene.add(ambientLight);

  // Add milky way background
  const sky = CreateSky(far);
  scene.add(sky);

  const solarSystem = createSolarSystem();
  scene.add(solarSystem.sun);
  scene.add(solarSystem.earth);

  const size = 10;
  const divisions = 10;

  const gridHelper = new THREE.GridHelper(size, divisions);

  // camera.position
  camera.position.y = 5;
  camera.position.z = 5;

  let angle = 0;

  const animate = () => {
    requestAnimationFrame(animate);

    controls.update();

    if (effectController.earthOrbit) {
      solarSystem.earth.position.x = 5 * Math.cos(angle * (Math.PI / 180));
      solarSystem.earth.position.z = 5 * Math.sin(angle * (Math.PI / 180));
    }

    if (effectController.earthRotate) {
      // In one full rotation, earth will rotate 365 times
      solarSystem.earth.rotation.y = 365 * angle * (Math.PI / 180);
    }

    if (effectController.sunRotate) {
      // The sun rotates every 27 days, e.g. 13.5 times in a full Earth orbit
      solarSystem.sun.rotation.y = 13.5 * angle * (Math.PI / 180);
    }

    angle += effectController.earthSpeed;

    if (effectController.targetSun) {
      controls.target.copy(solarSystem.sun.position);
    } else if (effectController.targetEarth) {
      controls.target.copy(solarSystem.earth.position);
    }

    if (gridChanged) {
      gridChanged = false;
      if (effectController.grid) {
        scene.add(gridHelper);
      } else {
        scene.remove(gridHelper);
      }
    }

    renderer.render(scene, camera);
  };

  setupGUI();
  animate(angle);

  return renderer.domElement;
}

setupGUI = () => {
  const gui = new dat.GUI();
  gui.add(effectController, 'grid').name('Show XZ Grid').onChange(() => {
    gridChanged = true;
  });

  gui.add(effectController, 'earthSpeed', 0.001, 0.1, 0.001).name('Earth Speed');
  gui.add(effectController, 'earthOrbit').name('Earth Orbiting');
  gui.add(effectController, 'earthRotate').name('Earth Rotating');
  gui.add(effectController, 'sunRotate').name('Sun Rotating');
  const targetEarthController = gui.add(effectController, 'targetEarth').name('Focus Earth');
  const targetSunController = gui.add(effectController, 'targetSun').name('Focus Sun');

  targetEarthController.onChange((val) => {
    if (val) {
      targetSunController.setValue(false);
    }
  });

  targetSunController.onChange((val) => {
    if (val) {
      targetEarthController.setValue(false);
    }
  });
};

document.body.appendChild(main());
