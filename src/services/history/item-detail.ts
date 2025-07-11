import { AxiosGet, AxiosResponse } from "../utils";

export interface ItemDetailsResponse {
    item_id: number;
    item_name: string;
    item_price: number;
    item_quantity: number;
    player_name: string;
    transaction_date: string;
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

export interface ItemDetailHistoryResponse {
    buying: ItemDetailsResponse[];
    selling: ItemDetailsResponse[];
};

const GetItemDetail = async (itemId: number, server: string): Promise<ItemDetailHistoryResponse> => {
    const url = "https://fenixapi.gay/history";
    const response: AxiosResponse<ItemDetailHistoryResponse> = await AxiosGet(`${url}?server=${server}&id=${itemId}`);
    return response.data;
};

export default GetItemDetail;
