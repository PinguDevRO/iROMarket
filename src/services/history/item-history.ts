import { AxiosGet, AxiosResponse } from "../utils";

export interface ListingResponse {
    items: ItemResponse[];
    total: number;
    page: number;
    page_size: number;
    pages: number;
};

export interface ItemResponse {
    item_id: number;
    name: string;
    price: number;
    date: string | null;
    min_price: number;
    max_price: number;
    average_sell_price: number;
    avg_sell_price_growth: number;
    average_buy_price: number;
    avg_buy_price_growth: number;
    purchased_units: number;
    purchased_units_growth: number;
    sold_units: number;
    sold_units_growth: number;
    amount: number;
};

const GetItemHistory = async (server: string, kind: string, page: number, page_size: number, itemName?: string, itemId?: number): Promise<ListingResponse> => {
    const url = process.env.NEXT_PUBLIC_MARKET_API_URL ? process.env.NEXT_PUBLIC_MARKET_API_URL : "";
    const api_key = process.env.NEXT_PUBLIC_MARKET_API_KEY ? process.env.NEXT_PUBLIC_MARKET_API_KEY : "";
    if(itemName !== undefined && itemName.length > 0){
        const response: AxiosResponse<ListingResponse> = await AxiosGet(`${url}/archive/listing?server=${server}&q=${itemName}&t=${kind}&page=${page + 1}&page_size=${page_size}&api_key=${api_key}`);
        return response.data;
    }
    if(itemId !== undefined){
        const response: AxiosResponse<ListingResponse> = await AxiosGet(`${url}/archive/listing?server=${server}&id=${itemId}&t=${kind}&page=${page + 1}&page_size=${page_size}&api_key=${api_key}`);
        return response.data;
    }
    const response: AxiosResponse<ListingResponse> = await AxiosGet(`${url}/archive/listing?server=${server}&t=${kind}&page=${page + 1}&page_size=${page_size}&api_key=${api_key}`);
    return response.data;
};

export default GetItemHistory;
