'use client';

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import {
    useSearchParams
} from "next/navigation";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { get_jobname_by_id } from "@/constants/joblist";
import { CustomTypography } from "@/utils/component_utils";
import { isNumeric } from "@/utils/string_utils";
import { ROPDModel } from "@/models/ropd/ropd";
import { COLORS } from '@/theme/colors';
import PostRender from "@/services/post-render";
import { useStore } from "@/store/useStore";

const CharacterImage = ({
    name,
    jobId,
} : {
    name: string;
    jobId: number;
}) => {
    const [imgSrc, setImgSrc] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchImage = async () => {
            const result = await PostRender(jobId);
            if (isMounted) {
                setImgSrc(result);
            }
        };

        fetchImage();

        return () => {
            isMounted = false;
        };
    }, [jobId]);

    return imgSrc ? (
        <Image
            src={imgSrc}
            alt={name}
            width={200}
            height={200}
            draggable={false}
            loading="eager"
        />
    ) : (
        <Image
            src={'/poring.png'}
            alt={'Lazy Poring'}
            width={200}
            height={200}
            draggable={false}
            loading="eager"
        />
    );
}


const RoPDTableByAccount = ({
    title,
    data,
}: {
    title: string;
    data: ROPDModel | undefined;
}) => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const page = useStore((x) => x.page);
    const pageSize = useStore((x) => x.page_size);
    const setPage = useStore((x) => x.set_page);
    const setPageSize = useStore((x) => x.set_page_size);

    const columns = [
        "Character",
        "Name",
        "Job",
        "Level",
        "Guild",
        "Discord ID",
        "Last Seen"
    ];

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        if (isNumeric(event.target.value)) {
            const newRowsPerPage = Number(event.target.value);
            if (newRowsPerPage > 0 && newRowsPerPage <= 100) {
                setPageSize(newRowsPerPage);
                setPage(0);
            }
        }
    };

    return (
        <Paper elevation={3} sx={{ width: '100%', height: '100%', paddingX: 2, borderRadius: 4, display: 'flex', flexDirection: 'column', backgroundColor: COLORS.third_background }}>
            <Box display="flex" padding={2} sx={{ color: COLORS.third_background_text }}>
                <CustomTypography variant="h6" component="div">
                    {title}
                </CustomTypography>
            </Box>
            <TableContainer
                sx={{
                    height: '100%',
                    overflow: 'auto',
                }}
            >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column, idx) => (
                                <TableCell
                                    key={'player-col-' + column + '-' + idx}
                                    sx={{ backgroundColor: COLORS.third_background, color: COLORS.third_background_text }}
                                    align={idx === 0 ? 'left' : 'center'}
                                >
                                    {column}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data !== undefined ? (
                            data.players.map((row, idx) => (
                                <TableRow hover key={`player-row-${row.accountId}-${idx}`}>
                                    <TableCell
                                        key={`player-row-character-${row.accountId}-${idx}`}
                                        sx={{ color: COLORS.third_background_text }}
                                        align="left"
                                    >
                                        <CharacterImage name={row.name} jobId={row.jobId} />
                                    </TableCell>
                                    <TableCell
                                        key={`player-row-name-${row.accountId}-${idx}`}
                                        sx={{ color: COLORS.third_background_text }}
                                        align="center"
                                    >
                                        <a
                                            className="hover:underline cursor-pointer"
                                            href={`/ropd/${row.accountId}?${params.toString()}`}
                                            target="_self"
                                            rel="noopener noreferrer"
                                            style={{
                                                textDecoration: "none",
                                                fontSize: "14px",
                                                color: COLORS.internal_link_text
                                            }}
                                        >
                                            {row.name} ({row.accountId})
                                        </a>
                                    </TableCell>
                                    <TableCell
                                        key={`player-row-job-${row.accountId}-${idx}`}
                                        sx={{ color: COLORS.third_background_text }}
                                        align="center"
                                    >
                                        <CustomTypography variant="body2" component="div">
                                            {get_jobname_by_id(row.jobId)}
                                        </CustomTypography>
                                    </TableCell>
                                    <TableCell
                                        key={`player-row-level-${row.accountId}-${idx}`}
                                        sx={{ color: COLORS.third_background_text }}
                                        align="center"
                                    >
                                        <CustomTypography variant="body2" component="div">
                                            {row.level}
                                        </CustomTypography>
                                    </TableCell>
                                    <TableCell
                                        key={`player-row-guild-${row.accountId}-${idx}`}
                                        sx={{ color: COLORS.third_background_text }}
                                        align="center"
                                    >
                                        <CustomTypography variant="body2" component="div">
                                            {row.guildName}
                                        </CustomTypography>
                                    </TableCell>
                                    <TableCell
                                        key={`player-row-discord-${row.accountId}-${idx}`}
                                        sx={{ color: COLORS.third_background_text }}
                                        align="center"
                                    >
                                        <CustomTypography variant="body2" component="div">
                                            {row.discordId}
                                        </CustomTypography>
                                    </TableCell>
                                    <TableCell
                                        key={`player-row-lastseen-${row.accountId}-${idx}`}
                                        sx={{ color: COLORS.third_background_text }}
                                        align="center"
                                    >
                                        <CustomTypography variant="body2" component="div">
                                            {row.lastSeen}
                                        </CustomTypography>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow hover key={'player-row-nodata'}>
                                <TableCell
                                    sx={{ color: COLORS.third_background_text }}
                                    colSpan={columns.length}
                                    align="center"
                                >
                                    <CustomTypography color={COLORS.third_background_text} variant="subtitle1" component="div">No Data Available</CustomTypography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                sx={{
                    backgroundColor: COLORS.third_background,
                    color: COLORS.third_background_text,
                    flexShrink: 0,
                    overflow: 'hidden',
                }}
                count={data !== undefined ? data.total : 0}
                rowsPerPage={pageSize}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                slotProps={{
                    select: {
                        sx: {
                            backgroundColor: COLORS.third_background,
                            color: COLORS.third_background_text,
                            '& svg': {
                                color: COLORS.third_background_text,
                            },
                        },
                        MenuProps: {
                            PaperProps: {
                                sx: {
                                    backgroundColor: COLORS.third_background,
                                    color: COLORS.third_background_text,
                                },
                            },
                        },
                    },
                }}
            />
        </Paper>
    );
}

export default RoPDTableByAccount;
