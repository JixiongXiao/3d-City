import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import camera from './camera'
import renderer from './renderer';

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼,必须在动画循环里调用update
controls.enableDamping = true

export default controls