'use client';

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RoPDByIdController from "@/controllers/ropd/ropdById";

const RoPDPage = () => {
    const params = useParams();
    const router = useRouter();
    const [playerId, setPlayerId] = useState<number>(0);

    useEffect(() => {
        const queryId = params.id;
        if (queryId !== undefined && typeof queryId === 'string' && /^\d+$/.test(queryId)) {
            setPlayerId(Number(queryId));
        }
        else {
            router.replace("/ropd");
        }
    }, [params, router]);

    return (
        <RoPDByIdController accountIdQuery={playerId} />
    )
}

export default RoPDPage;
