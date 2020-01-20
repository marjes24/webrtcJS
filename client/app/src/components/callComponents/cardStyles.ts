import { makeStyles, createStyles } from '@material-ui/core';

export const useStyle = makeStyles(t =>
    createStyles({
        cardRoot: {
            minWidth: 300
        },
        cardContentRoot: {
            paddingTop: 0,
            minHeight: 125
        }
    })
);
