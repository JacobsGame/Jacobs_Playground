import { MyBar } from "@/components/MyBar";
import React from "react";

export const App = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <MyBar />
            {children}
        </>
    );
};
