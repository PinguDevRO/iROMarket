'use client';

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ItemDetailController from "@/controllers/history/itemDetail";

const HistoryPage = () => {
    const params = useParams();
    const router = useRouter();
    const [itemId, setItemId] = useState<number>(0);

    useEffect(() => {
        const queryId = params.id;
        if (queryId !== undefined && typeof queryId === 'string' && /^\d+$/.test(queryId)) {
            setItemId(Number(queryId));
        }
        else {
            router.replace("/history");
        }
    }, [params, router]);

    return (
        <ItemDetailController itemIdQuery={itemId} />
    )
}

export default HistoryPage;
