'use client';

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ItemListingController from "@/controllers/listing/itemListing";

const ListingPage = () => {
    const params = useParams();
    const router = useRouter();
    const [itemId, setItemId] = useState<number>(0);

    useEffect(() => {
        const queryId = params.id;
        if (queryId !== undefined && typeof queryId === 'string' && /^\d+$/.test(queryId)) {
            setItemId(Number(queryId));
        }
        else {
            router.replace("/");
        }
    }, [params, router]);

    return (
        <ItemListingController itemIdQuery={itemId} />
    )
}

export default ListingPage;
