"use client";
import dynamic from "next/dynamic";
const PlayerInfo = dynamic(() => import("./PlayerInfo"), {
    ssr: false,
});
import React, { useEffect, useRef, useState } from "react";
import { GroupProps, useFrame, useGraph, useThree } from "@react-three/fiber";
import { Joystick, PlayerState, isHost } from "playroomkit";
import { ActionName, CharacterSoldier } from "./Character_Soldier";
import {
    CapsuleCollider,
    RapierRigidBody,
    RigidBody,
    vec3,
} from "@react-three/rapier";
import { CameraControls } from "@react-three/drei";

import { BulletData, BulletUserData } from "./Bullet";

interface CharacterControllerProps extends GroupProps {
    state: PlayerState;
    joystick: Joystick;
    userPlayer: boolean;
    onFire: (bullet: BulletData) => void;
    onKilled: (victim: string, killer: string) => void;
}

const MOVEMENT_SPEED = 200;
const FIRE_RATE = 380;

export const WEAPON_OFFSET = {
    x: -0.2,
    y: 1.4,
    z: 0.8,
};

export const CharacterController = ({
    state,
    joystick,
    userPlayer,
    onFire,
    onKilled,
    ...props
}: CharacterControllerProps) => {
    const groupRef = useRef(null);
    const characterRef = useRef<THREE.Group>(null);
    const rigidBodyRef = useRef<RapierRigidBody>(null);
    const controlsRef = useRef<CameraControls>(null);
    const lastShoot = useRef(0);
    const [animation, setAnimation] = useState<ActionName>("Idle");

    const [isInit, setIsInit] = useState(false);

    const scene = useThree((state) => state.scene);
    const spawnRandomly = () => {
        const spawns = [];
        for (let i = 1; i < 1000; i++) {
            const spawn = scene.getObjectByName(`spawn_${i}`);
            if (spawn) {
                spawns.push(spawn);
            } else {
                break;
            }
        }
        const spawnPos =
            spawns[Math.floor(Math.random() * spawns.length)]?.position;
        if (spawnPos) {
            rigidBodyRef.current?.setTranslation(spawnPos, false);
        }
    };

    useEffect(() => {
        if (isHost()) {
            spawnRandomly();
        }
    }, []);

    useFrame((_, delta) => {
        if (controlsRef.current) {
            const cameraDistanceY = window.innerWidth < 1024 ? 16 : 20;
            const cameraDistanceZ = window.innerWidth < 1024 ? 12 : 16;
            const playerWorldPos = vec3(rigidBodyRef.current?.translation());

            controlsRef.current.setLookAt(
                playerWorldPos.x,
                playerWorldPos.y +
                    (state.getState("dead") ? 12 : cameraDistanceY),
                playerWorldPos.z +
                    (state.getState("dead") ? 2 : cameraDistanceZ),
                playerWorldPos.x,
                playerWorldPos.y + 1.5,
                playerWorldPos.z,
                true
            );
        }

        if (state.getState("dead")) {
            setAnimation("Death");
            return;
        }

        const angle = joystick.angle();
        if (joystick.isJoystickPressed()) {
            setAnimation("Run");
            characterRef.current!.rotation.y = angle;

            const implus = {
                x: Math.sin(angle) * MOVEMENT_SPEED * delta,
                y: 0,
                z: Math.cos(angle) * MOVEMENT_SPEED * delta,
            };

            rigidBodyRef.current?.applyImpulse(implus, true);
        } else {
            setAnimation("Idle");
        }

        if (isHost()) {
            state.setState("pos", rigidBodyRef.current?.translation());
        } else {
            const pos = state.getState("pos");
            if (pos) {
                rigidBodyRef.current?.setTranslation(pos, false);
            }
        }

        if (joystick.isPressed("fire")) {
            setAnimation("Idle_Shoot");
            if (isHost()) {
                if (Date.now() - lastShoot.current > FIRE_RATE) {
                    lastShoot.current = Date.now();
                    const newBullet: BulletData = {
                        id: state.id + "-" + +new Date(),
                        position: vec3(rigidBodyRef.current?.translation()),
                        angle,
                        player: state.id,
                    };
                    onFire(newBullet);
                }
            }
        }
    });

    if (typeof window === "undefined") {
        return <group></group>;
    }

    return (
        <group ref={groupRef} {...props}>
            {userPlayer && <CameraControls ref={controlsRef} />}
            <RigidBody
                ref={rigidBodyRef}
                colliders={false}
                linearDamping={12}
                lockRotations
                type={isHost() ? "dynamic" : "kinematicPosition"}
                onIntersectionEnter={({ other }) => {
                    if (
                        isHost() &&
                        (other.rigidBody?.userData as BulletUserData)?.type ===
                            "bullet" &&
                        state.getState("health") > 0
                    ) {
                        const newHealth =
                            state.getState("health") -
                            (other.rigidBody?.userData as BulletUserData)
                                .damage;
                        if (newHealth <= 0) {
                            state.setState(
                                "deaths",
                                state.getState("deaths") + 1
                            );
                            state.setState("dead", true);
                            state.setState("health", 0);
                            rigidBodyRef.current?.setEnabled(false);
                            setTimeout(() => {
                                spawnRandomly();
                                rigidBodyRef.current?.setEnabled(true);
                                state.setState("health", 100);
                                state.setState("dead", false);
                            }, 2000);
                            onKilled(
                                state.id,
                                (other.rigidBody?.userData as BulletUserData)
                                    .player
                            );
                        } else {
                            state.setState("health", newHealth);
                        }
                    }
                }}
            >
                {typeof window !== "undefined" && <PlayerInfo state={state} />}
                <group ref={characterRef}>
                    <CharacterSoldier
                        color={state.getProfile().color.hexString as string}
                        animation={animation}
                        weapon="AK"
                    />
                    {userPlayer && (
                        <Crosshair
                            position={[
                                WEAPON_OFFSET.x,
                                WEAPON_OFFSET.y,
                                WEAPON_OFFSET.z,
                            ]}
                        />
                    )}
                </group>
                <CapsuleCollider args={[0.7, 0.6]} position={[0, 1.28, 0]} />
            </RigidBody>
        </group>
    );
};

const Crosshair = (props: GroupProps) => {
    return (
        <group {...props}>
            <mesh position-z={1}>
                <boxGeometry args={[0.05, 0.05, 0.05]} />
                <meshBasicMaterial color="black" transparent opacity={0.9} />
            </mesh>
            <mesh position-z={2}>
                <boxGeometry args={[0.05, 0.05, 0.05]} />
                <meshBasicMaterial color="black" transparent opacity={0.85} />
            </mesh>
            <mesh position-z={3}>
                <boxGeometry args={[0.05, 0.05, 0.05]} />
                <meshBasicMaterial color="black" transparent opacity={0.8} />
            </mesh>

            <mesh position-z={4.5}>
                <boxGeometry args={[0.05, 0.05, 0.05]} />
                <meshBasicMaterial color="black" opacity={0.7} transparent />
            </mesh>

            <mesh position-z={6.5}>
                <boxGeometry args={[0.05, 0.05, 0.05]} />
                <meshBasicMaterial color="black" opacity={0.6} transparent />
            </mesh>

            <mesh position-z={9}>
                <boxGeometry args={[0.05, 0.05, 0.05]} />
                <meshBasicMaterial color="black" opacity={0.2} transparent />
            </mesh>
        </group>
    );
};
