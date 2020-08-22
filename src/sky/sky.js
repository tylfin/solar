import * as THREE from 'three';
import MilkyWayTexture from '../textures/8k_stars_milky_way.jpg';

export default (far) => {
  const milkyWayTexture = new THREE.TextureLoader().load(MilkyWayTexture);
  const material = new THREE.MeshBasicMaterial({ map: milkyWayTexture, side: THREE.BackSide });

  // We never want the skybox to appear invisible, so the radius is 1/2 the camera's far distance
  const skyGeo = new THREE.SphereGeometry(far / 2, 32, 15);

  const sky = new THREE.Mesh(skyGeo, material);
  return sky;
};
