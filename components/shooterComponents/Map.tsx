"use client";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React, { useEffect } from "react";
import { Mesh } from "three/src/Three.js";

const MAP_PATH = "./models/maps/scene_shoot_2.glb";
export const Map = () => {
    const map = useGLTF(MAP_PATH);

    useEffect(() => {
        map.scene.traverse((child) => {
            if ((child as Mesh).isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    });
    return (
        <RigidBody colliders={"trimesh"} type={"fixed"}>
            <primitive object={map.scene} />;
        </RigidBody>
    );
};

useGLTF.preload(MAP_PATH);
