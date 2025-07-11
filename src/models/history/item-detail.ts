import { ItemDetailHistoryResponse } from "@/services/history/item-detail";
import { numberToUSMoney } from "@/utils/string_utils";
import { formatDate } from "@/utils/date_utils";

export interface ItemListingModel {
    itemId: number;
    itemName: string;
    itemPrice: string;
    itemQuantity: string;
    playerName: string;
    transactionDate: string;
    averageSellPrice: string;
    averageSellPercent: number;
    averageBuyPrice: string;
    averageBuyPercent: number;
    minPrice: string;
    maxPrice: string;
    soldQuantity: string;
    soldPercent: number;
    boughtQuantity: string;
    boughtPercent: number;
};

export interface ItemListingHistoryModel {
    buying: ItemListingModel[];
    selling: ItemListingModel[];
};

const ItemDetailToModel = (data: ItemDetailHistoryResponse): ItemListingHistoryModel => {
    const buying: ItemListingModel[] = data.buying.map((x) => {
        return {
            itemId: x.item_id,
            itemName: x.item_name,
            itemPrice: `${numberToUSMoney(x.item_price)}z`,
            itemQuantity: numberToUSMoney(x.item_quantity),
            playerName: x.player_name,
            transactionDate: formatDate(x.transaction_date),
            averageSellPrice: `${numberToUSMoney(x.average_sell_price)}z`,
            averageSellPercent: x.average_sell_percent,
            averageBuyPrice: `${numberToUSMoney(x.average_buy_price)}z`,
            averageBuyPercent: x.average_buy_percent,
            minPrice: `${numberToUSMoney(x.min_price)}z`,
            maxPrice: `${numberToUSMoney(x.max_price)}z`,
            soldQuantity: numberToUSMoney(x.sold_quantity),
            soldPercent: x.sold_percent,
            boughtQuantity: numberToUSMoney(x.bought_quantity),
            boughtPercent: x.bought_percent,
        }
    });

    const selling: ItemListingModel[] = data.selling.map((x) => {
        return {
            itemId: x.item_id,
            itemName: x.item_name,
            itemPrice: `${numberToUSMoney(x.item_price)}z`,
            itemQuantity: numberToUSMoney(x.item_quantity),
            playerName: x.player_name,
            transactionDate: formatDate(x.transaction_date),
            averageSellPrice: `${numberToUSMoney(x.average_sell_price)}z`,
            averageSellPercent: x.average_sell_percent,
            averageBuyPrice: `${numberToUSMoney(x.average_buy_price)}z`,
            averageBuyPercent: x.average_buy_percent,
            minPrice: `${numberToUSMoney(x.min_price)}z`,
            maxPrice: `${numberToUSMoney(x.max_price)}z`,
            soldQuantity: numberToUSMoney(x.sold_quantity),
            soldPercent: x.sold_percent,
            boughtQuantity: numberToUSMoney(x.bought_quantity),
            boughtPercent: x.bought_percent,
        }
    });

    const output = {
        selling: selling,
        buying: buying,
    };

    return output;
};

export default ItemDetailToModel;
