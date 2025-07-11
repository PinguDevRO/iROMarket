"use client";

import {
    useEffect,
    useRef,
    useState
} from "react";
import {
    useRouter,
    useSearchParams
} from "next/navigation";
import RoPDByIdToModel, {
    PlayerDetailModel
} from "@/models/ropd/ropd-id";

import GetRoPDByAccountId from "@/services/ropd/ropd-id";

import RoPDByIdScreen from "@/screens/ropd/ropdById";

export interface EndpointStatus {
    loading: boolean;
    error: boolean;
};

export type EndpointName = "getPlayerById" | "";

export interface Model {
    playerListData: PlayerDetailModel[] | undefined;
    lastUpdate: Date | undefined;
};

const RoPDByIdController = ({
    accountIdQuery
}: {
    accountIdQuery: number;
}) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const searchServerRef = useRef<string>('');
    const [model, setModel] = useState<Partial<Model>>();
    const [endpoints, setEndpoints] = useState<Partial<Record<EndpointName, EndpointStatus>>>();

    useEffect(() => {
        const current = new URLSearchParams(searchParams.toString());
        const serverInput = searchParams.get('server');
        const existing = current.get('q');

        if(existing !== null && existing.length > 0){
            router.push(`/ropd?q=${existing}`)
        }

        if(serverInput !== undefined && typeof serverInput === 'string'){
            searchServerRef.current = serverInput;
            refreshAllData(accountIdQuery);
        }

    }, [searchParams, router]);

    const refreshAllData = async (accountId: number) => {
        if(accountId > 0 && searchServerRef.current.length > 0){
            await loadPlayerById(accountId, searchServerRef.current);
        }
    };

    const updateModel = (partialModel: | Partial<Model> | ((model: Partial<Model> | undefined) => Partial<Model>)) => {
        setModel((prev) => {
            const newModel = typeof partialModel === "function" ? partialModel(prev) : partialModel;
            return {
                ...prev,
                lastUpdate: new Date(),
                ...newModel,
            };
        });
    };

    const setEndpointStatus = (
        endpoint: EndpointName,
        status: Partial<EndpointStatus>
    ) => {
        setEndpoints((prev) => ({
            ...prev,
            [endpoint]: { ...prev?.[endpoint], ...status },
        }));
    };

    const buildStatusEndpoint = (name: EndpointName) => ({
        loading() {
            setEndpointStatus(name, {
                loading: true,
                error: false,
            });
        },
        error() {
            setEndpointStatus(name, {
                loading: false,
                error: true,
            });
        },
        done() {
            setEndpointStatus(name, { loading: false });
        },
    });

    const loadPlayerById = async (accountId: number, server: string) => {
        const statusEndpoint = buildStatusEndpoint("getPlayerById");
        try {
            statusEndpoint.loading();
            const response = await GetRoPDByAccountId(accountId, server);
            const playerListData = RoPDByIdToModel(response);
            updateModel({ playerListData });
        } catch {
            statusEndpoint.error();
            updateModel({ playerListData: undefined });
        } finally {
            statusEndpoint.done();
        }
    };

    return (
        <RoPDByIdScreen
            model={model}
            endpoints={endpoints}
        />
    )
}

export default RoPDByIdController;
