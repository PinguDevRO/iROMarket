import { ChangeEvent } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { COLORS } from '@/theme/colors';
import { capitalizeStr } from '@/utils/string_utils';
import { useStore, ItemSaleKind } from '@/store/useStore';

const OPTIONS = ['vending', 'buying'];

const ToggleTable = () => {
    const toggle = useStore((x) => x.item_sale_kind);
    const setToggle = useStore((x) => x.set_item_sale_kind);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = (event.target as HTMLInputElement).value;
        setToggle(newValue as ItemSaleKind);
    };

    return (
        <FormControl
            size="small"
            sx={{
                minWidth: { xs: 100, md: 220 },
                '& .MuiInputLabel-root': { color: COLORS.secondary_background_text },
                '& .MuiOutlinedInput-root': {
                    color: COLORS.secondary_background_text,
                    backgroundColor: COLORS.second_background,
                    borderRadius: 2,
                    paddingRight: '8px',
                },
                '& .MuiSvgIcon-root': {
                    color: COLORS.secondary_background_text,
                },
            }}
        >
            <RadioGroup
                row
                name="shop-type-radio-buttons"
                value={toggle}
                onChange={handleChange}
            >
                {OPTIONS.map((val, idx) => (
                    <FormControlLabel
                        key={idx}
                        value={val}
                        control={<Radio />}
                        label={capitalizeStr(val)}
                        sx={{
                            color: COLORS.secondary_background_text,
                        }}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default ToggleTable;
