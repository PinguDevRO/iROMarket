'use client';

import { ChangeEvent } from "react";
import {
    useSearchParams
} from "next/navigation";
import Image from "next/image";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ItemTooptip, { FormatPercentColor } from "../../ItemTooltip/ItemTooltip";
import ImageTooptip from "@/components/ImageTooltip/ImageTooltip";
import { ImgWrapper } from "@/utils/component_utils";
import { COLORS } from '@/theme/colors';
import { ListingModel } from "@/models/listing/item-listing";
import { CustomTypography } from "@/utils/component_utils";
import { isNumeric, capitalizeStr } from "@/utils/string_utils";
import { useStore } from "@/store/useStore";


const copyToClipboard = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const span = event.currentTarget;
    const textToCopy = span.title;
    const originalText = span.innerText;

    navigator.clipboard.writeText(textToCopy).then(() => {
        span.innerText = 'Copied!';
        setTimeout(() => {
            if (document.body.contains(span)) {
                span.innerText = originalText;
            }
        }, 500);
    });
};


const SummaryTable = ({
    title,
    data,
}: {
    title: string;
    data: ListingModel | undefined;
}) => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const page = useStore((x) => x.page);
    const pageSize = useStore((x) => x.page_size);
    const setPage = useStore((x) => x.set_page);
    const setPageSize = useStore((x) => x.set_page_size);

    const columns = [
        "Name",
        "Quantity",
        "Price",
        "Shop Name",
        "Player Name",
        "Navigation"
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
        <Paper
            elevation={3}
            sx={{
                width: '100%',
                height: '100%',
                paddingX: 2,
                paddingTop: 2,
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: COLORS.third_background,
                overflow: 'hidden',
            }}
        >
            <Box
                display="flex"
                sx={{
                    color: COLORS.third_background_text,
                    paddingBottom: 1
                }}
            >
                <CustomTypography variant="h6" component="div">
                    {title}
                </CustomTypography>
            </Box>
            <TableContainer sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
                <Table stickyHeader aria-label="sticky table">
                    <colgroup>
                        <col style={{ width: '37.5%' }} />
                        <col style={{ width: '12.5%' }} />
                        <col style={{ width: '12.5%' }} />
                        <col style={{ width: '12.5%' }} />
                        <col style={{ width: '12.5%' }} />
                        <col style={{ width: '12.5%' }} />
                    </colgroup>
                    <TableHead>
                        <TableRow>
                            {columns.map((column, idx) => (
                                <TableCell
                                    key={'item-col-' + column + '-' + idx}
                                    sx={{ backgroundColor: COLORS.third_background, color: COLORS.third_background_text }}
                                    align={idx === 0 ? 'left' : 'center'}
                                >
                                    {column}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data !== undefined && data.items && data.items.length > 0 ? (
                            data.items.map((row, idx) => (
                                <TableRow hover key={`item-row-${row.itemId}-${idx}`}>
                                    <TableCell
                                        key={`item-row-name-${row.itemId}-${idx}`}
                                        sx={{ color: COLORS.third_background_text }}
                                        align="left"
                                    >
                                        <ImageTooptip
                                            itemId={row.itemId}
                                            itemName={row.itemName}
                                        >
                                            <Box display="flex" flexDirection="row" gap={2} alignItems="center">
                                                <ImgWrapper>
                                                    <Image
                                                        className="dark"
                                                        src={`https://db.irowiki.org/image/item/${row.itemId}.png`}
                                                        alt={row.itemName}
                                                        width={24}
                                                        height={24}
                                                        style={{ objectFit: "contain" }}
                                                    />
                                                </ImgWrapper>
                                                <a
                                                    href={`/listing/${row.itemId}?${params.toString()}`}
                                                    target="_self"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        textDecoration: "none",
                                                        fontSize: "14px",
                                                        lineHeight: 1.2,
                                                        color: COLORS.third_background_text,
                                                    }}
                                                >
                                                    {row.itemName}
                                                </a>
                                            </Box>
                                        </ImageTooptip>
                                    </TableCell>
                                    <TableCell
                                        key={`item-row-quantity-${row.itemId}-${idx}`}
                                        sx={{ color: COLORS.third_background_text }}
                                        align="center"
                                    >
                                        <CustomTypography variant="body2" component="div">
                                            {row.currentAmount}
                                        </CustomTypography>
                                    </TableCell>
                                    <TableCell
                                        key={`item-row-price-${row.itemId}-${idx}`}
                                        sx={{ color: COLORS.third_background_text }}
                                        align="center"
                                    >
                                        <ItemTooptip
                                            key={`item-row-tooltip-${row.itemId}-${idx}`}
                                            data={row}
                                            type={title === 'Vending' ? 'vending' : 'buying'}
                                        >
                                            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                                                <CustomTypography variant="body2" component="div">
                                                    {row.price}&nbsp;
                                                </CustomTypography>
                                                <FormatPercentColor
                                                    value={title === 'Vending' ? 0 : 0}
                                                    type={title === 'Vending' ? 'vending' : 'buying'}
                                                />
                                            </Box>
                                        </ItemTooptip>
                                    </TableCell>
                                    <TableCell
                                        key={`item-row-shopname-${row.itemId}-${idx}`}
                                        sx={{ color: COLORS.third_background_text }}
                                        align="center"
                                    >
                                        <CustomTypography variant="body2" component="div">
                                            {row.name}
                                        </CustomTypography>
                                    </TableCell>
                                    <TableCell
                                        key={`item-row-playername-${row.itemId}-${idx}`}
                                        sx={{ color: COLORS.third_background_text }}
                                        align="center"
                                    >
                                        <CustomTypography variant="body2" component="div">
                                            {row.ownerName}
                                        </CustomTypography>
                                    </TableCell>
                                    <TableCell
                                        key={`item-row-navigation-${row.itemId}-${idx}`}
                                        sx={{ color: COLORS.third_background_text }}
                                        align="center"
                                    >
                                        <span
                                            className="hover:underline cursor-pointer"
                                            style={{ color: COLORS.internal_link_text }}
                                            title={`/navi ${row.mapName} ${row.xCoordinate}/${row.yCoordinate}`}
                                            onClick={(el) => copyToClipboard(el)}
                                        >
                                            {capitalizeStr(row.mapName)}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow hover key={'item-row-nodata'}>
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

export default SummaryTable;
