import * as THREE from 'three';
import EarthTextureMap from '../textures/8k_earth_daymap.jpg';
import EarthNormalMap from '../textures/8k_earth_normal_map.tif';
import EarthSpecularMap from '../textures/8k_earth_specular_map.tif';

export default () => {
  const earthNormalMap = new THREE.TextureLoader().load(EarthNormalMap);
  const earthTextureMap = new THREE.TextureLoader().load(EarthTextureMap);
  const earthSpecularMap = new THREE.TextureLoader().load(EarthSpecularMap);

  earthTextureMap.normalMap = earthNormalMap;
  earthTextureMap.specularMap = earthSpecularMap;
  earthTextureMap.wrapS = THREE.RepeatWrapping;
  earthTextureMap.wrapT = THREE.RepeatWrapping;
  earthTextureMap.anisotropy = 16;

  const material = new THREE.MeshPhongMaterial({ map: earthTextureMap, side: THREE.FrontSide });
  material.shininess = 3;

  const sphereGeometry = new THREE.SphereGeometry(0.25, 64, 32);
  const earth = new THREE.Mesh(sphereGeometry, material);
  earth.rotation.x = 23.5 * (Math.PI / 180);

  // Create an Object3D here to take advantage of Euler angles, since Earth
  // is already rotated 23.5 degrees into position.
  // I'll also eventually add the moon relative to the Earth here.
  const earthObj = new THREE.Object3D();
  earthObj.position.x += 5;
  earthObj.add(earth);

  return earthObj;
};
