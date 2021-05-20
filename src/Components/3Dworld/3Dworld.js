import { useEffect } from 'react';
import * as THREE from 'three';
// import {Icosahedron} from '@react-three/drei'

const World =()=>{

    const renderWorld=()=>{

        let _width = window.innerWidth;
        let _height= window.innerHeight;
        const scene = new THREE.Scene();
        const fov = 60;
        const aspect = 2;  // the canvas default
        const near = 0.1;
        const far = 100;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(0, 0, 0);   
        const renderer = new THREE.WebGLRenderer({antialias:true, alpha:false});
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        const geometry = new THREE.SphereGeometry(2, 35, 35, 20, Math.PI * 2, 0, Math.PI * 2);
        // const texture = new THREE.TextureLoader().load('https://i.imgur.com/TTtGyo1.png')
        // textures
        const loader = new THREE.TextureLoader();
        const map = loader.load( 'https://i.imgur.com/QGT8hDQ.jpg', render );
        const normalMap = loader.load( 'https://i.imgur.com/aSTWIhM.jpg', render );
        const displacementMap = loader.load('https://i.imgur.com/aWSDhXc.png', render);
        const roughnessMap = loader.load('https://i.imgur.com/4RyhnQY.jpg', render);
        const aoMap = loader.load('https://i.imgur.com/XzUCPv2.jpg', render);

        const material = new THREE.MeshPhongMaterial({
            map: map,
            normalMap: normalMap,
            metalness: 1,
            color: 0xB1DDFB,
            displacementMap: displacementMap,
            displacementScale: 0.2,
            aoMap: aoMap,
            roughnessMap: roughnessMap,
            roughness: 0.3,
            specular: 0x222222,
            alphaTest: 0,
            shininess: 500
        });

        function render() {

            renderer.render( scene, camera );
        
        }

        const onWindowResize =()=> {
            _width = window.innerWidth;
            _height = window.innerHeight;
            renderer.setSize(_width, _height);
            camera.updateProjectionMatrix();
            console.log('- resize -');
          }
          
        window.addEventListener('resize', onWindowResize, false);


   
        const planetRadio = new THREE.Mesh( geometry, material );
        // const planetProfile = new THREE.Mesh( geometry, material );

        scene.add( planetRadio );
        // scene.add( planetProfile );

        // create a light
        const color = 0xF3F3F3;
        const intensity = 4;
        const ambiIntensity = 0.31;
        const light = new THREE.DirectionalLight(color, intensity);
        const ambientLight = new THREE.AmbientLight(color, ambiIntensity);
        light.position.set(-5, 5, 10);
        light.target.position.set(-5, 0, 0);
        scene.add(ambientLight)
        scene.add(light);
        scene.add(light.target);

        const helper = new THREE.DirectionalLightHelper(light);
        // scene.add(helper);
        
        camera.position.z = 5;
        const animate =()=> {
            requestAnimationFrame( animate );
            planetRadio.rotation.y += 0.013;
            // planetProfile.rotation.y += 0.003;
            renderer.render( scene, camera );
        };
        animate();
        
        const world =()=>{
        //   planetProfile.position.y += 8;
        //   planetProfile.position.x += 18;
        //   planetProfile.position.z += -15;
          renderer.render( scene, camera );
        };
        world();
    }
    
    useEffect(()=>{
        renderWorld()
    }, [])
    
    return(
        null
    )

}

export default World;