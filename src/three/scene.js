import * as THREE from 'three'
// 1创建场景
const scene = new THREE.Scene()

// 场景天空盒子
const textureLoader = new THREE.CubeTextureLoader().setPath('./textures/')
const textureCube = textureLoader.load([
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg',
    '6.jpg',
])
scene.background = textureCube
scene.environment = textureCube
export default scene