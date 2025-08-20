import { ReactElement } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { red, green } from '@mui/material/colors';
import { ItemModel as ItemModel } from '@/models/listing/item-listing';
import { ItemModel as HistoryModel } from "@/models/history/item-history";
import { CustomTypography } from '@/utils/component_utils';
import { COLORS } from '@/theme/colors';
import { ItemSaleKind } from '@/store/useStore';

export const FormatPercentColor = ({
    value,
    type,
} : {
    value: number;
    type: ItemSaleKind;
}) => {
    if(type === 'buying' && value > 0){
        return <CustomTypography color={red[400]} variant="body2" component="div" fontWeight="bold">+{value}%</CustomTypography>
    }
    else if(type === 'buying' && value < 0){
        return <CustomTypography color={green[400]} variant="body2" component="div" fontWeight="bold">{value}%</CustomTypography>
    }
    else if(type === 'vending' && value > 0){
        return <CustomTypography color={green[400]} variant="body2" component="div" fontWeight="bold">+{value}%</CustomTypography>
    }
    else if(type === 'vending' && value < 0){
        return <CustomTypography color={red[400]} variant="body2" component="div" fontWeight="bold">{value}%</CustomTypography>
    }
    else {
        return <CustomTypography color={COLORS.third_background_text} variant="body2" component="div" fontWeight="bold">{value}%</CustomTypography>
    }
};

const ItemTooptip = ({
    data,
    type,
    children
}: {
    data: ItemModel | HistoryModel;
    type: ItemSaleKind;
    children: ReactElement;
}) => {
    return (
        <Tooltip
            followCursor
            slotProps={{
                tooltip: {
                    sx: {
                        backgroundColor: COLORS.second_background,
                        borderRadius: 2,
                    },
                },
            }}
            title={
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="start" >
                    <CustomTypography color={COLORS.third_background_text} variant="caption" component="div" fontWeight="bold">Summary for this item</CustomTypography>
                    <Box width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                        <CustomTypography color={COLORS.third_background_text} variant="caption" component="div">Average Sell Price:&nbsp;</CustomTypography>
                        <CustomTypography color={COLORS.third_background_text} variant="caption" component="div" fontWeight="bold">{data.averageSellPrice}&nbsp;</CustomTypography>
                        <FormatPercentColor value={data.avgSellPriceGrowth} type={type} />
                    </Box>
                    <Box width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                        <CustomTypography color={COLORS.third_background_text} variant="caption" component="div">Average Buy Price:&nbsp;</CustomTypography>
                        <CustomTypography color={COLORS.third_background_text} variant="caption" component="div" fontWeight="bold">{data.averageBuyPrice}&nbsp;</CustomTypography>
                        <FormatPercentColor value={data.avgBuyPriceGrowth} type={type} />
                    </Box>
                    <Box width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                        <CustomTypography color={COLORS.third_background_text} variant="caption" component="div">Min Price:&nbsp;</CustomTypography>
                        <CustomTypography color={COLORS.third_background_text} variant="caption" component="div" fontWeight="bold">{data.minPrice}&nbsp;</CustomTypography>
                    </Box>
                    <Box width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                        <CustomTypography color={COLORS.third_background_text} variant="caption" component="div">Max Price:&nbsp;</CustomTypography>
                        <CustomTypography color={COLORS.third_background_text} variant="caption" component="div" fontWeight="bold">{data.maxPrice}&nbsp;</CustomTypography>
                    </Box>
                    <Box width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                        <CustomTypography color={COLORS.third_background_text} variant="caption" component="div">Sold Units:&nbsp;</CustomTypography>
                        <CustomTypography color={COLORS.third_background_text} variant="caption" component="div" fontWeight="bold">{data.soldUnits}&nbsp;</CustomTypography>
                        <FormatPercentColor value={data.soldUnitsGrowth} type={type} />
                    </Box>
                    <Box width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="start">
                        <CustomTypography color={COLORS.third_background_text} variant="caption" component="div">Purchased Units:&nbsp;</CustomTypography>
                        <CustomTypography color={COLORS.third_background_text} variant="caption" component="div" fontWeight="bold">{data.purchasedUnits}&nbsp;</CustomTypography>
                        <FormatPercentColor value={data.purchasedUnitsGrowth} type={type} />
                    </Box>
                </Box>
            }
        >
            {children}
        </Tooltip>
    )
};

export default ItemTooptip;
