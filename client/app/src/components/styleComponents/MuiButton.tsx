import React, { FC } from 'react';
import {
    Button,
    createStyles,
    makeStyles,
    ButtonProps
} from '@material-ui/core';
import { red, green } from '@material-ui/core/colors';

interface Props extends ButtonProps {
    display: 'red' | 'green';
}

const useStyle = makeStyles(t =>
    createStyles({
        root: {
            minWidth: 80,
            color: 'white',
            background: (props: Props) =>
                props.display === 'red' ? red['700'] : green['700'],
            '&:hover': {
                background: (props: Props) =>
                    props.display === 'red' ? red['900'] : green['900']
            }
        }
    })
);

/**
 * Material ui button with common styling for use accross app
 */
const MuiButton: FC<Props> = ({ display, ...props }) => {
    const classes = useStyle({ display });

    return (
        <Button
            classes={{
                root: classes.root
            }}
            variant="contained"
            {...props}
        >
            {props.children}
        </Button>
    );
};

export { MuiButton };
