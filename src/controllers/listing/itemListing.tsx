'use client';

import {
    useEffect,
    useState
} from "react";
import { useStore, ItemSaleKind } from "@/store/useStore";
import ItemListingToModel, { ListingModel } from "@/models/listing/item-listing";

import GetItemListing from "@/services/listing/item-listing";

import ItemListingScreen from "@/screens/listing/itemListing";

export interface EndpointStatus {
    loading: boolean;
    error: boolean;
};

export type EndpointName = "getItemListing" | "";

export type ItemListingKind = "vending" | "buying";

export interface Model {
    itemListingData: ListingModel | undefined;
    lastUpdate: Date | undefined;
};

const ItemListingController = ({
    itemIdQuery,
}: {
    itemIdQuery: number;
}) => {
    const page = useStore((x) => x.page);
    const pageSize = useStore((x) => x.page_size);
    const server = useStore((x) => x.server);
    const saleKind = useStore((x) => x.item_sale_kind);
    const [model, setModel] = useState<Partial<Model>>();
    const [endpoints, setEndpoints] = useState<Partial<Record<EndpointName, EndpointStatus>>>();

    useEffect(() => {

        refreshAllData(itemIdQuery);
        const interval = setInterval(() => {
            refreshAllData(itemIdQuery);
        }, 180000);

        return () => clearInterval(interval);
    }, [itemIdQuery]);

    useEffect(() => {
        refreshAllData(itemIdQuery);
    }, [saleKind, server, page, pageSize]);

    const refreshAllData = async (itemId: number) => {
        if(itemId > 0 && server.length > 0){
            await loadItemListing(server, saleKind, page, pageSize, undefined, itemId);
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

    const loadItemListing = async (server: string, kind: ItemSaleKind, page: number, page_size: number, itemName?: string, itemId?: number) => {
        const statusEndpoint = buildStatusEndpoint("getItemListing");
        try {
            statusEndpoint.loading();
            const response = await GetItemListing(server, kind, page, page_size, itemName, itemId);
            const itemListingData = ItemListingToModel(response);
            updateModel({ itemListingData });
        } catch {
            statusEndpoint.error();
            updateModel({ itemListingData: undefined });
        } finally {
            statusEndpoint.done();
        }
    };

    return (
        <ItemListingScreen
            model={model}
            endpoints={endpoints}
            selectedToggleTable={saleKind}
        />
    )
}

export default ItemListingController;
