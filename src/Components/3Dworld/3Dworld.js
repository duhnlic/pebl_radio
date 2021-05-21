import { useEffect } from 'react';
import * as THREE from 'three';


const World =()=>{

    const renderWorld=()=>{

        //define the variables of the 3D world
        let _width = window.innerWidth;
        let _height= window.innerHeight;
        const scene = new THREE.Scene();
        const fov = 60;
        const aspect = 2; 
        const near = 0.1;
        const far = 100;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(0, 0, 0);   
        const renderer = new THREE.WebGLRenderer({antialias:true, alpha:false});
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        const geometry = new THREE.SphereGeometry(2, 35, 35, 20, Math.PI * 2, 0, Math.PI * 2);
        const loader = new THREE.TextureLoader();
        const map = loader.load( 'https://i.imgur.com/Uj2VTad.jpg', render );
        const displacementMap = loader.load('https://i.imgur.com/j3HIr0l.jpg', render);
        const normalMap = loader.load( 'https://i.imgur.com/2M74L9A.jpg', render );
        const aoMap = loader.load('https://i.imgur.com/Oqi8ZJT.jpg', render);
        const roughnessMap = loader.load('https://i.imgur.com/ERoOa8m.jpg', render);
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

        //assign the scene and the camera to the renderer (the core functionality of Three.js)
        function render() {
            renderer.render( scene, camera );
        }

        //allow re-render to allow for responsiveness
        const onWindowResize =()=> {
            _width = window.innerWidth;
            _height = window.innerHeight;
            renderer.setSize(_width, _height);
            camera.updateProjectionMatrix();
            console.log('- resize -');
          }
          
        window.addEventListener('resize', onWindowResize, false);


        //create the 3D object(s)
        const planetRadio = new THREE.Mesh( geometry, material );
        // const planetProfile = new THREE.Mesh( geometry, material );
        
        //add the object(s) to the world
        scene.add( planetRadio );
        // scene.add( planetProfile );

        //lighting for the world
        const color = 0xF3F3F3;
        const intensity = 4;
        const ambiColor = 0x00FF00;
        const ambiIntensity = 0.216;
        const light = new THREE.DirectionalLight(color, intensity);
        const ambientLight = new THREE.AmbientLight(ambiColor, ambiIntensity);
        light.position.set(-5, 5, 10);
        light.target.position.set(-5, 0, 0);
        scene.add(ambientLight)
        scene.add(light);
        scene.add(light.target);

        //development assistant 
        const helper = new THREE.DirectionalLightHelper(light);
        // scene.add(helper);

        //place the camera
        camera.position.z = 8;

        //animate the 3D object
        const animate =()=> {
            requestAnimationFrame( animate );
            planetRadio.rotation.y += 0.003;
            // planetProfile.rotation.y += 0.003;
            renderer.render( scene, camera );
        };
        animate();
        
        //create finalized world
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