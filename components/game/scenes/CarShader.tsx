"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export const CarShaderScene = () => {
    return (
        <Canvas
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            <ambientLight intensity={Math.PI / 2} />
            <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                decay={0}
                intensity={Math.PI}
            />
            <pointLight
                position={[-10, -10, -10]}
                decay={0}
                intensity={Math.PI}
            />
            <OrbitControls />
        </Canvas>
    );
};
