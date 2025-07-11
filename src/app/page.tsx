'use client';

import ItemSummaryController from "@/controllers/global/itemSummary";
import { Skeleton } from "@mui/material";
import { Suspense } from 'react';

const RootPage = () => {
    return (
        <Suspense fallback={<Skeleton width="100%" animation="wave" variant="rounded" />}>
            <ItemSummaryController />
        </Suspense>
    )
};

export default RootPage;
