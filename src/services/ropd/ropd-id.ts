import { AxiosGet, AxiosResponse } from "../utils";

export interface PlayerDetailResponse {
    account_id: number;
    player_name: string;
    player_guild: string;
    player_job: string;
    player_level: number;
    last_seen: string;
};

const GetRoPDByAccountId = async (accountId: number, server: string): Promise<PlayerDetailResponse[]> => {
    const url = "https://fenixapi.gay/ropd";
    const response: AxiosResponse<PlayerDetailResponse[]> = await AxiosGet(`${url}?server=${server}&id=${accountId}`);
    return response.data;
};

export default GetRoPDByAccountId;
