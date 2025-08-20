import { AxiosGet, AxiosResponse } from "../utils";

export interface ROPDResponse {
    players: PlayerResponse[];
    total: number;
    page: number;
    page_size: number;
    pages: number;
};

export interface PlayerResponse {
    discord_id: number | null;
    account_id: number;
    name: string;
    level: number;
    last_map_seen: string;
    last_position_x: number;
    last_position_y: number;
    job_id: number | null;
    guild_name: string | null;
    last_seen: string;
};

const GetRoPD = async (server: string, page: number, page_size: number, playerName?: string, accountId?: number): Promise<ROPDResponse> => {
    const url = process.env.NEXT_PUBLIC_MARKET_API_URL ? process.env.NEXT_PUBLIC_MARKET_API_URL : "";
    const api_key = process.env.NEXT_PUBLIC_MARKET_API_KEY ? process.env.NEXT_PUBLIC_MARKET_API_KEY : "";
    if(playerName !== undefined && playerName.length > 0){
        const response: AxiosResponse<ROPDResponse> = await AxiosGet(`${url}/ropd?server=${server}&q=${playerName}&page=${page + 1}&page_size=${page_size}&api_key=${api_key}`);
        return response.data;
    }
    if(accountId !== undefined){
        const response: AxiosResponse<ROPDResponse> = await AxiosGet(`${url}/ropd?server=${server}&id=${accountId}&page=${page + 1}&page_size=${page_size}&api_key=${api_key}`);
        return response.data;
    }
    const response: AxiosResponse<ROPDResponse> = await AxiosGet(`${url}/ropd?server=${server}&page=${page + 1}&page_size=${page_size}&api_key=${api_key}`);
    return response.data;
};

export default GetRoPD;
