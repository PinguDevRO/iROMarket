'use client';

import {
    useRouter,
    useSearchParams
} from 'next/navigation';
import {
    useEffect,
    useState
} from 'react';
import {
    EndpointName,
    EndpointStatus,
    Model
} from '@/controllers/global/marketSummary';
import { red, brown, green, grey, yellow, blue } from '@mui/material/colors';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Skeleton from '@mui/material/Skeleton';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import PaidIcon from '@mui/icons-material/Paid';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import StarsIcon from '@mui/icons-material/Stars';
import Loading from "@/components/Loading/Loading";
import { CustomTypography, ImgWrapper } from "@/utils/component_utils";
import { useTheme, useMediaQuery } from '@mui/material';
import { COLORS } from "@/theme/colors";


const MarketComponent = ({
    model,
    endpoints,
    isLoading,
    handleRedirectListing,
    handleRedirectRoPD,
}: {
    model: Partial<Model> | undefined;
    endpoints: Partial<Record<EndpointName, EndpointStatus>> | undefined;
    isLoading: boolean;
    handleRedirectListing(itemId: number): void;
    handleRedirectRoPD(accountId: number): void;
}) => {
    return (
        <Paper
            elevation={3}
            sx={{
                width: "100%",
                height: "100%",
                padding: 2,
                background: COLORS.third_background,
                borderRadius: 4,
                overflow: "auto",
            }}
        >
            {isLoading ? (
                <Loading />
            ) : (
                <Box sx={{ width: "100%" }}>
                    <Box width="100%" display="flex" alignItems="center" justifyContent="center">
                        <CustomTypography color={COLORS.third_background_text} gutterBottom variant="h5" component="div">
                            Market Summary
                        </CustomTypography>
                    </Box>
                    <Box key={'shop-summary'} width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" marginBottom={2}>
                        <Box key={'shop-summary-text'} display="flex" flexDirection="row" alignItems="center" gap={1}>
                            <LocalGroceryStoreIcon sx={{ color: grey[500] }} />
                            <CustomTypography color={COLORS.third_background_text} variant="subtitle1" component="div" sx={{ fontWeight: 700 }}>Shops</CustomTypography>
                        </Box>
                        {endpoints !== undefined && endpoints.getMarketSummary !== undefined && endpoints.getMarketSummary.loading ? (
                            <>
                                <Box key={'shop-summary-total'} width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                                    <Skeleton width="100%" animation="wave" />
                                </Box>
                                <Box key={'shop-summary-offline'} width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                                    <Skeleton width="100%" animation="wave" />
                                </Box>
                                <Box key={'shop-summary-online'} width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                                    <Skeleton width="100%" animation="wave" />
                                </Box>
                            </>
                        ) : (
                            model !== undefined && model.marketSummaryData !== undefined && (
                                <>
                                    <Box key={'shop-summary-online'} width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                                        <CustomTypography color={green[400]} variant="body2" component="div" sx={{ fontWeight: 700 }}>Online</CustomTypography>
                                        <CustomTypography color={green[400]} variant="body2" component="div" sx={{ fontWeight: 700 }}>{model.marketSummaryData.shops.online}</CustomTypography>
                                    </Box>
                                    <Box key={'shop-summary-offline'} width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                                        <CustomTypography color={red[200]} variant="body2" component="div" sx={{ fontWeight: 700 }}>Offline</CustomTypography>
                                        <CustomTypography color={red[200]} variant="body2" component="div" sx={{ fontWeight: 700 }}>{model.marketSummaryData.shops.offline}</CustomTypography>
                                    </Box>
                                    <Box key={'shop-summary-total'} width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                                        <CustomTypography color={blue[200]} variant="body2" component="div" sx={{ fontWeight: 700 }}>Total</CustomTypography>
                                        <CustomTypography color={blue[200]} variant="body2" component="div" sx={{ fontWeight: 700 }}>{model.marketSummaryData.shops.total}</CustomTypography>
                                    </Box>
                                </>
                            )
                        )}
                    </Box>
                    <Box key={'transaction-summary'} width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" marginBottom={2}>
                        <Box key={'shop-summary-text'} display="flex" flexDirection="row" alignItems="center" gap={1}>
                            <StackedLineChartIcon sx={{ color: green[500] }} />
                            <CustomTypography color={COLORS.third_background_text} variant="subtitle1" component="div" sx={{ fontWeight: 700 }}>Last 24h Transaction Volume</CustomTypography>
                        </Box>
                        {endpoints !== undefined && endpoints.getMarketSummary !== undefined && endpoints.getMarketSummary.loading ? (
                            <>
                                <Box key={'shop-summary-total'} width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                                    <Skeleton width="100%" animation="wave" />
                                </Box>
                                <Box key={'shop-summary-offline'} width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                                    <Skeleton width="100%" animation="wave" />
                                </Box>
                                <Box key={'shop-summary-online'} width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                                    <Skeleton width="100%" animation="wave" />
                                </Box>
                            </>
                        ) : (
                            model !== undefined && model.marketSummaryData !== undefined && (
                                <>
                                    <Box key={'transaction-summary-volume'} width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                                        <CustomTypography color={green[400]} variant="body2" component="div" sx={{ fontWeight: 700 }}>Total transaction volume</CustomTypography>
                                        <CustomTypography color={green[400]} variant="body2" component="div" sx={{ fontWeight: 700 }}>{model.marketSummaryData.transactions.transactionVolume}z</CustomTypography>
                                    </Box>
                                    <Box key={'transaction-summary-taxed'} width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                                        <CustomTypography color={red[200]} variant="body2" component="div" sx={{ fontWeight: 700 }}>Total Taxed zeny</CustomTypography>
                                        <CustomTypography color={red[200]} variant="body2" component="div" sx={{ fontWeight: 700 }}>{model.marketSummaryData.transactions.taxedVolume}z</CustomTypography>
                                    </Box>
                                    <Box key={'transaction-summary-quantity'} width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                                        <CustomTypography color={blue[200]} variant="body2" component="div" sx={{ fontWeight: 700 }}>Total items transacted</CustomTypography>
                                        <CustomTypography color={blue[200]} variant="body2" component="div" sx={{ fontWeight: 700 }}>{model.marketSummaryData.transactions.transactionQuantity}</CustomTypography>
                                    </Box>
                                </>
                            )
                        )}
                    </Box>
                    <Divider variant="fullWidth" component="div" sx={{ width: "100%", background: COLORS.third_background_text, marginBottom: 2 }} />
                    <Box key={'top-sold-summary'} width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" marginBottom={2}>
                        <Box key={'top-sold-summary-text'} display="flex" flexDirection="row" alignItems="center" gap={1}>
                            <PaidIcon sx={{ color: green[700] }} />
                            <CustomTypography color={COLORS.third_background_text} variant="subtitle1" component="div" sx={{ fontWeight: 700 }}>Top 5 Sold Items This Week</CustomTypography>
                        </Box>
                        {endpoints !== undefined && endpoints.getMarketSummary !== undefined && endpoints.getMarketSummary.loading ? (
                            <Box key={'top-sold-summary-list'} width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                                <Skeleton width="100%" animation="wave" />
                            </Box>
                        ) : (
                            <Box key={'top-sold-summary-list'} width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                                <List
                                    sx={{ p: 0 }}
                                >
                                    {model !== undefined && model.marketSummaryData !== undefined && model.marketSummaryData.topSoldItems.map((item, idx) => (
                                        <ListItem
                                            key={'top-sold-item-' + idx}
                                            disableGutters
                                            sx={{
                                                color: COLORS.third_background_text,
                                                py: 0.25,
                                                px: 0,
                                                gap: 1,
                                                alignItems: "center",
                                            }}
                                        >
                                            <ImgWrapper>
                                                <Image
                                                    className="dark"
                                                    src={`https://db.irowiki.org/image/item/${item.itemId}.png`}
                                                    alt={item.itemName}
                                                    width={24}
                                                    height={24}
                                                    style={{ objectFit: "contain" }}
                                                />
                                            </ImgWrapper>
                                            <CustomTypography
                                                color={COLORS.third_background_text}
                                                variant="body2"
                                                component="div"
                                                sx={{ display: 'flex', alignItems: 'center' }}
                                            >
                                                <Box>
                                                    <Box
                                                        component="span"
                                                        className="hover:underline cursor-pointer"
                                                        sx={{
                                                            color: COLORS.internal_link_text,
                                                            whiteSpace: 'nowrap',
                                                            display: 'inline-block',
                                                        }}
                                                        title={`${item.itemName} (${item.itemId})`}
                                                        onClick={() => handleRedirectListing(item.itemId)}
                                                    >
                                                        {item.itemName}
                                                    </Box>
                                                    <Box component="span" sx={{ display: 'block' }}>
                                                        {item.totalUnits} units in {item.transactionCount} transactions
                                                    </Box>
                                                </Box>

                                            </CustomTypography>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        )}
                    </Box>
                    <Divider variant="fullWidth" component="div" sx={{ width: "100%", background: COLORS.third_background_text, marginBottom: 2 }} />
                    <Box key={'top-bought-summary'} width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" marginBottom={2}>
                        <Box key={'top-bought-summary-text'} display="flex" flexDirection="row" alignItems="center" gap={1}>
                            <StorefrontIcon sx={{ color: red[300] }} />
                            <CustomTypography color={COLORS.third_background_text} variant="subtitle1" component="div" sx={{ fontWeight: 700 }}>Top 5 Bought Items This Week</CustomTypography>
                        </Box>
                        {endpoints !== undefined && endpoints.getMarketSummary !== undefined && endpoints.getMarketSummary.loading ? (
                            <Box key={'top-bought-summary-list'} width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                                <Skeleton width="100%" animation="wave" />
                            </Box>
                        ) : (
                            <Box key={'top-bought-summary-list'} width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                                <List
                                    sx={{ p: 0 }}
                                >
                                    {model !== undefined && model.marketSummaryData !== undefined && model.marketSummaryData.topBoughtItems.map((item, idx) => (
                                        <ListItem
                                            key={'top-bought-item-' + idx}
                                            disableGutters
                                            sx={{
                                                color: COLORS.third_background_text,
                                                py: 0.25,
                                                px: 0,
                                                gap: 1,
                                                alignItems: "center",
                                            }}
                                        >
                                            <ImgWrapper>
                                                <Image
                                                    className="dark"
                                                    src={`https://db.irowiki.org/image/item/${item.itemId}.png`}
                                                    alt={item.itemName}
                                                    width={24}
                                                    height={24}
                                                    style={{ objectFit: "contain" }}
                                                />
                                            </ImgWrapper>
                                            <CustomTypography
                                                color={COLORS.third_background_text}
                                                variant="body2"
                                                component="div"
                                                sx={{ display: 'flex', alignItems: 'center' }}
                                            >

                                                <Box>
                                                    <Box
                                                        component="span"
                                                        className="hover:underline cursor-pointer"
                                                        sx={{
                                                            color: COLORS.internal_link_text,
                                                            whiteSpace: 'nowrap',
                                                            display: 'inline-block',
                                                        }}
                                                        title={`${item.itemName} (${item.itemId})`}
                                                        onClick={() => handleRedirectListing(item.itemId)}
                                                    >
                                                        {item.itemName}
                                                    </Box>
                                                    <Box component="span" sx={{ display: 'block' }}>
                                                        {item.totalUnits} units in {item.transactionCount} transactions
                                                    </Box>
                                                </Box>
                                            </CustomTypography>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        )}
                    </Box>
                    <Divider variant="fullWidth" component="div" sx={{ width: "100%", background: COLORS.third_background_text, marginBottom: 2 }} />
                    <Box key={'top-listed-summary'} width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" marginBottom={2}>
                        <Box key={'top-listed-summary-text'} display="flex" flexDirection="row" alignItems="center" gap={1}>
                            <ReceiptLongIcon sx={{ color: brown[400] }} />
                            <CustomTypography color={COLORS.third_background_text} variant="subtitle1" component="div" sx={{ fontWeight: 700 }}>Top 5 Listed Items This Week</CustomTypography>
                        </Box>
                        {endpoints !== undefined && endpoints.getMarketSummary !== undefined && endpoints.getMarketSummary.loading ? (
                            <Box key={'top-listed-summary-list'} width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                                <Skeleton width="100%" animation="wave" />
                            </Box>
                        ) : (
                            <Box key={'top-listed-summary-list'} width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                                <List
                                    sx={{ p: 0 }}
                                >
                                    {model !== undefined && model.marketSummaryData !== undefined && model.marketSummaryData.topListedItems.map((item, idx) => (
                                        <ListItem
                                            key={'top-listed-item-' + idx}
                                            disableGutters
                                            sx={{
                                                color: COLORS.third_background_text,
                                                py: 0.25,
                                                px: 0,
                                                gap: 1,
                                                alignItems: "center",
                                            }}
                                        >
                                            <ImgWrapper>
                                                <Image
                                                    className="dark"
                                                    src={`https://db.irowiki.org/image/item/${item.itemId}.png`}
                                                    alt={item.itemName}
                                                    width={24}
                                                    height={24}
                                                    style={{ objectFit: "contain" }}
                                                />
                                            </ImgWrapper>
                                            <CustomTypography
                                                color={COLORS.third_background_text}
                                                variant="body2"
                                                component="div"
                                                sx={{ display: 'flex', alignItems: 'center' }}
                                            >

                                                <Box>
                                                    <Box
                                                        component="span"
                                                        className="hover:underline cursor-pointer"
                                                        sx={{
                                                            color: COLORS.internal_link_text,
                                                            whiteSpace: 'nowrap',
                                                            display: 'inline-block',
                                                        }}
                                                        title={`${item.itemName} (${item.itemId})`}
                                                        onClick={() => handleRedirectListing(item.itemId)}
                                                    >
                                                        {item.itemName}
                                                    </Box>
                                                    <Box component="span" sx={{ display: 'block' }}>
                                                        {item.totalUnits} units listed {item.transactionCount} times
                                                    </Box>
                                                </Box>
                                            </CustomTypography>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        )}
                    </Box>
                    <Divider variant="fullWidth" component="div" sx={{ width: "100%", background: COLORS.third_background_text, marginBottom: 2 }} />
                    <Box key={'top-earner-summary'} width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <Box key={'top-earner-summary-text'} display="flex" flexDirection="row" alignItems="center" gap={1}>
                            <StarsIcon sx={{ color: yellow[500] }} />
                            <CustomTypography color={COLORS.third_background_text} variant="subtitle1" component="div" sx={{ fontWeight: 700 }}>Top 5 Earner This Week</CustomTypography>
                        </Box>
                        {endpoints !== undefined && endpoints.getMarketSummary !== undefined && endpoints.getMarketSummary.loading ? (
                            <Box key={'top-earner-summary-list'} width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                                <Skeleton width="100%" animation="wave" />
                            </Box>
                        ) : (
                            <Box key={'top-earner-summary-list'} width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                                <List
                                    sx={{ p: 0 }}
                                >
                                    {model !== undefined && model.marketSummaryData !== undefined && model.marketSummaryData.topEarners.map((player, idx) => (
                                        <ListItem
                                            key={'top-earner-item-' + idx}
                                            disableGutters
                                            sx={{
                                                color: COLORS.third_background_text,
                                                py: 0.25,
                                                px: 0,
                                                alignItems: "center",
                                            }}
                                        >
                                            <ListItemIcon sx={{ minWidth: 20, mt: 0.2 }}>
                                                <FiberManualRecordIcon sx={{ color: COLORS.third_background_text, fontSize: '0.5em' }} />
                                            </ListItemIcon>
                                            <CustomTypography
                                                color={COLORS.third_background_text}
                                                variant="body2"
                                                component="div"
                                                sx={{ display: 'flex', alignItems: 'center' }}
                                            >

                                                <Box>
                                                    <Box
                                                        component="span"
                                                        className="hover:underline cursor-pointer"
                                                        sx={{
                                                            color: COLORS.internal_link_text,
                                                            whiteSpace: 'nowrap',
                                                            display: 'inline-block',
                                                        }}
                                                        title={`${player.playerName} (${player.accountId})`}
                                                        onClick={() => handleRedirectRoPD(player.accountId)}
                                                    >
                                                        {player.playerName}
                                                    </Box>
                                                    <Box component="span" sx={{ display: 'block' }}>
                                                        Earned {player.earnings}z
                                                    </Box>
                                                </Box>
                                            </CustomTypography>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        )}
                    </Box>
                </Box>
            )}
        </Paper>
    )
}

const MarketSummary = ({
    model,
    endpoints
}: {
    model: Partial<Model> | undefined;
    endpoints: Partial<Record<EndpointName, EndpointStatus>> | undefined;
}) => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (endpoints?.getMarketSummary?.loading) {
            setIsLoading(true);
        }
        else {
            setIsLoading(false);
        }
    }, [endpoints]);

    const redirectToListing = (itemId: number) => {
        router.push(`/listing/${itemId}?${params.toString()}`);
    };

    const redirectToROPD = (accountId: number) => {
        router.push(`/ropd/${accountId}?${params.toString()}`);
    };

    return (
        isMobile ? (
            <Accordion
                disableGutters
                sx={{
                    display: { xs: 'flex', md: 'none' },
                    flexDirection: "column",
                    background: COLORS.second_background,
                    color: COLORS.third_background_text,
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: COLORS.third_background_text }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <CustomTypography component="span">Market Summary</CustomTypography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        maxHeight: 'calc(100vh - 30em)',
                        overflowY: 'auto',
                        p: 0,
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            background: COLORS.third_background
                        }}
                    >
                        <MarketComponent
                            model={model}
                            endpoints={endpoints}
                            isLoading={isLoading}
                            handleRedirectListing={redirectToListing}
                            handleRedirectRoPD={redirectToROPD}
                        />
                    </Paper>
                </AccordionDetails>
            </Accordion>
        ) : (
            <Paper
                elevation={3}
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 0,
                    padding: 2,
                    borderRadius: 4,
                    overflow: "hidden",
                    background: COLORS.second_background,
                    height: "100%",
                }}
            >
                <MarketComponent
                    model={model}
                    endpoints={endpoints}
                    isLoading={isLoading}
                    handleRedirectListing={redirectToListing}
                    handleRedirectRoPD={redirectToROPD}
                />
            </Paper>
        )
    )
}

export default MarketSummary;