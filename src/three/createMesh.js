// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoaders.js'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoaders.js'
import * as THREE from 'three'
import scene from './scene'
import createCity from './mesh/City';


export default function createMesh() {
    createCity()
}