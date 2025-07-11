'use client';

import { ReactNode } from "react";

function AppLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    )
};

export default AppLayout;
