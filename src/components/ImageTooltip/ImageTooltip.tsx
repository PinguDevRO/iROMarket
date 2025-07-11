import { ReactElement  } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { COLORS } from '@/theme/colors';


const ImageTooptip = ({
    itemId,
    itemName,
    children
}: {
    itemId: number;
    itemName: string;
    children: ReactElement;
}) => {
    return (
        <Tooltip
            followCursor
            slotProps={{
                tooltip: {
                    sx: {
                        backgroundColor: COLORS.second_background,
                        borderRadius: 2,
                        p: 2
                    },
                },
            }}
            title={
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" >
                    <Image
                        src={`https://db.irowiki.org/image/collection/${itemId}.png`}
                        alt={itemName}
                        width={75}
                        height={100}
                        draggable={false}
                    />
                </Box>
            }
        >
            {children}
        </Tooltip>
    )
};

export default ImageTooptip;
