import * as THREE from 'three'
import camera from '../camera';

export default class AlarmSprite {
    constructor(type = "火警", position = { x: -1.8, z: 3 }, color = 0xffffff) {
        const textureLoader = new THREE.TextureLoader()
        const typeObject = {
            火警: './textures/tag/fire.png',
            治安: './textures/tag/jingcha.png',
            电力: './textures/tag/e.png',
        }

        const map = textureLoader.load(typeObject[type]);
        this.material = new THREE.SpriteMaterial({
            map: map,
            color: color,
            // blending: THREE.AdditiveBlending,
            transparent: true,
            depthTest: true
        });
        this.mesh = new THREE.Sprite(this.material);
        this.mesh.position.set(position.x, 3.5, position.z);
        this.fns = []

        // 创建射线
        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()
        // 事件监听
        window.addEventListener('click', (event) => {
            // *2 - 1的目的是为了得到-1到1的值，Y取反是因为在浏览器的client中左上角是0.0
            // 但是在3D模型中左下角到右上角是0,0 - 1,1
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
            this.mouse.y = -((event.clientY / window.innerHeight) * 2 - 1)

            this.raycaster.setFromCamera(this.mouse, camera)

            event.mesh = this.mesh
            event.alarm = this
            const intersects = this.raycaster.intersectObject(this.mesh)
            if (intersects.length > 0) {
                this.fns.forEach((fn) => {
                    fn(event)
                })
            }

        })
    }
    onClick(fn) {
        this.fns.push(fn)
    }
    remove() {
        this.mesh.remove()
        this.mesh.removeFromParent()
        this.mesh.geometry.dispose()
        this.mesh.material.dispose()
    }
}