export const job_expanded_relation: { [key: number]: number } = {
    7: 4008,
    8: 4009,
    9: 4010,
    10: 4011,
    11: 4012,
    12: 4013,
    14: 4015,
    15: 4016,
    16: 4017,
    17: 4018,
    18: 4019,
    19: 4020,
    20: 4021,
};

export const job_names: { [key: number]: string } = {
    0: "Novice",
    1: "Swordman",
    2: "Magician",
    3: "Archer",
    4: "Acolyte",
    5: "Merchant",
    6: "Thief",
    7: "Knight",
    8: "Priest",
    9: "Wizard",
    10: "Blacksmith",
    11: "Hunter",
    12: "Assassin",
    14: "Crusader",
    15: "Monk",
    16: "Sage",
    17: "Rogue",
    18: "Biochemist",
    19: "Bard",
    20: "Dancer",
    23: "Super Novice",
    24: "Gunslinger",
    25: "Ninja",
    4008: "Lord Knight",
    4009: "High Priest",
    4010: "High Wizard",
    4011: "Whitesmith",
    4012: "Sniper",
    4013: "Assassin Cross",
    4015: "Paladin",
    4016: "Champion",
    4017: "Professor",
    4018: "Stalker",
    4019: "Creator",
    4020: "Minstrel",
    4021: "Gypsy",
    4046: "TaeKwon Kid",
    4047: "TaeKwon Master",
    4049: "Soul Linker",
    4054: "Rune Knight",
    4055: "Warlock",
    4056: "Ranger",
    4057: "Arch Bishop",
    4058: "Mechanic",
    4059: "Guillotine Cross",
    4060: "Rune Knight",
    4061: "Warlock",
    4062: "Ranger",
    4063: "Arch Bishop",
    4064: "Mechanic",
    4065: "Guillotine Cross",
    4066: "Royal Guard",
    4067: "Sorcerer",
    4068: "Maestro",
    4069: "Wanderer",
    4070: "Sura",
    4071: "Geneticist",
    4072: "Shadow Chaser",
    4073: "Royal Guard",
    4074: "Sorcerer",
    4075: "Minstrel",
    4076: "Wanderer",
    4077: "Sura",
    4078: "Geneticist",
    4079: "Shadow Chaser",
    4190: "Super Novice Ex",
    4211: "Kagerou",
    4212: "Oboro",
    4215: "Rebellion",
    4218: "Summoner",
    4239: "Star Emperor",
    4240: "Soul Reaper",
    4252: "Dragon Knight",
    4253: "Meister",
    4254: "Shadow Cross",
    4255: "Arch Mage",
    4256: "Cardinal",
    4257: "Wind Hawk",
    4258: "Imperial Guard",
    4259: "Biolo",
    4260: "Abyss Chaser",
    4261: "Elemental Master",
    4262: "Inquisitor",
    4263: "Troubadour",
    4264: "Trouvere",
    4302: "Sky Emperor",
    4303: "Soul Ascetic",
    4304: "Shinkiro",
    4305: "Shiranui",
    4306: "Night Watch",
    4307: "Hyper Novice",
    4308: "Spirit Handler",
};

export const get_jobname_by_id = (id: number): string => {
    const expanded_job_id = get_expanded_job_id(id);
    const use_id = expanded_job_id === null ? id : expanded_job_id;
    for (const [strKey, value] of Object.entries(job_names)) {
        const key = Number(strKey);
        if (use_id === key) {
            return value;
        }
    };

    return 'Unknown';
};

export const get_expanded_job_id = (id: number): number | null => {
    for (const [strKey, value] of Object.entries(job_expanded_relation)) {
        const key = Number(strKey);
        if (id === key) {
            return value;
        }
    };

    return null;
};
