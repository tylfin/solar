import * as THREE from 'three';
import EarthTextureMap from '../textures/earthmap4k.jpg';
import EarthBumpMap from '../textures/earthbump4k.jpg';
import EarthSpecularMap from '../textures/earthspec4k.jpg';
import EarthCloudTransMap from '../textures/earthcloudmaptrans.jpg';

const earthRadius = 0.25;

export default () => {
  const earthBumpMap = new THREE.TextureLoader().load(EarthBumpMap);
  const earthTextureMap = new THREE.TextureLoader().load(EarthTextureMap);
  const earthSpecularMap = new THREE.TextureLoader().load(EarthSpecularMap);

  earthTextureMap.bumpMap = earthBumpMap;
  earthTextureMap.specularMap = earthSpecularMap;
  earthTextureMap.wrapS = THREE.RepeatWrapping;
  earthTextureMap.wrapT = THREE.RepeatWrapping;

  const material = new THREE.MeshPhongMaterial({ map: earthTextureMap, side: THREE.FrontSide });
  material.shininess = 3;

  const sphereGeometry = new THREE.SphereGeometry(earthRadius, 64, 32);
  const earth = new THREE.Mesh(sphereGeometry, material);
  earth.rotation.x = 23.5 * (Math.PI / 180);
  // earth.position.x += 5;

  const earthCloudTransMap = new THREE.TextureLoader().load(EarthCloudTransMap);

  const cloudsMaterial = new THREE.MeshPhongMaterial({
    side: THREE.FrontSide,
    alphaMap: earthCloudTransMap,
    opacity: 0.60,
    transparent: true,
    shininess: 0,
    reflectivity: 0,
  });

  const cloudsGeometry = new THREE.SphereGeometry(earthRadius * 1.01, 64, 32);
  const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);

  clouds.name = 'clouds';

  // Create an Object3D here to take advantage of Euler angles, since Earth
  // is already rotated 23.5 degrees into position.
  // I'll also eventually add the moon relative to the Earth here.
  const earthObj = new THREE.Object3D();
  earthObj.position.x += 5;
  earthObj.add(earth);
  earthObj.add(clouds);

  return earthObj;
};
