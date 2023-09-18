import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { Water } from 'three/examples/jsm/objects/Water2.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'
import {OutlinePass} from 'three/examples/jsm/postprocessing/OutlinePass.js'
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js'
import {OutputPass} from 'three/examples/jsm/postprocessing/OutputPass.js'
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass.js'
import {ClearPass} from 'three/examples/jsm/postprocessing/ClearPass.js'

// import 

import * as dat from 'lil-gui'
// const gui = new dat.GUI()

THREE.ColorManagement.enabled = false

const textureLoader = new THREE.TextureLoader()
const fontLoader = new FontLoader()
const maleDuckOBJLoader = new OBJLoader();
const wheetOBJLoader = new OBJLoader();
const treeOBJLoader = new OBJLoader();
const rockOBJLoader = new OBJLoader();
const hillOBJLoader = new OBJLoader();
const hillMTLLoader = new MTLLoader();
const wheet2OBJLoader = new OBJLoader();
const pondOBJLoader = new OBJLoader();
const maleDuckHoverOBJLoader = new OBJLoader();
const maleDuckHoverMTLLoader = new MTLLoader();

const maleDuckMTLLoader = new MTLLoader();
const wheetMTLLoader = new MTLLoader();
const wheet2MTLLoader = new MTLLoader();
const femaleDuckOBJLoader = new OBJLoader();
const bg = textureLoader.load('gradient.jpeg')
const femaleDuckHoverOBJLoader = new OBJLoader();
const femaleDuckHoverMTLLoader = new MTLLoader();

const femaleDuckMTLLoader = new MTLLoader();


let water, sun, raycaster;

var duck1 = new THREE.Group()
var duck2 = new THREE.Group()
var duck3 = new THREE.Group()
var hoverduck1 = new THREE.Group()
var hoverduck2 = new THREE.Group()
var hoverduck3 = new THREE.Group()
var pond = new THREE.Group()
var tree = new THREE.Group()
var rock = new THREE.Group()
var rock2 = new THREE.Group()
var rock3 = new THREE.Group()
var rock4 = new THREE.Group()
var rock5 = new THREE.Group()
var rock6 = new THREE.Group()
var tree2 = new THREE.Group()
var tree3 = new THREE.Group()
var tree4 = new THREE.Group()
var wheet = new THREE.Group()
var hill = new THREE.Group()
var hill2 = new THREE.Group()
var wheet2 = new THREE.Group()

// const lightParticlesArray = [];
// const lightParticleGroup = new THREE.Group()

const scene = new THREE.Scene()

// let selectedObjects = [];

const pointer = new THREE.Vector2();

sun = new THREE.Vector3();

fontLoader.load(
  '/fonts/helvetiker_regular.typeface.json',
  (font) => {
      const textGeometry = new TextGeometry(
          'MARKO ZETOVIC',
          {
              font: font,
              size: 2,
              height: 1,
              curveSegments: 5,
              bevelEnabled: true,
              bevelThickness: 0.03,
              bevelSize: 0.02,
              bevelOffset: 0,
              bevelSegments: 4
          }
      )
      // textGeometry.center()
      // textGeometry.computeBoundingBox()
      // textGeometry.translate(
      //     - (textGeometry.boundingBox.max.x-0.02) * 0.5,
      //     - (textGeometry.boundingBox.max.y-0.02) * 0.5,
      //     - (textGeometry.boundingBox.max.z-0.03) * 0.5
      // )
      const textMaterial = new THREE.MeshBasicMaterial({color:"black"})
      const text = new THREE.Mesh(textGeometry, textMaterial)
      scene.add(text)
      text.position.x = -24
      text.position.z = 15

      text.position.y = 0.9

      text.rotation.x = -Math.PI/2
      text.rotation.z = -Math.PI/8

  }
)

