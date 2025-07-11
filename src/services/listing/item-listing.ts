import { AxiosGet, AxiosResponse } from "../utils";

export interface ItemDetailsResponse {
    item_id: number;
    item_name: string;
    item_price: number;
    item_quantity: number;
    shop_name: string;
    shop_city: string;
    shop_navigation: string;
    player_name: string;
    average_sell_price: number;
    average_sell_percent: number;
    average_buy_price: number;
    average_buy_percent: number;
    min_price: number;
    max_price: number;
    sold_quantity: number;
    sold_percent: number;
    bought_quantity: number;
    bought_percent: number;
};

export interface ItemListingResponse {
    buying: ItemDetailsResponse[];
    selling: ItemDetailsResponse[];
};

const GetItemListing = async (itemId: number, server: string): Promise<ItemListingResponse> => {
    const url = "https://fenixapi.gay/listing";
    const response: AxiosResponse<ItemListingResponse> = await AxiosGet(`${url}?server=${server}&id=${itemId}`);
    return response.data;
};

export default GetItemListing;
