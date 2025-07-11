'use client';

import Image from 'next/image'; // or your custom icon SVG
import { Box, Link, Stack } from '@mui/material';
import { CustomTypography } from "@/utils/component_utils";
import { COLORS } from '@/theme/colors';


const Footer = () => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" px={4} py={1} gap={{ xs: 2, md: 0 }}>
            <CustomTypography
                color={COLORS.primary_background_text}
                variant="subtitle1"
                component="div"
                sx={{
                    fontSize: {
                        xs: '0.6rem',
                        sm: '0.8rem',
                        md: '1rem',
                    },
                    fontWeight: 'normal',
                    display: 'block',
                    lineHeight: 1.6,
                }}
            >
                <Box component="span" sx={{ display: 'inline', wordBreak: 'break-word' }}>
                    © Gravity Interactive, Inc. All Rights Reserved. Ragnarok Online is a trademark of Gravity Co., Ltd. Web application developed by PinguDev & FenixDev. Special thanks to contributors Jefuu,&nbsp;Jin&nbsp;Atsuko,&nbsp;
                    <Box
                        component="a"
                        href="https://forums.warpportal.com/index.php?/topic/257826-dazes-scribbles-commissions-closed/"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ textDecoration: 'underline', color: COLORS.primary_background_text, display: 'inline' }}
                    >
                        Daze
                    </Box>
                    ,&nbsp;
                    <Box
                        component="a"
                        href="https://chorva.art/"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ textDecoration: 'underline', color: COLORS.primary_background_text, display: 'inline' }}
                    >
                        Chorvaqueen
                    </Box>
                    , and others.
                </Box>
            </CustomTypography>
            <Stack
                direction="row"
                spacing={4}
                mt={0.5}
                flexWrap="wrap"
                alignItems="center"
            >
                <Link
                    href="https://discord.gg/invite1"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: {
                            xs: '0.6rem',
                            sm: '0.8rem',
                            md: '1rem',
                        },
                        color: '#3399ff',
                        textDecoration: 'none',
                        '&:hover': {
                            color: '#1a73e8',
                            textDecoration: 'underline',
                        },
                    }}
                >
                    <Image
                        src="/discord.svg"
                        alt="Discord"
                        width={16}
                        height={16}
                    />
                    iRO Wiki
                </Link>
                <Link
                    href="https://discord.gg/invite1"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: {
                            xs: '0.6rem',
                            sm: '0.8rem',
                            md: '1rem',
                        },
                        color: '#3399ff',
                        textDecoration: 'none',
                        '&:hover': {
                            color: '#1a73e8',
                            textDecoration: 'underline',
                        },
                    }}
                >
                    <Image
                        src="/discord.svg"
                        alt="Discord"
                        width={16}
                        height={16}
                    />
                    iRO Chaos Market
                </Link>
                <Link
                    href="https://discord.gg/invite1"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: {
                            xs: '0.6rem',
                            sm: '0.8rem',
                            md: '1rem',
                        },
                        color: '#3399ff',
                        textDecoration: 'none',
                        '&:hover': {
                            color: '#1a73e8',
                            textDecoration: 'underline',
                        },
                    }}
                >
                    <Image
                        src="/discord.svg"
                        alt="Discord"
                        width={16}
                        height={16}
                    />
                    Spooky Market
                </Link>
            </Stack>
        </Box>
    )
};

export default Footer;
