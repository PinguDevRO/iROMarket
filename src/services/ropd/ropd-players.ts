import { AxiosGet, AxiosResponse } from "../utils";

export interface PlayerDetailResponse {
    account_id: number;
    player_name: string;
    player_guild: string;
    player_job: string;
    player_level: number;
    last_seen: string;
};

const GetRoPDPlayers = async (server: string, query: string): Promise<PlayerDetailResponse[]> => {
    const url = "https://fenixapi.gay/ropd";
    if (query.length > 0) {
        const response: AxiosResponse<PlayerDetailResponse[]> = await AxiosGet(`${url}?server=${server}&q=${query}`);
        return response.data;
    }
    else {
        const response: AxiosResponse<PlayerDetailResponse[]> = await AxiosGet(`${url}?server=${server}`);
        return response.data;
    }
};

export default GetRoPDPlayers;
