"use client";
import { PlayerState } from "playroomkit";
import dynamic from "next/dynamic";
// import { Text } from "@react-three/drei";
const Text = dynamic(
    () => import("@react-three/drei").then((mod) => mod.Text),
    {
        ssr: false,
    }
);
const Billboard = dynamic(
    () => import("@react-three/drei").then((mod) => mod.Billboard),
    {
        ssr: false,
    }
);

export default function PlayerInfo({ state }: { state: PlayerState }) {
    const health = state.getState("health");
    const name = state.getProfile().name;
    return (
        <Billboard position-y={2.5}>
            <Text position-y={0.36} fontSize={0.4}>
                {name}
                <meshBasicMaterial
                    color={state.getProfile().color.hexString as string}
                />
            </Text>
            <mesh position-z={-0.1}>
                <planeGeometry args={[1, 0.2]} />
                <meshBasicMaterial color="black" transparent opacity={0.5} />
            </mesh>
            <mesh scale-x={health / 100} position-x={-0.5 * (1 - health / 100)}>
                <planeGeometry args={[1, 0.2]} />
                <meshBasicMaterial color="red" />
            </mesh>
        </Billboard>
    );
}
