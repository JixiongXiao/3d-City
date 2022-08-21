<template>
  <div class="scene" ref="sceneDiv"></div>
</template>

<script setup>
import { onMounted,ref, watch } from 'vue'
import * as THREE from 'three'
import gsap from 'gsap'
// 导入场景/初始化场景
import scene from '@/three/scene'
// 导入相机
import camera from '@/three/camera'
// 导入渲染器
import renderer from '@/three/renderer'
// 导入坐标辅助器
import axesHelper from '@/three/axesHelper'
// 导入轨道控制器
import controls from '@/three/controls'
// 导入初始化配置文件
import '@/three/init'
// 导入动画函数
import animate from '@/three/animate'
// 导入添加物体函数
import createMesh from '@/three/createMesh'
// 导入gui
import gui from '@/three/gui'
// 导入警告
import AlarmSprite from '@/three/mesh/AlarmSprite'
import LightWall from '@/three/mesh/LightWall'
import FlyLineShader from '@/three/mesh/FlyLineShader'
import LightRadar from '@/three/mesh/LightRadar'
import eventHub from '@/utils/eventHub'

const props = defineProps(['eventList','dataInfo'])



// 场景元素声明
let sceneDiv = ref(null)



scene.add(camera)
scene.add(axesHelper);
createMesh()

onMounted(()=>{
    sceneDiv.value.appendChild(renderer.domElement)
    animate()
})


const eventLishMesh = []
// 光墙
let mapFn = {
  火警:(position,index) =>{
    // 添加光墙
    const lightWall = new LightWall(1,2,position)
    lightWall.eventListIndex = index
    scene.add(lightWall.mesh)
    eventLishMesh.push(lightWall)
  },
  治安:(position,index)=>{
    // 生成随机颜色
    const color = new THREE.Color(
      Math.random(),
      Math.random(),
      Math.random()
    ).getHex()
    const flyLineShader = new FlyLineShader(position,color)
    flyLineShader.eventListIndex = index
    scene.add(flyLineShader.mesh)
    eventLishMesh.push(flyLineShader)
  },
  电力:(position,index)=>{
        // 生成随机颜色
    const color = new THREE.Color(
      Math.random(),
      Math.random(),
      Math.random()
    ).getHex()
    const lightRadar = new LightRadar(position,color)
    lightRadar.eventListIndex = index
    scene.add(lightRadar.mesh)
    eventLishMesh.push(lightRadar)
  }
}

eventHub.on(
  'eventToggle', 
  (i) =>{
    eventLishMesh.forEach((ev)=>{
      if(ev.eventListIndex === i && ev.mesh.type === 'Sprite') {
      gsap.to(ev.mesh.position,{
      duration:0.5,
      y:4,
      repeat:5,
      yoyo:true
    })
      } 
    })
    const position = {
      x:props.eventList[i].position.x / 5 - 10,
      y:0,
      z:props.eventList[i].position.z / 5 - 10,
    }
    // gsap.to(controls.target,{
    //   duration:1,
    //   x:position.x,
    //   y:position.y,
    //   z:position.z
    // })

  }
)

watch(
  props.eventList,
  (val) =>{
    eventLishMesh.forEach((item)=>{
      item.remove()
    })
    props.eventList.forEach((item,index)=>{
      const alarmSprite = new AlarmSprite(item.name,item.position)
      alarmSprite.onClick(()=>{
        eventHub.emit('spriteClick',{event:item, i:index})
      })
      alarmSprite.eventListIndex = index
      eventLishMesh.push(alarmSprite)
      scene.add(alarmSprite.mesh)
      if(mapFn[item.name]) {
        mapFn[item.name](item.position,index)
      }
    })
  }
)
</script>

<style>
.scene{
    width:100vw;
    height:100vh;
    position:fixed;
    z-index:100;
    left:0;
    top:0;
}

</style>