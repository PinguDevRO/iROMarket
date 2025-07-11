import { PlayerDetailResponse } from "@/services/ropd/ropd-players";
import { formatDate } from "@/utils/date_utils";

export interface PlayerDetailModel {
    accountId: number;
    playerName: string;
    playerGuild: string;
    playerJob: string;
    playerLevel: number;
    lastSeen: string;
};

const RoPDPlayersToModel = (data: PlayerDetailResponse[]): PlayerDetailModel[] => {
    const output: PlayerDetailModel[] = data.map((x) => {
        return {
            accountId: x.account_id,
            playerName: x.player_name,
            playerGuild: x.player_guild,
            playerJob: x.player_job,
            playerLevel: x.player_level,
            lastSeen: formatDate(x.last_seen),
        }
    });

    return output;
};

export default RoPDPlayersToModel;