fontLoader.load(
  '/fonts/helvetiker_regular.typeface.json',
  (font) => {
      const textGeometry = new TextGeometry(
          'SOFTWARE ENGINEER',
          {
              font: font,
              size: 1,
              height: 1,
              curveSegments: 5,
              bevelEnabled: true,
              bevelThickness: 0.03,
              bevelSize: 0.02,
              bevelOffset: 0,
              bevelSegments: 4
          }
      )
      // textGeometry.center()
      // textGeometry.computeBoundingBox()
      // textGeometry.translate(
      //     - (textGeometry.boundingBox.max.x-0.02) * 0.5,
      //     - (textGeometry.boundingBox.max.y-0.02) * 0.5,
      //     - (textGeometry.boundingBox.max.z-0.03) * 0.5
      // )
      const textMaterial = new THREE.MeshBasicMaterial({color:"black"})
      const text = new THREE.Mesh(textGeometry, textMaterial)
      scene.add(text)
      text.position.x = -17.5
      text.position.z = 19.5

      text.position.y = 0.9

      text.rotation.x = -Math.PI/2
      text.rotation.z = -Math.PI/8
  }
)

fontLoader.load(
  '/fonts/helvetiker_regular.typeface.json',
  (font) => {
      const textGeometry = new TextGeometry(
          'CLICK THE DUCKS TO LEARN ABOUT ME :)',
          {
              font: font,
              size: 0.5,
              height: 1,
              curveSegments: 5,
              bevelEnabled: true,
              bevelThickness: 0.03,
              bevelSize: 0.02,
              bevelOffset: 0,
              bevelSegments: 4
          }
      )
      // textGeometry.center()
      // textGeometry.computeBoundingBox()
      // textGeometry.translate(
      //     - (textGeometry.boundingBox.max.x-0.02) * 0.5,
      //     - (textGeometry.boundingBox.max.y-0.02) * 0.5,
      //     - (textGeometry.boundingBox.max.z-0.03) * 0.5
      // )
      const textMaterial = new THREE.MeshBasicMaterial({color:"black"})
      const text = new THREE.Mesh(textGeometry, textMaterial)
      if (!/Android|iPhone/i.test(navigator.userAgent)) {
        scene.add(text)
      }
      text.position.x = -14
      text.position.z = 22

      text.position.y = 0.9

      text.rotation.x = -Math.PI/2
      text.rotation.z = -Math.PI/8
  }
)

fontLoader.load(
  '/fonts/helvetiker_regular.typeface.json',
  (font) => {
      const textGeometry = new TextGeometry(
          'TAP THE DUCKS TO LEARN ABOUT ME :)',
          {
              font: font,
              size: 0.5,
              height: 1,
              curveSegments: 5,
              bevelEnabled: true,
              bevelThickness: 0.03,
              bevelSize: 0.02,
              bevelOffset: 0,
              bevelSegments: 4
          }
      )
      // textGeometry.center()
      // textGeometry.computeBoundingBox()
      // textGeometry.translate(
      //     - (textGeometry.boundingBox.max.x-0.02) * 0.5,
      //     - (textGeometry.boundingBox.max.y-0.02) * 0.5,
      //     - (textGeometry.boundingBox.max.z-0.03) * 0.5
      // )
      const textMaterial = new THREE.MeshBasicMaterial({color:"black"})
      const text = new THREE.Mesh(textGeometry, textMaterial)
      if (/Android|iPhone/i.test(navigator.userAgent)) {
        scene.add(text)
      }
      text.position.x = -14
      text.position.z = 22

      text.position.y = 0.9

      text.rotation.x = -Math.PI/2
      text.rotation.z = -Math.PI/8
  }
)

