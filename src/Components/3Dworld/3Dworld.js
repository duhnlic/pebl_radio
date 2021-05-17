import { useEffect } from 'react';
import * as THREE from 'three';

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
        const texture = new THREE.TextureLoader().load('https://i.imgur.com/mwuqcky.jpg')
        const material = new THREE.MeshBasicMaterial({
            map: texture
        });

        const onWindowResize =()=> {
            _width = window.innerWidth;
            _height = window.innerHeight;
            renderer.setSize(_width, _height);
            camera.updateProjectionMatrix();
            console.log('- resize -');
          }
          
        window.addEventListener('resize', onWindowResize, false);


   
        const planetRadio = new THREE.Mesh( geometry, material );
        const planetProfile = new THREE.Mesh( geometry, material );

        scene.add( planetRadio );
        scene.add( planetProfile );
    
        // create a light
        const color = 0xFFFFFF;
        const intensity = 2;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-5, 5, 10);
        light.target.position.set(-5, 0, 0);
        scene.add(light);
        scene.add(light.target);

        const helper = new THREE.DirectionalLightHelper(light);
        scene.add(helper);
        
        camera.position.z = 5;
        const animate =()=> {
            requestAnimationFrame( animate );
            planetRadio.rotation.y += 0.003;
            planetProfile.rotation.y += 0.003;
            renderer.render( scene, camera );
        };
        animate();
        
        const world =()=>{
          planetProfile.position.y += 8;
          planetProfile.position.x += 18;
          planetProfile.position.z += -15;
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