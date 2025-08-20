import { ListingResponse } from "@/services/history/item-history";
import { numberToUSMoney } from "@/utils/string_utils";
import { formatOnlyDate } from "@/utils/date_utils";

export interface ListingModel {
    items: ItemModel[];
    total: number;
    page: number;
    pageSize: number;
    pages: number;
};

export interface ItemModel {
    itemId: number;
    name: string;
    price: string;
    date: string | null;
    minPrice: string;
    maxPrice: string;
    averageSellPrice: string;
    avgSellPriceGrowth: number;
    averageBuyPrice: string;
    avgBuyPriceGrowth: number;
    purchasedUnits: string;
    purchasedUnitsGrowth: number;
    soldUnits: string;
    soldUnitsGrowth: number;
    amount: string;
};

const ItemHistoryToModel = (data: ListingResponse): ListingModel => {
    const items: ItemModel[] = [];
    for (const x of data.items) {
        items.push({
            itemId: x.item_id,
            name: x.name,
            date: x.date !== null ? formatOnlyDate(x.date) : null,
            price: `${numberToUSMoney(x.price)}z`,
            minPrice: `${numberToUSMoney(x.min_price)}z`,
            maxPrice: `${numberToUSMoney(x.max_price)}z`,
            averageSellPrice: `${numberToUSMoney(x.average_sell_price)}z`,
            avgSellPriceGrowth: x.avg_sell_price_growth,
            averageBuyPrice: `${numberToUSMoney(x.average_buy_price)}z`,
            avgBuyPriceGrowth: x.avg_buy_price_growth,
            purchasedUnits: numberToUSMoney(x.purchased_units),
            purchasedUnitsGrowth: x.purchased_units_growth,
            soldUnits: numberToUSMoney(x.sold_units),
            soldUnitsGrowth: x.sold_units_growth,
            amount: numberToUSMoney(x.amount),
        })
    }

    return {
        items: items,
        total: data.total,
        page: data.page,
        pageSize: data.page_size,
        pages: data.pages,
    }
};

export default ItemHistoryToModel;