const aboutme = new THREE.Group()
fontLoader.load(
  '/fonts/helvetiker_regular.typeface.json',
  (font) => {
      const textGeometry = new TextGeometry(
          'ABOUT ME',
          {
              font: font,
              size: 0.5,
              height: 0.1,
              curveSegments: 5,
              bevelEnabled: true,
              bevelThickness: 0.03,
              bevelSize: 0.02,
              bevelOffset: 0,
              bevelSegments: 4
          }
      )
      const textMaterial = new THREE.MeshBasicMaterial({color:"black"})
      const text = new THREE.Mesh(textGeometry, textMaterial)
      aboutme.add(text)
      
      // text.position.x = -14
      // text.position.z = 22

      // text.position.y = 2

      // text.rotation.x = -Math.PI/2
      // text.rotation.z = -Math.PI/8
  }
)
// aboutme.position.y = 4.2
aboutme.position.z = 9
aboutme.position.x = -5.9

aboutme.rotation.y = Math.PI/10
// aboutme.rotation.x = -Math.PI/10

// gui.add(aboutme.rotation, "x").step(0.1)
// aboutme.visible = true
// aboutme.rotation.x = -Math.PI/4
scene.add(aboutme)

const contact = new THREE.Group()
fontLoader.load(
  '/fonts/helvetiker_regular.typeface.json',
  (font) => {
      const textGeometry = new TextGeometry(
          'CONTACT',
          {
              font: font,
              size: 0.5,
              height: 0.1,
              curveSegments: 5,
              bevelEnabled: true,
              bevelThickness: 0.03,
              bevelSize: 0.02,
              bevelOffset: 0,
              bevelSegments: 4
          }
      )
      const textMaterial = new THREE.MeshBasicMaterial({color:"black"})
      const text = new THREE.Mesh(textGeometry, textMaterial)
      contact.add(text)
      
      // text.position.x = -14
      // text.position.z = 22

      // text.position.y = 2

      // text.rotation.x = -Math.PI/2
      // text.rotation.z = -Math.PI/8
  }
)
// contact.position.y = 4.2
contact.position.z = 0.3
contact.position.x = 0

contact.rotation.y = 0.4

// aboutme.rotation.x = -Math.PI/4

scene.add(contact)

const portfolio = new THREE.Group()
fontLoader.load(
  '/fonts/helvetiker_regular.typeface.json',
  (font) => {
      const textGeometry = new TextGeometry(
          'PORTFOLIO',
          {
              font: font,
              size: 0.5,
              height: 0.1,
              curveSegments: 5,
              bevelEnabled: true,
              bevelThickness: 0.03,
              bevelSize: 0.02,
              bevelOffset: 0,
              bevelSegments: 4
          }
      )
      const textMaterial = new THREE.MeshBasicMaterial({color:"black"})
      const text = new THREE.Mesh(textGeometry, textMaterial)
      portfolio.add(text)
      
      // text.position.x = -14
      // text.position.z = 22

      // text.position.y = 2

      // text.rotation.x = -Math.PI/2
      // text.rotation.z = -Math.PI/8
  }
)
// portfolio.position.y = 4.2
portfolio.position.z = 0.5
portfolio.position.x = -11.8

portfolio.rotation.y = 0.4

// aboutme.rotation.x = -Math.PI/4
scene.add(portfolio)



// const listener = new THREE.AudioListener();
// const audioLoader = new THREE.AudioLoader();
// const music = new THREE.Audio(listener);

// let userInteracted = false;

// window.addEventListener('click', () => {
//     if (!userInteracted) {
//         userInteracted = true;
//         music.play();
//     }
// });

// audioLoader.load('pond.mp3', function(buffer) {
//   music.setBuffer(buffer);
//   music.setLoop(true);
//   music.setVolume(0.7);
//   music.play();
// });

// music.setVolume(0);  // Start the audio as muted
// music.setVolume(0.5);  // Start the audio as muted

maleDuckMTLLoader.load('maleduck.mtl', 
      (materials) => {
        materials.preload()
        maleDuckOBJLoader.setMaterials(materials)
        maleDuckOBJLoader.load('maleduck.obj',
          (object) => {

            duck1.add(object)
            }
          )
        })

