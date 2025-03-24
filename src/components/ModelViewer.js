import React, { Suspense, useEffect} from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { EffectComposer, N8AO } from '@react-three/postprocessing';
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
                shadows={{ type: THREE.PCFSoftShadowMap }}
                gl={{ antialias: true }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[10, 10, 10]}
                    intensity={4}
                    castShadow
                    shadow-mapSize-width={4096}
                    shadow-mapSize-height={4096}
                    shadow-bias={-0.0001}
                    shadow-camera-left={-20}
                    shadow-camera-right={20}
                    shadow-camera-top={20}
                    shadow-camera-bottom={-20}
                />
                <pointLight
                    position={[-15, 10, -15]}
                    intensity={0.5}
                    color={new THREE.Color(0.8, 0.8, 1)}
                    decay={0}
                    castShadow={false}
                />
                <Suspense fallback={null}>
                    <Model_warehouse />
                    <Model_objects />
                </Suspense>
                <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
                
                <EffectComposer>
                    <N8AO
                        aoRadius={2.0}
                        intensity={2.0}
                        distanceFalloff={0.5}
                        color="black"
                        aoSamples={16}
                        denoiseSamples={16}
                        denoiseRadius={2.0}
                    />
                </EffectComposer>
            </Canvas>
        </>
    );
};

export default ModelViewer;