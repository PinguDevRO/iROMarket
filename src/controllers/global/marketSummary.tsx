"use client";

import { useEffect, useState } from "react";
import MarketSummaryToModel, { MarketSummaryModel } from "@/models/global/market-summary";

import GetMarketSummary from "@/services/global/market-summary";

import MarketSummary from "@/components/MarketSummary/MarketSummary";

export interface EndpointStatus {
    loading: boolean;
    error: boolean;
};

export type EndpointName = "getMarketSummary" | "";

export interface Model {
    marketSummaryData: MarketSummaryModel | undefined;
    lastUpdate: Date | undefined;
};

const MarketSummaryController = () => {

    const [model, setModel] = useState<Partial<Model>>();
    const [endpoints, setEndpoints] = useState<Partial<Record<EndpointName, EndpointStatus>>>();

    useEffect(() => {
        refreshAllData();
        const interval = setInterval(() => {
            refreshAllData();
        }, 300000);

        return () => clearInterval(interval);
    }, []);

    const refreshAllData = async () => {
        await loadMarketSummary();
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

    const loadMarketSummary = async () => {
        const statusEndpoint = buildStatusEndpoint("getMarketSummary");
        try {
            statusEndpoint.loading();
            const response = await GetMarketSummary();
            const marketSummaryData = MarketSummaryToModel(response);
            updateModel({ marketSummaryData });
        } catch {
            statusEndpoint.error();
            updateModel({ marketSummaryData: undefined });
        } finally {
            statusEndpoint.done();
        }
    };

    return (
        <MarketSummary
            model={model}
            endpoints={endpoints}
        />
    )
}

export default MarketSummaryController;
