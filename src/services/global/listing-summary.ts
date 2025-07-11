import { AxiosGet, AxiosResponse } from "../utils";

export interface ItemListingResponse {
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

export interface ListingSummaryResponse {
    buying: ItemListingResponse[];
    selling: ItemListingResponse[];
};

const GetListingSummary = async (server:string, query: string): Promise<ListingSummaryResponse> => {
    const url = "https://fenixapi.gay/listing/summary";
    if(query.length > 0){
        const response: AxiosResponse<ListingSummaryResponse> = await AxiosGet(`${url}?server=${server}&q=${query}`);
        return response.data;
    }
    else {
        const response: AxiosResponse<ListingSummaryResponse> = await AxiosGet(`${url}?server=${server}`);
        return response.data;
    }
};

export default GetListingSummary;
