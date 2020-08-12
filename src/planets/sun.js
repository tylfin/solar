import * as THREE from 'three';
import SunTextureMap from '../textures/8k_sun.jpg';

export default () => {
  const sunObj = new THREE.Object3D();
  const sunTextureMap = new THREE.TextureLoader().load(SunTextureMap);

  sunTextureMap.wrapS = THREE.RepeatWrapping;
  sunTextureMap.wrapT = THREE.RepeatWrapping;
  sunTextureMap.anisotropy = 16;

  const material = new THREE.MeshBasicMaterial({
    map: sunTextureMap,
    side: THREE.FrontSide,
  });

  const sphereGeometry = new THREE.SphereGeometry(1, 64, 32);
  const sun = new THREE.Mesh(sphereGeometry, material);
  sunObj.add(sun);

  const sunLight = new THREE.PointLight(0xFFFFFF, 1.75, 100);
  sunLight.position.copy(sun.position);
  sunObj.add(sunLight);

  return sunObj;
};
