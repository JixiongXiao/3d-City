import * as THREE from 'three'
export default class MeshLine {
    constructor(geometry) {
        this.material = new THREE.LineBasicMaterial({ color: 0xffffff })
        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(
            edges,
            this.material
        );
        this.mesh = line
        this.geometry = edges
    }
}