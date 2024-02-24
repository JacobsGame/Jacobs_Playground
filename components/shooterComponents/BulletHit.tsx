import { useRef, useEffect, useMemo } from "react";
import { Instance, InstanceProps, Instances } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Vector3, Color } from "three";
import { isHost } from "playroomkit";

const bulletHitcolor = new Color("red");
bulletHitcolor.multiplyScalar(12);

interface AnimatedBoxProps {
    scale: number;
    target: Vector3;
    speed: number;
}

const AnimatedBox: React.FC<AnimatedBoxProps> = ({ scale, target, speed }) => {
    const ref = useRef<any>();

    useFrame((_, delta) => {
        if (ref.current.scale.x > 0) {
            ref.current.scale.x =
                ref.current.scale.y =
                ref.current.scale.z -=
                    speed * delta;
        }
        ref.current.position.lerp(target, speed);
    });

    return <Instance ref={ref} scale={scale} position={[0, 0, 0]} />;
};

interface BulletHitProps {
    nb?: number;
    position: Vector3;
    onEnded: () => void;
}

export const BulletHit: React.FC<BulletHitProps> = ({
    nb = 100,
    position,
    onEnded,
}) => {
    const boxes = useMemo(
        () =>
            Array.from({ length: nb }, () => ({
                target: new Vector3(
                    MathUtils.randFloat(-0.6, 0.6),
                    MathUtils.randFloat(-0.6, 0.6),
                    MathUtils.randFloat(-0.6, 0.6)
                ),
                scale: 0.1,
                speed: MathUtils.randFloat(0.1, 0.3),
            })),
        [nb]
    );

    useEffect(() => {
        setTimeout(() => {
            if (isHost()) {
                onEnded();
            }
        }, 500);
    }, [onEnded]);

    return (
        <group position={[position.x, position.y, position.z]}>
            <Instances>
                <boxGeometry />
                <meshStandardMaterial
                    toneMapped={false}
                    color={bulletHitcolor}
                />
                {boxes.map((box, i) => (
                    <AnimatedBox key={i} {...box} />
                ))}
            </Instances>
        </group>
    );
};
