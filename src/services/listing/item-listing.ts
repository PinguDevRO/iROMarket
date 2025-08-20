import { AxiosGet, AxiosResponse } from "../utils";

export interface ListingResponse {
    items: ItemResponse[];
    total: number;
    page: number;
    page_size: number;
    pages: number;
};

export interface ItemResponse {
    account_id: number;
    name: string;
    owner_name: string;
    map_name: string;
    x_coordinate: number;
    y_coordinate: number;
    item_id: number;
    full_name: string;
    price: number;
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
    user_discord_id: number | null;
    amount: number;
    current_amount: number;
};

const GetItemListing = async (server: string, kind: string, page: number, page_size: number, itemName?: string, itemId?: number): Promise<ListingResponse> => {
    const url = process.env.NEXT_PUBLIC_MARKET_API_URL ? process.env.NEXT_PUBLIC_MARKET_API_URL : "";
    if(itemName !== undefined && itemName.length > 0){
        const response: AxiosResponse<ListingResponse> = await AxiosGet(`${url}/market/listing?server=${server}&q=${itemName}&t=${kind}&page=${page + 1}&page_size=${page_size}`);
        return response.data;
    }
    if(itemId !== undefined){
        const response: AxiosResponse<ListingResponse> = await AxiosGet(`${url}/market/listing?server=${server}&id=${itemId}&t=${kind}&page=${page + 1}&page_size=${page_size}`);
        return response.data;
    }
    const response: AxiosResponse<ListingResponse> = await AxiosGet(`${url}/market/listing?server=${server}&t=${kind}&page=${page + 1}&page_size=${page_size}`);
    return response.data;
};

export default GetItemListing;
