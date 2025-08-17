import { AxiosGet, AxiosResponse } from "../utils";

export interface GetMarketSummaryResponse {
    shops: GetShopResponse;
    transactions: GetTransactionResponse;
    sold_items: GetTopResponse[];
    bought_items: GetTopResponse[];
    listed_items: GetTopResponse[];
    earners: GetEarnersResponse[];
};

export interface GetShopResponse {
    online: number;
    offline: number;
    total: number;
};

export interface GetTransactionResponse {
    transaction_volume: number;
    transaction_quantity: number;
    taxed_volume: number;
};

export interface GetTopResponse {
    item_id: number;
    item_name: string;
    transaction_count: number;
    total_units: number;
};

export interface GetEarnersResponse {
    account_id: number;
    player_name: string;
    sales: number;
    purchases: number;
    earnings: number;
};

const GetMarketSummary = async (): Promise<GetMarketSummaryResponse> => {
    const url = process.env.NEXT_PUBLIC_MARKET_API_URL ? process.env.NEXT_PUBLIC_MARKET_API_URL : "";
    const response: AxiosResponse<GetMarketSummaryResponse> = await AxiosGet(`${url}/summary`);
    return response.data;
};

export default GetMarketSummary;
