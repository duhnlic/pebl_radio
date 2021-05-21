import ParticleField from 'react-particles-webgl';


export default function Particles(){ 
    
    const config = {
        showCube: false,
        dimension: "3D",
        velocity: 2.5,
        boundaryType: "bounce",
        antialias: true,
        direction: {
          xMin: -1,
          xMax: 1,
          yMin: -1,
          yMax: 1,
          zMin: -1,
          zMax: 1
        },
        lines: {
          colorMode: "rainbow",
          color: "#3FB568",
          transparency: 0.9,
          limitConnections: false,
          maxConnections: 600,
          minDistance: 60,
          visible: true
        },
        particles: {
          colorMode: "rainbow",
          color: "#3FB568",
          transparency: 0.9,
          shape: "circle",
          boundingBox: "cube",
          count: 600,
          minSize: 20,
          maxSize: 50,
          visible: true
        },
        cameraControls: {
          enabled: false,
          enableDamping: true,
          dampingFactor: 0.2,
          enableZoom: true,
          autoRotate: true,
          autoRotateSpeed: 3.33,
          resetCameraFlag: true
        }
      };


    return (
    <div className="threeBackground" style={{ height: "100vh", width: "100%" }}>
      <ParticleField 
        config={config}

      />
    </div>
  );
}