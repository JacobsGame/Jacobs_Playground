import { MyBar } from "@/components/MyBar";
import React from "react";

export const App = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="flex flex-col w-full h-full">
            <MyBar />
            {children}
        </div>
    );
};
