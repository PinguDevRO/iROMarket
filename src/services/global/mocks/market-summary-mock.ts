import { GetMarketSummaryResponse } from "../market-summary";

const getMarketSummaryMock: GetMarketSummaryResponse = {
    offline_shops: 1052,
    online_shops: 416,
    total_transaction_money: 168863821755,
    total_transaction_quantity: 195148,
    total_transaction_tax: 8280697538,
    top_sold_items: [
        {
            item_id: 6635,
            item_name: "Blacksmith Blessing",
            transaction_volume: 109,
            transaction_quantity: 5031
        },
        {
            item_id: 20717,
            item_name: "Giant Faceworm Snake Skin",
            transaction_volume: 58,
            transaction_quantity: 58
        },
        {
            item_id: 1000322,
            item_name: "Ether Dust",
            transaction_volume: 56,
            transaction_quantity: 44656
        },
        {
            item_id: 450410,
            item_name: "Hatred Darkness",
            transaction_volume: 38,
            transaction_quantity: 38
        },
        {
            item_id: 6234,
            item_name: "Safe to 7 Armor Certificate",
            transaction_volume: 34,
            transaction_quantity: 144
        }
    ],
    top_bought_items: [
        {
            item_id: 12103,
            item_name: "Bloody Branch",
            transaction_volume: 35,
            transaction_quantity: 978
        },
        {
            item_id: 12412,
            item_name: "HE Bubble Gum",
            transaction_volume: 27,
            transaction_quantity: 2950
        },
        {
            item_id: 14545,
            item_name: "Battle Manual X3",
            transaction_volume: 21,
            transaction_quantity: 1116
        },
        {
            item_id: 6635,
            item_name: "Blacksmith Blessing",
            transaction_volume: 19,
            transaction_quantity: 1347
        },
        {
            item_id: 1032,
            item_name: "Maneater Blossom",
            transaction_volume: 14,
            transaction_quantity: 1646
        }
    ],
    top_listed_items: [
        {
            item_id: 20717,
            item_name: "Giant Faceworm Snake Skin",
            transaction_volume: 590,
            transaction_quantity: 590
        },
        {
            item_id: 16979,
            item_name: "Silvervine 4 Box",
            transaction_volume: 378,
            transaction_quantity: 378
        },
        {
            item_id: 6635,
            item_name: "Blacksmith Blessing",
            transaction_volume: 236,
            transaction_quantity: 78159
        },
        {
            item_id: 460112,
            item_name: "Odin Grace Shield",
            transaction_volume: 216,
            transaction_quantity: 216
        },
        {
            item_id: 410337,
            item_name: "Cherub Coronet",
            transaction_volume: 186,
            transaction_quantity: 186
        }
    ],
    top_earners: [
        {
            player_id: 6049484,
            player_name: "Greensboro_6D753_9E30",
            transaction_money: 3191111104
        },
        {
            player_id: 6139041,
            player_name: "MatchaCodeOne",
            transaction_money: 2924999993
        },
        {
            player_id: 6174455,
            player_name: "DaVinci~Chan",
            transaction_money: 2689608287
        },
        {
            player_id: 6035378,
            player_name: "-Mi-Lin-",
            transaction_money: 2641998000
        },
        {
            player_id: 4384990,
            player_name: "circling ripple",
            transaction_money: 2463555529
        }
    ]
};

export default getMarketSummaryMock;
