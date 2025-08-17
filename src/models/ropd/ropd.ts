import { ROPDResponse } from "@/services/ropd/ropd";
import { formatDate } from "@/utils/date_utils";

export interface ROPDModel {
    players: PlayerModel[];
    total: number;
    page: number;
    pageSize: number;
    pages: number;
};

export interface PlayerModel {
    discordId: number | null;
    accountId: number;
    name: string;
    level: number;
    lastMapSeen: string;
    lastPositionX: number;
    lastPositionY: number;
    jobId: number;
    guildName: string;
    lastSeen: string;
};

const ROPDToModel = (data: ROPDResponse): ROPDModel => {
    const players: PlayerModel[] = [];
    for(const player of data.players){
        players.push({
            discordId: player.discord_id,
            accountId: player.account_id,
            name: player.name,
            level: player.level,
            lastMapSeen: player.last_map_seen,
            lastPositionX: player.last_position_x,
            lastPositionY: player.last_position_y,
            jobId: player.job_id ?? 0,
            guildName: player.guild_name ?? 'Unknown',
            lastSeen: formatDate(player.last_seen),
        })
    }

    const output: ROPDModel = {
        players: players,
        total: data.total,
        page: data.page,
        pageSize: data.page_size,
        pages: data.pages,
    };

    return output;
};

export default ROPDToModel;
