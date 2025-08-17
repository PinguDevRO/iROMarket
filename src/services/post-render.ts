import { AxiosImage } from "./utils";

export interface CharacterData {
    gender: number;
    job: string[];
    head: number;
    headPalette: number;
    headdir: number;
    headgear: number[];
    garment: number;
    bodyPalette: number;
    madogearType: number;
    action: number;
    canvas: string;
    outfit: number;
};

const defaultCharData: CharacterData = {
    gender: 1,
    job: [],
    head: 1,
    headPalette: 1,
    headdir: 0,
    headgear: [0, 0, 0],
    garment: 0,
    bodyPalette: -1,
    madogearType: 0,
    action: 0,
    canvas: '200x200+100+150',
    outfit: 0
};

const PostRender = async (jobId: number): Promise<string |  null> => {
    const url = process.env.NEXT_PUBLIC_ZRENDERER_BACKEND_URL ? process.env.NEXT_PUBLIC_ZRENDERER_BACKEND_URL : "";
    const charData = {...defaultCharData, job: [...defaultCharData.job, jobId.toString()]};
    const response = await AxiosImage(url, {
        ...charData,
    });

    if(response !== null){
        return response;
    }
    return null;
};

export default PostRender;
