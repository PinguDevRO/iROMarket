import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material';
import { COLORS } from '@/theme/colors';

const DEFAULT_QUERY_VALUE = 'Chaos';
const OPTIONS = ['Chaos', 'Thor', 'Freya'];

const ServerSelector = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [server, setServer] = useState(DEFAULT_QUERY_VALUE);

    const handleChange = (event: SelectChangeEvent) => {
        const newValue = event.target.value;
        setServer(newValue);

        const current = new URLSearchParams(searchParams.toString());
        current.set('server', newValue);
        router.push(`${pathname}?${current.toString()}`);
    };

    useEffect(() => {
        const current = new URLSearchParams(searchParams.toString());
        const existing = current.get('server');

        if (!existing) {
            current.set('server', DEFAULT_QUERY_VALUE);
            router.replace(`${pathname}?${current.toString()}`);
            setServer(DEFAULT_QUERY_VALUE);
        } else {
            setServer(existing);
        }
    }, [pathname, searchParams, router]);

    return (
        <FormControl
            size="small"
            sx={{
                minWidth: { xs: 100, md: 200 },
                '& .MuiInputLabel-root': { color: COLORS.secondary_background_text },
                '& .MuiOutlinedInput-root': {
                    color: COLORS.secondary_background_text,
                    backgroundColor: COLORS.second_background,
                    borderRadius: 2,
                    paddingRight: '8px',
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
                '& .MuiSvgIcon-root': {
                    color: COLORS.secondary_background_text,
                },
                '& .MuiSelect-select': {
                    padding: '8.5px 14px',
                    fontSize: '0.875rem',
                },
            }}
        >
            <InputLabel id="server-select-label">Server</InputLabel>
            <Select
                labelId="server-select-label"
                id="server-select"
                value={server}
                label="Server"
                onChange={handleChange}
            >
                {OPTIONS.map((opt, idx) => (
                    <MenuItem key={idx} value={opt}>
                        {opt}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default ServerSelector;
