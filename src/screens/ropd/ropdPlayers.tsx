'use client';

import {
    useEffect,
    useState
} from "react";
import {
    EndpointName,
    EndpointStatus,
    Model
} from '@/controllers/ropd/ropdByName';
import Box from "@mui/material/Box";
import RoPDTable from "@/components/Tables/RoPDTable/RoPDTable";
import Loading from "@/components/Loading/Loading";
import RopdSearchBar from "@/components/SearchBar/RopdSearchBar";
import ServerSelector from "@/components/ServerSelector/ServerSelector";

const RoPDPlayersScreen = ({
    model,
    endpoints,
    searchQuery,
}: {
    model: Partial<Model> | undefined;
    endpoints: Partial<Record<EndpointName, EndpointStatus>> | undefined;
    searchQuery: string;
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (endpoints !== undefined && endpoints.getPlayerData !== undefined && endpoints.getPlayerData.loading) {
            setIsLoading(true);
        }
        else {
            setIsLoading(false);
        }
    }, [endpoints]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden', py: 2, gap: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: { xs: 2, md: 4 }, minHeight: 0 }}>
                <RopdSearchBar searchInput={searchQuery} />
                <ServerSelector />
            </Box>
            {isLoading ? (
                <Loading />
            ) : (
                <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <RoPDTable title="Player List" data={model?.ropdData} />
                </Box>
            )}
        </Box>
    )
};

export default RoPDPlayersScreen;
