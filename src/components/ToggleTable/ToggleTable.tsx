import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { COLORS } from '@/theme/colors';
import { capitalizeStr } from '@/utils/string_utils';

const DEFAULT_QUERY_VALUE = 'vending';
const OPTIONS = ['vending', 'buying'];

const ToggleTable = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [toggle, setToggle] = useState<string>(DEFAULT_QUERY_VALUE);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = (event.target as HTMLInputElement).value;
        setToggle(newValue);

        const current = new URLSearchParams(searchParams.toString());
        current.set('t', newValue);
        router.push(`${pathname}?${current.toString()}`);
    };

    useEffect(() => {
        const current = new URLSearchParams(searchParams.toString());
        const existing = current.get('t');

        if (!existing) {
            current.set('t', DEFAULT_QUERY_VALUE);
            router.replace(`${pathname}?${current.toString()}`);
            setToggle(DEFAULT_QUERY_VALUE);
        } else {
            setToggle(existing);
        }
    }, [pathname, searchParams, router]);

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
