'use client';

import {
    useEffect,
    useState
} from "react";
import {
    EndpointName,
    EndpointStatus,
    Model
} from '@/controllers/listing/itemListing';
import Box from "@mui/material/Box";
import ItemTable from "@/components/Tables/ListingTable/ListingTable";
import Loading from "@/components/Loading/Loading";
import ListingSearchBar from "@/components/SearchBar/ListingSearchBar";
import ServerSelector from "@/components/ServerSelector/ServerSelector";
import ToggleTable from "@/components/ToggleTable/ToggleTable";

const ItemListingScreen = ({
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
        if (endpoints !== undefined && endpoints.getItemListing !== undefined && endpoints.getItemListing.loading) {
            setIsLoading(true);
        }
        else {
            setIsLoading(false);
        }
    }, [endpoints]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden', py:2 , gap: 4 }}>
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
                    <ListingSearchBar />
                    <ServerSelector />
                </Box>
                <ToggleTable />
            </Box>
            {isLoading ? (
                <Loading />
            ) : (
                <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {selectedToggleTable === 'vending' ? (
                        <ItemTable title="Vending" data={model?.itemListingData} />
                    ) : selectedToggleTable === 'buying' ? (
                        <ItemTable title="Buying" data={model?.itemListingData} />
                    ) : (
                        <></>
                    )}
                </Box>
            )}
        </Box>
    )
};

export default ItemListingScreen;
