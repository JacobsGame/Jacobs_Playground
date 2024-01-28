import { MyBar } from "@/components/MyBar";
import { Stack } from "@mui/material";
import React from "react";

export const App = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div>
            <MyBar />
            {children}
        </div>
    );
};
