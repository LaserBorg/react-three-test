import React, { Suspense, useEffect} from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';


function Model_warehouse() {
    const { scene } = useGLTF('/assets/warehouse_empty.glb');

    useEffect(() => {
        scene.traverse((object) => {
            if (object.isMesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.side = THREE.FrontSide;
                object.material.roughness = 0.7;
                object.material.color = new THREE.Color(1., 1.0, 1.0);
            }
        });
    }, [scene]);

    return <primitive object={scene} scale={1.0} />;
}

function Model_objects() {
    const { scene } = useGLTF('/assets/warehouse_objects.glb');

    useEffect(() => {
        scene.traverse((object) => {
            if (object.isMesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.side = THREE.FrontSide;
                object.material.color = new THREE.Color(0.4, 0.6, 1.0)
            }
        });
    }, [scene]);

    return <primitive object={scene} scale={1.0} />;
}

const ModelViewer = () => {
    return (
        <>
            <Canvas
                camera={{ position: [5, 3, 5] }}
                shadows={{ type: THREE.PCFSoftShadowMap }} // Use PCFSoftShadowMap for softer shadows
                gl={{ antialias: true }}
            >
                <ambientLight intensity={0.2} />
                <directionalLight
                    position={[10, 10, 10]}
                    intensity={5}
                    castShadow
                    shadow-mapSize-width={4096}  // Increase shadow map resolution
                    shadow-mapSize-height={4096} // Increase shadow map resolution
                    shadow-bias={-0.0001}        // Set shadows to PCF soft
                    shadow-camera-left={-40}     // Adjusted to cover a larger area
                    shadow-camera-right={40}     // Adjusted to cover a larger area
                    shadow-camera-top={40}       // Adjusted to cover a larger area
                    shadow-camera-bottom={-40}   // Adjusted to cover a larger area
                />
                <pointLight
                    position={[-15, 10, -15]}
                    intensity={0.2}
                    color={new THREE.Color(0.8, 0.8, 1)}
                    decay={0} // Disable decay
                    castShadow={false} // Disable shadow casting
                />
                <Suspense fallback={null}>
                    <Model_warehouse />
                    <Model_objects />
                </Suspense>
                <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
            </Canvas>
        </>
    );
};

export default ModelViewer;