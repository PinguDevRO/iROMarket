'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { COLORS } from '@/theme/colors';
import { useStore } from '@/store/useStore';

const ListingSearchBar = ({
    searchInput
}: {
    searchInput?: string;
}) => {
    const router = useRouter();
    const [query, setQuery] = useState<string>('');
    const setSearchQuery = useStore((x) => x.set_search_query);

    const handleOnSearch = (query: string) => {
        setSearchQuery(query);
        router.push('/');
    };

    const sanitizeInput = (value: string) => {
        return value.replace(/[^\w\s]/gi, '');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            handleOnSearch(query);
        }
    };

    useEffect(() => {
        if (searchInput !== undefined && searchInput.length > 0 && searchInput !== query) {
            const sanitized = sanitizeInput(searchInput);
            setQuery(sanitized);
            handleOnSearch(sanitized);
        }
    }, [searchInput]);

    return (
        <TextField
            value={query}
            onChange={(e) => setQuery(sanitizeInput(e.target.value))}
            onKeyDown={handleKeyDown}
            placeholder="Search..."
            variant="outlined"
            size="small"
            fullWidth
            sx={{
                input: {
                    color: COLORS.secondary_background_text,
                },
                '& .MuiOutlinedInput-root': {
                    backgroundColor: COLORS.second_background,
                    borderRadius: 2,
                    '& fieldset': {
                        borderColor: COLORS.chinese_silver,
                    },
                    '&:hover fieldset': {
                        borderColor: COLORS.secondary_background_text,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: COLORS.secondary_background_text,
                    },
                },
            }}
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => handleOnSearch(query)} edge="end">
                                <SearchIcon sx={{ color: COLORS.secondary_background_text }} />
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
};

export default ListingSearchBar;
