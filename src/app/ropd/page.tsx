'use client';

import RoPDPlayersController from "@/controllers/ropd/ropdByName";
import { Suspense } from 'react';

const RoPDRootPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RoPDPlayersController />
        </Suspense>
    );
};

export default RoPDRootPage;
