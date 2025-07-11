import { GetMarketSummaryResponse } from "@/services/global/market-summary";
import { numberToUSMoney } from "@/utils/string_utils";

export interface TopItemModel {
    itemId: number;
    itemName: string;
    transactionVolume: string;
    transactionQuantity: string;
};

export interface TopEarnModel {
    playerId: number;
    playerName: string;
    transactionMoney: string;
};

export interface MarketSummaryModel {
    totalShops: number;
    offlineShops: number;
    onlineShops: number;
    totalTransactionMoney: string;
    totalTransactionQuantity: string;
    totalTransactionTax: string;
    topSoldItems: TopItemModel[];
    topBoughtItems: TopItemModel[];
    topListedItems: TopItemModel[];
    topEarners: TopEarnModel[];
};

const MarketSummaryToModel = (data: GetMarketSummaryResponse): MarketSummaryModel => {
    const topSoldItems: TopItemModel[] = data.top_sold_items.map((x) => { return { itemId: x.item_id, itemName: x.item_name, transactionVolume: numberToUSMoney(x.transaction_volume), transactionQuantity: numberToUSMoney(x.transaction_quantity) } });
    const topBoughtItems: TopItemModel[] = data.top_bought_items.map((x) => { return { itemId: x.item_id, itemName: x.item_name, transactionVolume: numberToUSMoney(x.transaction_volume), transactionQuantity: numberToUSMoney(x.transaction_quantity) } });
    const topListedItems: TopItemModel[] = data.top_listed_items.map((x) => { return { itemId: x.item_id, itemName: x.item_name, transactionVolume: numberToUSMoney(x.transaction_volume), transactionQuantity: numberToUSMoney(x.transaction_quantity) } });
    const topEarners: TopEarnModel[] = data.top_earners.map((x) => { return { playerId: x.player_id, playerName: x.player_name, transactionMoney: numberToUSMoney(x.transaction_money) } });

    const output: MarketSummaryModel = {
        totalShops: data.offline_shops + data.online_shops,
        offlineShops: data.offline_shops,
        onlineShops: data.online_shops,
        totalTransactionMoney: numberToUSMoney(data.total_transaction_money),
        totalTransactionQuantity: numberToUSMoney(data.total_transaction_quantity),
        totalTransactionTax: numberToUSMoney(data.total_transaction_tax),
        topSoldItems: topSoldItems,
        topBoughtItems: topBoughtItems,
        topListedItems: topListedItems,
        topEarners: topEarners,
    };

    return output;
};

export default MarketSummaryToModel;
