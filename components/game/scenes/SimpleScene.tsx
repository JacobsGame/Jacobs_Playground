"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export const SimpleScene = () => {
    return (
        <Canvas
            style={{
                width: "100vw",
                height: "calc(100vh - 50px)",
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
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={"orange"} />
            </mesh>
            <OrbitControls />
        </Canvas>
    );
};
