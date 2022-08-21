import * as THREE from 'three'

// 初始化渲染器
const renderer = new THREE.WebGLRenderer(
    { antialias: true }
);
const dom = renderer.domElement
// 设置渲染尺寸的大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 开启阴影贴图
renderer.shadowMap.enabled = true

export default renderer