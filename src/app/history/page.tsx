'use client';

import ItemHistoryController from "@/controllers/history/itemHistory";
import { Suspense } from 'react';

const HistoryRootPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ItemHistoryController />
        </Suspense>
    )
};

export default HistoryRootPage;