scene.add(duck1)

femaleDuckMTLLoader.load('femaleduck.mtl', 
      (materials) => {
        materials.preload()
        femaleDuckOBJLoader.setMaterials(materials)
        femaleDuckOBJLoader.load('femaleduck.obj',
          (object) => {

            duck2.add(object)
            }
          )
        })

scene.add(duck2)

femaleDuckMTLLoader.load('femaleduck.mtl', 
      (materials) => {
        materials.preload()
        femaleDuckOBJLoader.setMaterials(materials)
        femaleDuckOBJLoader.load('femaleduck.obj',
          (object) => {

            duck3.add(object)
            }
          )
        })

scene.add(duck3)

maleDuckHoverMTLLoader.load('maleduckhover.mtl', 
      (materials) => {
        materials.preload()
        maleDuckHoverOBJLoader.setMaterials(materials)
        maleDuckHoverOBJLoader.load('maleduckhover.obj',
          (object) => {

            hoverduck1.add(object)
            }
          )
        })

// scene.add(hoverduck1)

femaleDuckHoverMTLLoader.load('femaleduckhover.mtl', 
      (materials) => {
        materials.preload()
        femaleDuckHoverOBJLoader.setMaterials(materials)
        femaleDuckHoverOBJLoader.load('femaleduckhover.obj',
          (object) => {

            hoverduck2.add(object)
            }
          )
        })

// scene.add(hoverduck2)

scene.add(hoverduck1)
scene.add(hoverduck2)
scene.add(hoverduck3)

// hoverduck1.visible = false
// hoverduck2.visible = false
// hoverduck3.visible = false


femaleDuckHoverMTLLoader.load('femaleduckhover.mtl', 
      (materials) => {
        materials.preload()
        femaleDuckHoverOBJLoader.setMaterials(materials)
        femaleDuckHoverOBJLoader.load('femaleduckhover.obj',
          (object) => {

            hoverduck3.add(object)
            }
          )
        })

// scene.add(hoverduck3)

pondOBJLoader.load('pond.obj',
(object) => {

  pond.add(object)
  })

  treeOBJLoader.load('tree.obj',
(object) => {

  tree.add(object)


  })

  treeOBJLoader.load('tree.obj',
(object) => {


  tree2.add(object)
 

  })

  treeOBJLoader.load('tree.obj',
(object) => {



  tree3.add(object)


  })

  treeOBJLoader.load('tree.obj',
(object) => {




  tree4.add(object)

  })
  rockOBJLoader.load('rockgroup.obj',
(object) => {
  rock.add(object)

  })

  rockOBJLoader.load('rock.obj',
(object) => {
  rock2.add(object)

  })

  rockOBJLoader.load('rock.obj',
(object) => {
  rock3.add(object)

  })

  rockOBJLoader.load('rockgroup.obj',
(object) => {
  rock4.add(object)

  })

  rockOBJLoader.load('rockgroup.obj',
  (object) => {
    rock5.add(object)
  
    })

    rockOBJLoader.load('rock.obj',
    (object) => {
      rock6.add(object)
    
      })

  wheetMTLLoader.load('wheet.mtl', 
  (materials) => {
    materials.preload()
    wheetOBJLoader.setMaterials(materials)
    wheetOBJLoader.load('wheet.obj',
      (object) => {

        wheet.add(object)
        }
      )
    })

scene.add(wheet)

hillMTLLoader.load('hill.mtl', 
  (materials) => {
    materials.preload()
    hillOBJLoader.setMaterials(materials)
    hillOBJLoader.load('hill.obj',
      (object) => {

        hill.add(object)
        }
      )
    })

scene.add(hill)

hillMTLLoader.load('hill.mtl', 
  (materials) => {
    materials.preload()
    hillOBJLoader.setMaterials(materials)
    hillOBJLoader.load('hill.obj',
      (object) => {

        hill2.add(object)
        }
      )
    })

