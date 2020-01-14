import React, { FC } from 'react';
import {
    Select,
    FormControl,
    MenuItem,
    makeStyles,
    createStyles,
    InputLabel,
    SelectProps,
    MenuItemProps
} from '@material-ui/core';

type Option = {
    value: MenuItemProps['value'];
    display: MenuItemProps['children'];
};

interface Props {
    label?: string;
    disabled?: boolean;
    onChange?: SelectProps['onChange'];
    options: Option[];
    value: SelectProps['value'];
}

const useStyles = makeStyles(t =>
    createStyles({
        root: {
            minWidth: 180
        },
        select: {
            '&:focus': {
                backgroundColor: 'white'
            }
        }
    })
);

/**
 * Material ui select with wrapper for common styling/props
 * @param props
 */
const MuiSelect: FC<Props> = props => {
    const classes = useStyles(props);

    return (
        <FormControl classes={{ root: classes.root }}>
            <InputLabel>{props.label}</InputLabel>
            <Select
                value={props.value}
                onChange={props.onChange}
                classes={{ select: classes.select }}
                disabled={props.disabled}
            >
                {props.options.map((opt, idx) => (
                    <MenuItem key={idx} value={opt.value}>
                        {opt.display}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export { MuiSelect };
