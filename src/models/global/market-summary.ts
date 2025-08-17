import { GetMarketSummaryResponse } from "@/services/global/market-summary";
import { numberToUSMoney } from "@/utils/string_utils";

export interface ShopModel {
    online: number;
    offline: number;
    total: number;
};

export interface TransactionModel {
    transactionVolume: string;
    transactionQuantity: string;
    taxedVolume: string;
};

export interface TopItemModel {
    itemId: number;
    itemName: string;
    transactionCount: string;
    totalUnits: string;
};

export interface TopEarnModel {
    accountId: number;
    playerName: string;
    sales: string;
    purchases: string;
    earnings: string;
};

export interface MarketSummaryModel {
    shops: ShopModel;
    transactions: TransactionModel;
    topSoldItems: TopItemModel[];
    topBoughtItems: TopItemModel[];
    topListedItems: TopItemModel[];
    topEarners: TopEarnModel[];
};

const MarketSummaryToModel = (data: GetMarketSummaryResponse): MarketSummaryModel => {

    const topSoldItems: TopItemModel[] = data.sold_items.map((x) => { return { itemId: x.item_id, itemName: x.item_name, transactionCount: numberToUSMoney(x.transaction_count), totalUnits: numberToUSMoney(x.total_units) } });
    const topBoughtItems: TopItemModel[] = data.bought_items.map((x) => { return { itemId: x.item_id, itemName: x.item_name, transactionCount: numberToUSMoney(x.transaction_count), totalUnits: numberToUSMoney(x.total_units) } });
    const topListedItems: TopItemModel[] = data.listed_items.map((x) => { return { itemId: x.item_id, itemName: x.item_name, transactionCount: numberToUSMoney(x.transaction_count), totalUnits: numberToUSMoney(x.total_units) } });
    const topEarners: TopEarnModel[] = data.earners.map((x) => { return { accountId: x.account_id, playerName: x.player_name, sales: numberToUSMoney(x.sales), purchases: numberToUSMoney(x.purchases), earnings: numberToUSMoney(x.earnings) } });

    const output: MarketSummaryModel = {
        shops: {
            online: data.shops.online,
            offline: data.shops.offline,
            total: data.shops.total,
        },
        transactions: {
            transactionVolume: numberToUSMoney(data.transactions.transaction_volume),
            transactionQuantity: numberToUSMoney(data.transactions.transaction_quantity),
            taxedVolume: numberToUSMoney(data.transactions.taxed_volume),
        },
        topSoldItems: topSoldItems,
        topBoughtItems: topBoughtItems,
        topListedItems: topListedItems,
        topEarners: topEarners,
    };

    return output;
};

export default MarketSummaryToModel;
