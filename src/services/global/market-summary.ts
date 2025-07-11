import { AxiosGet, AxiosResponse } from "../utils";

export interface GetMarketSummaryResponse {
    offline_shops: number;
    online_shops: number;
    total_transaction_money: number;
    total_transaction_quantity: number;
    total_transaction_tax: number;
    top_sold_items: GetTopResponse[];
    top_bought_items: GetTopResponse[];
    top_listed_items: GetTopResponse[];
    top_earners: GetEarnersResponse[];
};

export interface GetTopResponse {
    item_id: number;
    item_name: string;
    transaction_volume: number;
    transaction_quantity: number;
};

export interface GetEarnersResponse {
    player_id: number;
    player_name: string;
    transaction_money: number;
};

const GetMarketSummary = async (): Promise<GetMarketSummaryResponse> => {
    const url = "https://fenixapi.gay/summary";
    const response: AxiosResponse<GetMarketSummaryResponse> = await AxiosGet(url);
    return response.data;
};

export default GetMarketSummary;
