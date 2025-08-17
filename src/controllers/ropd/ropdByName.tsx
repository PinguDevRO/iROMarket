"use client";

import { 
    useEffect,
    useState
} from "react";
import { useStore } from "@/store/useStore";
import ROPDToModel, { ROPDModel } from "@/models/ropd/ropd";

import GetRoPD from "@/services/ropd/ropd";

import RoPDPlayersScreen from "@/screens/ropd/ropdPlayers";

export interface EndpointStatus {
    loading: boolean;
    error: boolean;
};

export type EndpointName = "getPlayerData" | "";

export interface Model {
    ropdData: ROPDModel | undefined;
    lastUpdate: Date | undefined;
};

const RoPDPlayersController = () => {
    const page = useStore((x) => x.page);
    const pageSize = useStore((x) => x.page_size);
    const server = useStore((x) => x.server);
    const saleKind = useStore((x) => x.item_sale_kind);
    const searchQuery = useStore((x) => x.search_query);
    const [model, setModel] = useState<Partial<Model>>();
    const [endpoints, setEndpoints] = useState<Partial<Record<EndpointName, EndpointStatus>>>();

    useEffect(() => {
        refreshAllData();
        const interval = setInterval(() => {
            refreshAllData();
        }, 600000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        refreshAllData();
    }, [saleKind, server, page, pageSize, searchQuery]);

    const refreshAllData = async () => {
        await loadROPD(server, page, pageSize, searchQuery, undefined);
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

    const loadROPD = async (server: string, page: number, page_size: number, playerName?: string, accountId?: number) => {
        const statusEndpoint = buildStatusEndpoint("getPlayerData");
        try {
            statusEndpoint.loading();
            const response = await GetRoPD(server, page, page_size, playerName, accountId);
            const ropdData = ROPDToModel(response);
            updateModel({ ropdData });
        } catch {
            statusEndpoint.error();
            updateModel({ ropdData: undefined });
        } finally {
            statusEndpoint.done();
        }
    };

    return (
        <RoPDPlayersScreen
            model={model}
            endpoints={endpoints}
            searchQuery={searchQuery}
        />
    )
}

export default RoPDPlayersController;
