'use client';

import {
    useEffect,
    useState
} from "react";
import {
    EndpointName,
    EndpointStatus,
    Model
} from '@/controllers/history/itemDetail';
import Box from "@mui/material/Box";
import HistoryTable from "@/components/Tables/historyTable/HistoryTable";
import Loading from "@/components/Loading/Loading";
import SearchBar from "@/components/SearchBar/SearchBar";
import ServerSelector from "@/components/ServerSelector/ServerSelector";
import ToggleTable from "@/components/ToggleTable/ToggleTable";

const ItemDetailScreen = ({
    model,
    endpoints,
    selectedToggleTable,
}: {
    model: Partial<Model> | undefined;
    endpoints: Partial<Record<EndpointName, EndpointStatus>> | undefined;
    selectedToggleTable: string;
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (endpoints !== undefined && endpoints.getItemDetail !== undefined && endpoints.getItemDetail.loading) {
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
                    <SearchBar />
                    <ServerSelector />
                </Box>
                <ToggleTable />
            </Box>
            {isLoading ? (
                <Loading />
            ) : (
                <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {selectedToggleTable === 'vending' ? (
                        <HistoryTable title="Vending History" data={model?.itemDetailData?.selling} />
                    ) : selectedToggleTable === 'buying' ? (
                        <HistoryTable title="Buying History" data={model?.itemDetailData?.buying} />
                    ) : (
                        <></>
                    )}
                </Box>
            )}
        </Box>
    )
};

export default ItemDetailScreen;
