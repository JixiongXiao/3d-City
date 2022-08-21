import * as THREE from 'three'
import gsap from 'gsap'
import vertex from '@/shader/lightRadar/vertex.glsl'
import fragment from '@/shader/lightRadar/fragment.glsl'
export default class LightWall {
    constructor(position = { x: 0, z: 0 }, color = 0xff0000) {
        this.geometry = new THREE.PlaneBufferGeometry(2, 2)
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uColor: {
                    value: new THREE.Color(0xff0000)
                },
                uTime: {
                    value: 0
                }
            },
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
            side: THREE.DoubleSide
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.set(position.x, 2, position.z)
        this.mesh.rotation.x = - Math.PI / 2

        // 设置动画
        gsap.to(this.material.uniforms.uTime, {
            value: 1,
            duration: 1.3,
            repeat: -1,
            ease: 'none'
        })
    }
    remove() {
        this.mesh.remove()
        this.mesh.removeFromParent()
        this.mesh.geometry.dispose()
        this.mesh.material.dispose()
    }
}