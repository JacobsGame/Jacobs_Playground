"use client";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";
import {
    Environment,
    Loader,
    OrbitControls,
    SoftShadows,
} from "@react-three/drei";
import { Map } from "@/components/shooterComponents/Map";
import {
    onPlayerJoin,
    insertCoin,
    isHost,
    myPlayer,
    Joystick,
    PlayerState,
    useMultiplayerState,
} from "playroomkit";
import { CharacterController } from "@/components/shooterComponents/CharacterController";
import { Physics } from "@react-three/rapier";
import { Bullet, BulletData } from "@/components/shooterComponents/Bullet";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Leaderboard } from "@/components/shooterComponents/Leaderboard";

interface PlayerProps {
    state: PlayerState;
    joystick: Joystick;
}

export const ShooterScene = () => {
    return (
        <>
            <Loader />
            <Leaderboard />
            <Canvas
                shadows
                camera={{
                    position: [0, 30, 0],
                    fov: 30,
                    near: 2,
                }}
                style={{
                    width: "100vw",
                    height: "calc(100vh - 50px)",
                }}
            >
                <SoftShadows size={42} />
                <Suspense>
                    <Physics>
                        <Experience />
                    </Physics>
                </Suspense>
                <EffectComposer disableNormalPass>
                    <Bloom luminanceThreshold={1} intensity={1.5} mipmapBlur />
                </EffectComposer>
            </Canvas>
        </>
    );
};

const Experience = () => {
    const [players, setPlayers] = useState<PlayerProps[]>([]);
    const [bullets, setBullets] = useState<BulletData[]>([]);
    const [networkBullets, setNetworkBullets] = useMultiplayerState(
        "bullets",
        []
    ); // useState<BulletData[]>([]);
    const start = async () => {
        await insertCoin();
    };

    useEffect(() => {
        setNetworkBullets(bullets);
    }, [bullets]);

    const onFire = (bullet: BulletData) => {
        setBullets((bullets) => [...bullets, bullet]);
    };

    const onKilled = (_victim: string, killer: string) => {
        const killerState = players.find(
            (p) => p.state.getState("id") === killer
        )?.state;
        killerState?.setState("kills", killerState.getState("kills") + 1);
    };

    const onHit = (bulletId: string) => {
        // setBullets((bullets) => bullets.filter((b) => b.id !== bulletId));
    };

    useEffect(() => {
        start();

        onPlayerJoin((state) => {
            const joystick = new Joystick(state, {
                type: "angular",
                buttons: [{ id: "fire", label: "Fire" }],
            });
            const newPlayer = { state, joystick };
            state.setState("health", 100);
            state.setState("deaths", 0);
            state.setState("kills", 0);
            setPlayers((players) => [...players, newPlayer]);
            state.onQuit(() => {
                setPlayers((players) =>
                    players.filter((p) => p.state.id !== state.id)
                );
            });
        });
    }, []);
    return (
        <>
            <directionalLight
                position={[25, 18, -25]}
                intensity={1.5}
                castShadow
                shadow-camera-near={0}
                shadow-camera-far={80}
                shadow-camera-left={-30}
                shadow-camera-right={30}
                shadow-camera-top={25}
                shadow-camera-bottom={-25}
                shadow-mapSize-width={4096}
                shadow-mapSize-height={4096}
                shadow-bias={-0.0001}
            />
            <Environment preset="sunset" />
            <color attach={"background"} args={["#242424"]} />
            <Map />
            {typeof window !== undefined &&
                players.map(({ state, joystick }, idx) => (
                    <CharacterController
                        key={state.id}
                        position-x={idx * 2}
                        state={state}
                        joystick={joystick}
                        userPlayer={state.id === myPlayer()?.id}
                        onFire={onFire}
                        onKilled={onKilled}
                    />
                ))}
            {(isHost() ? bullets : (networkBullets as BulletData[])).map(
                (bullet) => (
                    <Bullet
                        key={bullet.id}
                        {...bullet}
                        onHit={() => onHit(bullet.id)}
                    />
                )
            )}
            {/* <OrbitControls /> */}
        </>
    );
};