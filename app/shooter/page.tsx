import { ShooterScene } from "@/components/game/scenes/ShooterScene";

export default function ShooterPage() {
    return (
        <div className="flex justify-center items-center">
            {typeof window !== undefined && <ShooterScene />}
        </div>
    );
}