scene.add(hill2)

wheet2MTLLoader.load('wheet2.mtl', 
  (materials) => {
    materials.preload()
    wheet2OBJLoader.setMaterials(materials)
    wheet2OBJLoader.load('wheet2.obj',
      (object) => {

        wheet2.add(object)
        }
      )
    })

scene.add(wheet2)


wheet.scale.x = 10
wheet.scale.y = 10
wheet.scale.z = 10

wheet2.scale.x = 10
wheet2.scale.y = 10
wheet2.scale.z = 10


wheet2.position.x = 8
wheet2.position.z = -10
wheet2.rotation.y = -Math.PI/4


wheet.position.x = -6
wheet.position.y = -2
wheet2.position.y = -2

wheet.position.z = -10
wheet.rotation.y = Math.PI/4

hill.position.y = 1
hill.position.z = -50
hill.position.x = 150
hill.rotation.y = -Math.PI/8


hill.scale.x = -10
hill.scale.z = 10
hill.scale.y = 10

hill2.position.y = 1
hill2.position.z = -80
hill2.position.x = -105
hill2.rotation.y = Math.PI/8

hill2.scale.x = 10
hill2.scale.z = 10
hill2.scale.y = 10

duck1.position.z = 4
duck1.position.x = -3

duck2.position.x = -12

hoverduck1.position.z = 4
hoverduck1.position.x = -3

hoverduck2.position.x = -12


pond.position.y = -2
pond.position.z = -6
pond.scale.x = 1.2
scene.add(pond)

tree.position.z = -40
tree.position.x = -20

tree.scale.x = 2
tree.scale.y = 2
tree.scale.z = 2

tree.position.y = 2

tree2.position.z = -15
tree2.position.x = -45
tree2.rotation.y = Math.PI/4

tree2.scale.x = 2
tree2.scale.y = 2
tree2.scale.z = 2

tree2.position.y = 2

tree3.position.z = -25
tree3.position.x = 50
tree3.rotation.y = Math.PI

tree3.scale.x = 2
tree3.scale.y = 2
tree3.scale.z = 2

tree3.position.y = 2

tree4.position.z = 20
tree4.position.x = 20
tree4.rotation.y = Math.PI/16

tree4.scale.x = 2
tree4.scale.y = 2
tree4.scale.z = 2

tree4.position.y = 2
rock.position.z = 20
rock.position.x = 4
rock.rotation.y = Math.PI/1.5
rock.position.y = 1
rock.scale.x = 2
rock.scale.y = 2
rock.scale.z = 2
scene.add(rock)
rock2.position.z = 10
rock2.position.x = 30
rock2.rotation.y = Math.PI/1.5
rock2.position.y = 1.5
rock2.scale.x = 5
rock2.scale.y = 5
rock2.scale.z = 5
scene.add(rock2)
rock3.position.z = -20
rock3.position.x = 40
rock3.rotation.y = Math.PI
rock3.position.y = 1.5
rock3.scale.x = 5
rock3.scale.y = 5
rock3.scale.z = 5
scene.add(rock3)
rock4.position.z = 0
rock4.position.x = 80
rock4.rotation.y = Math.PI/2
rock4.position.y = 1.5
rock4.scale.x = 8
rock4.scale.y = 8
rock4.scale.z = 8
scene.add(rock4)
rock5.position.z = -40
rock5.position.x = -35
rock5.rotation.y = -Math.PI/16
rock5.position.y = 1.5
rock5.scale.x = 7
rock5.scale.y = 7
rock5.scale.z = 7
scene.add(rock5)
rock6.position.z = -5
rock6.position.x = -35
rock6.rotation.y = Math.PI
rock6.position.y = 1.5
rock6.scale.x = 5
rock6.scale.y = 5
rock6.scale.z = 5
scene.add(rock6)
scene.background = bg

