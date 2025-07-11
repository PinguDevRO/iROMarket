'use client';

import { useEffect, useState } from "react";
import {
    EndpointName,
    EndpointStatus,
    Model
} from '@/controllers/global/itemSummary';
import Box from "@mui/material/Box";
import SummaryTable from "@/components/Tables/SummaryTable/SummaryTable";
import Loading from "@/components/Loading/Loading";
import SearchBar from "@/components/SearchBar/SearchBar";
import ServerSelector from "@/components/ServerSelector/ServerSelector";
import ToggleTable from "@/components/ToggleTable/ToggleTable";

const ItemSummaryScreen = ({
    model,
    endpoints,
    searchQuery,
    selectedToggleTable,
}: {
    model: Partial<Model> | undefined;
    endpoints: Partial<Record<EndpointName, EndpointStatus>> | undefined;
    searchQuery: string;
    selectedToggleTable: string;
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (endpoints !== undefined && endpoints.getListingSummary !== undefined && endpoints.getListingSummary.loading) {
            setIsLoading(true);
        }
        else {
            setIsLoading(false);
        }
    }, [endpoints]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden', py: 2, gap: 4 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: { xs: 2, md: 4 },
                    minHeight: 0,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: { xs: 2, md: 4 },
                        width: '100%',
                    }}
                >
                    <SearchBar searchInput={searchQuery} />
                    <ServerSelector />
                </Box>
                <ToggleTable />
            </Box>
            {isLoading ? (
                <Loading />
            ) : (
                <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {selectedToggleTable === 'vending' ? (
                        <SummaryTable title="Vending" data={model?.listingSummaryData?.selling} />
                    ) : selectedToggleTable === 'buying' ? (
                        <SummaryTable title="Buying" data={model?.listingSummaryData?.buying} />
                    ) : (
                        <></>
                    )}
                </Box>
            )}
        </Box>
    )
};

export default ItemSummaryScreen;
