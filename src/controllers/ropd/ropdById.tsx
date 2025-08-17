"use client";

import {
    useEffect,
    useState
} from "react";
import { useStore } from "@/store/useStore";
import ROPDToModel, { ROPDModel } from "@/models/ropd/ropd";

import GetRoPD from "@/services/ropd/ropd";

import RoPDByIdScreen from "@/screens/ropd/ropdById";

export interface EndpointStatus {
    loading: boolean;
    error: boolean;
};

export type EndpointName = "getPlayerData" | "";

export interface Model {
    ropdData: ROPDModel | undefined;
    lastUpdate: Date | undefined;
};

const RoPDByIdController = ({
    accountIdQuery
}: {
    accountIdQuery: number;
}) => {
    const page = useStore((x) => x.page);
    const pageSize = useStore((x) => x.page_size);
    const server = useStore((x) => x.server);
    const [model, setModel] = useState<Partial<Model>>();
    const [endpoints, setEndpoints] = useState<Partial<Record<EndpointName, EndpointStatus>>>();

    useEffect(() => {
        refreshAllData(accountIdQuery);
    }, [accountIdQuery]);

    const refreshAllData = async (accountId: number) => {
        if (accountId > 0) {
            await loadROPD(server, page, pageSize, undefined, accountId);
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
        <RoPDByIdScreen
            model={model}
            endpoints={endpoints}
        />
    )
}

export default RoPDByIdController;