const waterGeometry = new THREE.PlaneGeometry( 40, 49 );

				water = new Water( waterGeometry, {
					color: "#8fc5ff",
					scale: 1,
					flowDirection: new THREE.Vector2( 0.1, 0.1 ),
					textureWidth: 1024,
					textureHeight: 1024
				} );

				water.position.y = 0;
				water.rotation.x = Math.PI * - 0.5;
				scene.add( water );

/**
 * Base
 */
// Debug

const particleTexture = textureLoader.load('/textures/1.png')

const particlesGeometry = new THREE.BufferGeometry()
const count = 1000

const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)


for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 100
    colors[i] = "white"
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

const particlesMaterial = new THREE.ShaderMaterial({
  uniforms: {
      pointTexture: { value: new THREE.TextureLoader().load('/textures/1.png') },
      size: { value: 0.15 },  // Adjust the value as necessary
      color: { value: new THREE.Color('white') }
  },
  vertexShader: `
    varying vec3 vColor;
    uniform float size;

    void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform sampler2D pointTexture;
    varying vec3 vColor;

    void main() {
        gl_FragColor = vec4(vColor, 1.0);
        gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
    }
  `,
  blending: THREE.AdditiveBlending,
  depthTest: false,
  transparent: true,
  vertexColors: true
});



particlesMaterial.alphaMap = particleTexture
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
// gui.add(particles.position, "y")
scene.add(particles)

const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
directionalLight.position.set( - 1, 1, 1 );
scene.add( directionalLight );

// Canvas
const canvas = document.querySelector('canvas.webgl')

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


