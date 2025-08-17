import { ListingResponse } from "@/services/listing/item-listing";
import { numberToUSMoney } from "@/utils/string_utils";

export interface ListingModel {
    items: ItemModel[];
    total: number;
    page: number;
    pageSize: number;
    pages: number;
};

export interface ItemModel {
    accountId: number;
    name: string;
    ownerName: string;
    mapName: string;
    xCoordinate: number;
    yCoordinate: number;
    itemId: number;
    itemName: string;
    price: string;
    minPrice: string;
    maxPrice: string;
    averageSellPrice: string;
    averageBuyPrice: string;
    purchasedUnits: string;
    soldUnits: string;
    userDiscordId: number | null;
    amount: string;
    currentAmount: string;
};

const ItemListingToModel = (data: ListingResponse): ListingModel => {
    const items: ItemModel[] = data.items.map((x) => {
        return {
            accountId: x.account_id,
            name: x.name,
            ownerName: x.owner_name,
            mapName: x.map_name,
            xCoordinate: x.x_coordinate,
            yCoordinate: x.y_coordinate,
            itemId: x.item_id,
            itemName: x.full_name,
            price: `${numberToUSMoney(x.price)}z`,
            minPrice: `${numberToUSMoney(x.price)}z`,
            maxPrice: `${numberToUSMoney(x.price)}z`,
            averageSellPrice: `${numberToUSMoney(x.price)}z`,
            averageBuyPrice: `${numberToUSMoney(x.price)}z`,
            purchasedUnits: `${numberToUSMoney(x.price)}z`,
            soldUnits: `${numberToUSMoney(x.price)}z`,
            userDiscordId: x.user_discord_id,
            amount: numberToUSMoney(x.amount),
            currentAmount: numberToUSMoney(x.current_amount),
        }
    });

    const output: ListingModel = {
        items: items,
        total: data.total,
        page: data.page,
        pageSize: data.page_size,
        pages: data.pages,
    };

    return output;
};

export default ItemListingToModel;
