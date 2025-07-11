"use client";

import { 
    useEffect,
    useRef,
    useState
} from "react";
import {
    useSearchParams
} from "next/navigation";
import ListingSummaryToModel, { ListingSummaryModel } from "@/models/global/listing-summary";

import GetListingSummary from "@/services/global/listing-summary";

import ItemSummaryScreen from "@/screens/global/ItemSummary";

export interface EndpointStatus {
    loading: boolean;
    error: boolean;
};

export type EndpointName = "getListingSummary" | "";

export interface Model {
    listingSummaryData: ListingSummaryModel | undefined;
    lastUpdate: Date | undefined;
};

const ItemSummaryController = () => {
    const searchParams = useSearchParams();
    const searchQueryRef = useRef<string>('');
    const searchServerRef = useRef<string>('');
    const toggleTableRef = useRef<string>('');
    const [model, setModel] = useState<Partial<Model>>();
    const [endpoints, setEndpoints] = useState<Partial<Record<EndpointName, EndpointStatus>>>();

    useEffect(() => {
        const queryInput = searchParams.get('q');
        const tobbleTableInput = searchParams.get('t');
        const serverInput = searchParams.get('server');
        if(queryInput !== undefined && typeof queryInput === 'string'){
            searchQueryRef.current = queryInput;
        }

        if(tobbleTableInput !== undefined && typeof tobbleTableInput === 'string'){
            toggleTableRef.current = tobbleTableInput;
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
            await loadListingSummary(searchServerRef.current, searchQueryRef.current);
        }
    };

    const handleOnSearch = async (server: string, query: string): Promise<void> => {
        await loadListingSummary(server, query);
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

    const loadListingSummary = async (server: string, query: string) => {
        const statusEndpoint = buildStatusEndpoint("getListingSummary");
        try {
            statusEndpoint.loading();
            const response = await GetListingSummary(server, query);
            const listingSummaryData = ListingSummaryToModel(response);
            updateModel({ listingSummaryData });
        } catch {
            statusEndpoint.error();
            updateModel({ listingSummaryData: undefined });
        } finally {
            statusEndpoint.done();
        }
    };

    return (
        <ItemSummaryScreen
            model={model}
            endpoints={endpoints}
            searchQuery={searchQueryRef.current}
            selectedToggleTable={toggleTableRef.current}
        />
    )
}

export default ItemSummaryController;
