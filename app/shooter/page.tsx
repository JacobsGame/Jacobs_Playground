import dynamic from "next/dynamic";

const ShooterScene = dynamic(
    () => import("../../components/game/scenes/ShooterScene"),
    {
        ssr: false,
    }
);

export default function ShooterPage() {
    return (
        <div className="flex justify-center items-center">
            <ShooterScene />
        </div>
    );
}
