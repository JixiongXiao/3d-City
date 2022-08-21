varying vec3 vPosition;
varying vec2 vUv;



void main() {
    vec4 viewPosition = viewMatrix * modelMatrix * vec4(position,1.0);
    vPosition = position;
    vUv = uv;
    gl_Position = projectionMatrix * viewPosition;

}