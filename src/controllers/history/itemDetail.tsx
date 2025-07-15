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
import ItemDetailToModel, {
    ItemListingHistoryModel
} from "@/models/history/item-detail";

import GetItemDetail from "@/services/history/item-detail";

import ItemDetailScreen from "@/screens/history/itemDetail";

export interface EndpointStatus {
    loading: boolean;
    error: boolean;
};

export type EndpointName = "getItemDetail" | "";

export interface Model {
    itemDetailData: ItemListingHistoryModel | undefined;
    lastUpdate: Date | undefined;
};

const ItemDetailController = ({
    itemIdQuery
}: {
    itemIdQuery: number;
}) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const searchServerRef = useRef<string>('');
    const toggleTableRef = useRef<string>('');
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
        const current = new URLSearchParams(searchParams.toString());
        const serverInput = searchParams.get('server');
        const tobbleTableInput = searchParams.get('t');
        const existing = current.get('q');

        if(existing !== null && existing.length > 0){
            router.push(`/history?q=${existing}`)
        }

        if(serverInput !== undefined && typeof serverInput === 'string'){
            searchServerRef.current = serverInput;
            refreshAllData(itemIdQuery);
        }

        if(tobbleTableInput !== undefined && typeof tobbleTableInput === 'string'){
            toggleTableRef.current = tobbleTableInput;
        }

    }, [searchParams, router]);

    const refreshAllData = async (itemId: number) => {
        if(itemId > 0 && searchServerRef.current.length > 0){
            await loadItemDetail(itemId, searchServerRef.current);
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

    const loadItemDetail = async (itemId: number, server: string) => {
        const statusEndpoint = buildStatusEndpoint("getItemDetail");
        try {
            statusEndpoint.loading();
            const response = await GetItemDetail(itemId, server);
            const itemDetailData = ItemDetailToModel(response);
            updateModel({ itemDetailData });
        } catch {
            statusEndpoint.error();
            updateModel({ itemDetailData: undefined });
        } finally {
            statusEndpoint.done();
        }
    };

    return (
        <ItemDetailScreen
            model={model}
            endpoints={endpoints}
            selectedToggleTable={toggleTableRef.current}
        />
    )
}

export default ItemDetailController;