window.addEventListener('resize', () =>
{
  let newFov;
  if(window.innerWidth <= 320) { // Small mobile devices
    newFov = 140;
  } else if(window.innerWidth <= 375) { // Med Mobile
    newFov = 130;
  } else if(window.innerWidth <= 415) { // large Mobile
    newFov = 130;
  } else if(window.innerWidth <= 425) { // large Mobile
    newFov = 120;
  } else if(window.innerWidth <= 606) { // large Mobile
    newFov = 120;
  } else if(window.innerWidth <= 768) { // Tablets and larger mobile devices
    newFov = 110;
  } else if(window.innerWidth <= 912) { // Tablets and larger mobile devices
    newFov = 110;
  } else { // Desktop
    newFov = 75;
  }
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.fov = newFov
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// window.addEventListener( 'pointermove', onPointerMove );

/**
 * Camera
 */
let fov;

if(window.innerWidth <= 320) { // Small mobile devices
  fov = 140;
} else if(window.innerWidth <= 375) { // Med Mobile
  fov = 130;
} else if(window.innerWidth <= 415) { // Med Mobile
  fov = 130;
} else if(window.innerWidth <= 425) { // large Mobile
  fov = 120;
} else if(window.innerWidth <= 606) { // large Mobile
  fov = 120;
}else if(window.innerWidth <= 768) { // Tablets and larger mobile devices
  fov = 110;
} else if(window.innerWidth <= 912) { // Tablets and larger mobile devices
  fov = 110;
} else { // Desktop
  fov = 75;
}

//small: 140, laptop:75, med:130, large:120, tablet: 100
const camera = new THREE.PerspectiveCamera(fov, sizes.width / sizes.height, 0.1, 140)
camera.position.x = -10.67597486049261
camera.position.y = 15.55260554365897
camera.position.z = 36.30427707665219
scene.add(camera)

if(window.innerWidth <= 320) { // Small mobile devices
  camera.position.z = 32.30427707665219
} 

if(window.innerWidth <= 375) { // Small mobile devices
  camera.position.z = 32.30427707665219
} 
// gui.add(camera.position, "z")

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enablePan = false

// controls.enableZoom =false
controls.maxDistance = 50
controls.minDistance = 20

controls.maxPolarAngle = Math.PI/2.5
controls.minPolarAngle = Math.PI/3

controls.minAzimuthAngle = -Math.PI/8
controls.maxAzimuthAngle = -Math.PI/32
controls.enableDamping = true
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.domElement.style.touchAction = 'none';
renderer.domElement.addEventListener('pointermove', onPointerMove);
renderer.domElement.addEventListener('click', onClick);

function onPointerMove(event) {

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

}

let isCardOpen = false;

function onClick(event) {

  if (isCardOpen && !event.target.classList.contains('close-button')) {
    return;
  }

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);

  const intersectsMale = raycaster.intersectObjects(duck1.children, true);
  const intersectsFemale = raycaster.intersectObjects(duck2.children, true);
  const intersectsFemale2 = raycaster.intersectObjects(duck3.children, true);

  const makeQuack = () => {
    const audio = new Audio('quack.mp3');
    audio.volume = 0.2
    audio.play();
  }

  if(intersectsMale.length > 0) {
    makeQuack()
    document.getElementById('aboutme-card').style.display = 'block';
    document.getElementById('blur-background').style.display = 'block';
    document.body.style.cursor = 'default';
    isCardOpen = true;
  } 

  if (intersectsFemale.length > 0) {
    makeQuack()
    document.getElementById('portfolio-card').style.display = 'block';
    document.getElementById('blur-background').style.display = 'block';
    document.body.style.cursor = 'default';
    isCardOpen = true;
  }

  if (intersectsFemale2.length > 0) {
    makeQuack()
    document.getElementById('contact-card').style.display = 'block';
    document.getElementById('blur-background').style.display = 'block';
    document.body.style.cursor = 'default';
    isCardOpen = true;
  }
  // Prevent event propagation when clicking on the card
}

document.getElementById('aboutme-card').addEventListener('click', function(e) {
  e.stopPropagation();

});

document.getElementById('contact-card').addEventListener('click', function(e) {
  e.stopPropagation();
});

document.getElementById('portfolio-card').addEventListener('click', function(e) {
  e.stopPropagation();
});

// Hide card and remove blur when clicking outside the card
document.getElementById('blur-background').addEventListener('click', function() {
  document.getElementById('aboutme-card').style.display = 'none';
  document.getElementById('contact-card').style.display = 'none';
  document.getElementById('portfolio-card').style.display = 'none';
  document.getElementById('blur-background').style.display = 'none';
  isCardOpen = false;
});

document.getElementById('close-button-about').addEventListener('click', function(event) {
  event.stopPropagation(); // prevent the event from propagating to other click handlers
  document.getElementById('aboutme-card').style.display = 'none';
  document.getElementById('portfolio-card').style.display = 'none';
  document.getElementById('contact-card').style.display = 'none';
  document.getElementById('blur-background').style.display = 'none';
  document.body.style.cursor = 'auto'; 
  isCardOpen = false;
});

document.getElementById('close-button-contact').addEventListener('click', function(event) {
  event.stopPropagation(); // prevent the event from propagating to other click handlers
  document.getElementById('contact-card').style.display = 'none';
  document.getElementById('aboutme-card').style.display = 'none';
  document.getElementById('portfolio-card').style.display = 'none';
  document.getElementById('blur-background').style.display = 'none';
  document.body.style.cursor = 'auto'; 
  isCardOpen = false;
});

document.getElementById('close-button-portfolio').addEventListener('click', function(event) {
  event.stopPropagation(); // prevent the event from propagating to other click handlers
  document.getElementById('contact-card').style.display = 'none';
  document.getElementById('aboutme-card').style.display = 'none';
  document.getElementById('portfolio-card').style.display = 'none';
  document.getElementById('blur-background').style.display = 'none';
  document.body.style.cursor = 'auto'; 
  isCardOpen = false;
});


window.addEventListener('click', onClick);

raycaster = new THREE.Raycaster();

function raycastAndOutline() {
  raycaster.setFromCamera(pointer, camera);

  const intersectsMale = raycaster.intersectObjects(duck1.children, true);
  const intersectsFemale = raycaster.intersectObjects(duck2.children, true);
  const intersectsFemale2 = raycaster.intersectObjects(duck3.children, true);
  
  if (isCardOpen) {
    document.body.style.cursor = 'default';

    return; // Exit early if the card is open to prevent further cursor changes
  }

  document.body.style.cursor = 'auto';
  hoverduck1.visible = false
  hoverduck2.visible = false
  hoverduck3.visible = false
  aboutme.visible = false
  portfolio.visible = false
  contact.visible = false

  if (intersectsMale.length > 0) {
  hoverduck1.visible = true
  aboutme.visible = true
  document.body.style.cursor = 'pointer';
  }

  if (intersectsFemale.length > 0) {
  portfolio.visible = true
  hoverduck2.visible = true
  document.body.style.cursor = 'pointer';
  }

  if (intersectsFemale2.length > 0) {
  hoverduck3.visible = true
  contact.visible = true
  document.body.style.cursor = 'pointer';
  }

}

renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.outputColorSpace = THREE.LinearSRGBColorSpace

renderer.toneMappingExposure = 1.3;

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// gui.add(renderer, "toneMappingExposure").min(-1).max(2).step(0.1)
const sky = new Sky();
  sky.scale.setScalar( 10000 );
  scene.add( sky );

  const skyUniforms = sky.material.uniforms;

  skyUniforms[ 'turbidity' ].value = 10;
  skyUniforms[ 'rayleigh' ].value = 0.5;
  skyUniforms[ 'mieCoefficient' ].value = 0.005;
  skyUniforms[ 'mieDirectionalG' ].value = 0.8;

  const parameters = {
    elevation: 0,
    azimuth: 166
  };

  const pmremGenerator = new THREE.PMREMGenerator( renderer );
  const sceneEnv = new THREE.Scene();

  let renderTarget;

function updateSun() {

  const phi = THREE.MathUtils.degToRad( 90 - parameters.elevation );
  const theta = THREE.MathUtils.degToRad( parameters.azimuth );

  sun.setFromSphericalCoords( 1, phi, theta );

  sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
  // water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

  if ( renderTarget !== undefined ) renderTarget.dispose();

  sceneEnv.add( sky );
  renderTarget = pmremGenerator.fromScene( sceneEnv );
  scene.add( sky );

  scene.environment = renderTarget.texture;

}

updateSun();

const allducks = new THREE.Group()
allducks.add(duck1, duck2, duck3, hoverduck1, hoverduck2, hoverduck3, aboutme, contact, portfolio)
scene.add(allducks)
allducks.position.x = 2.5

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    duck1.position.y = Math.cos((elapsedTime *2))*0.05 + 1.3
    duck2.position.y = Math.sin(elapsedTime *2)*0.05 + 1.3
    duck3.position.y = Math.cos(elapsedTime *4)*0.05 + 1.3

    hoverduck1.position.y = Math.cos((elapsedTime *2))*0.05 + 1.3
    aboutme.position.y = Math.cos((elapsedTime *2))*0.05 + 4.2

    hoverduck2.position.y = Math.sin(elapsedTime *2)*0.05 + 1.3
    portfolio.position.y = Math.sin(elapsedTime *2)*0.05 + 4.2

    hoverduck3.position.y = Math.cos(elapsedTime *4)*0.05 + 1.3
    contact.position.y = Math.cos(elapsedTime *4)*0.05 + 4.2

    wheet.position.x = Math.sin(elapsedTime *2)*0.05 -6
    wheet2.position.x = Math.sin(elapsedTime *2)*0.05 +8

    particles.rotation.x -= 0.002
    particlesGeometry.attributes.position.needsUpdate = true

    renderer.render(scene, camera)
    raycastAndOutline();


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()