"use client";

import { 
    useEffect,
    useState
} from "react";
import { useStore, ItemSaleKind } from "@/store/useStore";
import ItemHistoryToModel, { ListingModel } from "@/models/history/item-history";

import GetItemHistory from "@/services/history/item-history";

import ItemHistoryScreen from "@/screens/history/ItemHistory";

export interface EndpointStatus {
    loading: boolean;
    error: boolean;
};

export type EndpointName = "getItemHistory" | "";

export interface Model {
    itemHistoryData: ListingModel | undefined;
    lastUpdate: Date | undefined;
};

const ItemHistoryController = () => {
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
        }, 180000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        refreshAllData();
    }, [saleKind, server, page, pageSize, searchQuery]);

    const refreshAllData = async () => {
        await loadItemHistory(server, saleKind, page, pageSize, searchQuery, undefined);
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

    const loadItemHistory = async (server: string, kind: ItemSaleKind, page: number, page_size: number, itemName?: string, itemId?: number) => {
        const statusEndpoint = buildStatusEndpoint("getItemHistory");
        try {
            statusEndpoint.loading();
            const response = await GetItemHistory(server, kind, page, page_size, itemName, itemId);
            const itemHistoryData = ItemHistoryToModel(response);
            updateModel({ itemHistoryData });
        } catch {
            statusEndpoint.error();
            updateModel({ itemHistoryData: undefined });
        } finally {
            statusEndpoint.done();
        }
    };

    return (
        <ItemHistoryScreen
            model={model}
            endpoints={endpoints}
            searchQuery={searchQuery}
            selectedToggleTable={saleKind}
        />
    )
}

export default ItemHistoryController;
