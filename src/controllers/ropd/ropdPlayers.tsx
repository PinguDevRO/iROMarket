"use client";

import { 
    useEffect,
    useRef,
    useState
} from "react";
import {
    useSearchParams
} from "next/navigation";
import RoPDByIdToModel, {
    PlayerDetailModel
} from "@/models/ropd/ropd-id";

import GetRoPDPlayers from "@/services/ropd/ropd-players";

import RoPDPlayersScreen from "@/screens/ropd/ropdPlayers";

export interface EndpointStatus {
    loading: boolean;
    error: boolean;
};

export type EndpointName = "getRoPDPlayers" | "";

export interface Model {
    playerListData: PlayerDetailModel[] | undefined;
    lastUpdate: Date | undefined;
};

const RoPDPlayersController = () => {
    const searchParams = useSearchParams();
    const searchQueryRef = useRef<string>('');
    const searchServerRef = useRef<string>('');
    const [model, setModel] = useState<Partial<Model>>();
    const [endpoints, setEndpoints] = useState<Partial<Record<EndpointName, EndpointStatus>>>();

    useEffect(() => {
        const queryInput = searchParams.get('q');
        const serverInput = searchParams.get('server');
        if(queryInput !== undefined && typeof queryInput === 'string'){
            searchQueryRef.current = queryInput;
        }

        if(serverInput !== undefined && typeof serverInput === 'string'){
            searchServerRef.current = serverInput;
        }

        if(searchServerRef.current.length > 0){
            handleOnSearch(searchServerRef.current, searchQueryRef.current);
        }
    }, [searchParams]);

    useEffect(() => {
        refreshAllData();
        const interval = setInterval(() => {
            refreshAllData();
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const refreshAllData = async () => {
        if(searchServerRef.current.length > 0){
            await loadRoPDPlayers(searchServerRef.current, searchQueryRef.current);
        }
    };

    const handleOnSearch = async (server: string, query: string): Promise<void> => {
        await loadRoPDPlayers(server, query);
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

    const loadRoPDPlayers = async (server: string, query: string) => {
        const statusEndpoint = buildStatusEndpoint("getRoPDPlayers");
        try {
            statusEndpoint.loading();
            const response = await GetRoPDPlayers(server, query);
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
        <RoPDPlayersScreen
            model={model}
            endpoints={endpoints}
            searchQuery={searchQueryRef.current}
        />
    )
}

export default RoPDPlayersController;
