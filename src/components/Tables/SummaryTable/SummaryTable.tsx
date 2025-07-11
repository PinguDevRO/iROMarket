'use client';

import {
    useState,
    ChangeEvent
} from "react";
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
import { ItemListingModel } from "@/models/global/listing-summary";
import { CustomTypography } from "@/utils/component_utils";


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
    data: ItemListingModel[] | undefined;
}) => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(25);

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
        setRowsPerPage(+event.target.value);
        setPage(0);
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
                        {data !== undefined ? (
                            data
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, idx) => (
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
                                                {row.itemQuantity}
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
                                                        {row.itemPrice}&nbsp;
                                                    </CustomTypography>
                                                    <FormatPercentColor
                                                        value={title === 'Vending' ? row.averageSellPercent : row.averageBuyPercent}
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
                                                {row.shopName}
                                            </CustomTypography>
                                        </TableCell>
                                        <TableCell
                                            key={`item-row-playername-${row.itemId}-${idx}`}
                                            sx={{ color: COLORS.third_background_text }}
                                            align="center"
                                        >
                                            <CustomTypography variant="body2" component="div">
                                                {row.playerName}
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
                                                title={row.shopNavigation}
                                                onClick={(el) => copyToClipboard(el)}
                                            >
                                                {row.shopCity}
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
                count={data !== undefined ? data.length : 0}
                rowsPerPage={rowsPerPage}
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
