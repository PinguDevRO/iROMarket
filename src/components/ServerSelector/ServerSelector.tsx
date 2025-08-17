import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material';
import { COLORS } from '@/theme/colors';
import { capitalizeStr } from '@/utils/string_utils';
import { useStore, ServerKind } from '@/store/useStore';

const OPTIONS = ['chaos', 'thor', 'freya'];

const ServerSelector = () => {
    const server = useStore((x) => x.server);
    const setServer = useStore((x) => x.set_server);

    const handleChange = (event: SelectChangeEvent) => {
        const newValue = event.target.value;
        setServer(newValue.toLowerCase() as ServerKind);
    };

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
                        {capitalizeStr(opt)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default ServerSelector;
