import { ItemListingResponse } from "@/services/listing/item-listing";
import { numberToUSMoney } from "@/utils/string_utils";

export interface ItemListingModel {
    itemId: number;
    itemName: string;
    itemPrice: string;
    itemQuantity: string;
    shopName: string;
    shopCity: string;
    shopNavigation: string;
    playerName: string;
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

export interface ItemSummaryModel {
    buying: ItemListingModel[];
    selling: ItemListingModel[];
};

const ItemListingToModel = (data: ItemListingResponse): ItemSummaryModel => {
    const buying: ItemListingModel[] = data.buying.map((x) => {
        return {
            itemId: x.item_id,
            itemName: x.item_name,
            itemPrice: `${numberToUSMoney(x.item_price)}z`,
            itemQuantity: numberToUSMoney(x.item_quantity),
            shopName: x.shop_name,
            shopCity: x.shop_city,
            shopNavigation: x.shop_navigation,
            playerName: x.player_name,
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
            shopName: x.shop_name,
            shopCity: x.shop_city,
            shopNavigation: x.shop_navigation,
            playerName: x.player_name,
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

export default ItemListingToModel;
