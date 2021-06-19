import { useState, MouseEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Tooltip, Typography } from '@material-ui/core';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { FC } from 'react';
// import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        treeLabelCont: {
            display: 'flex',
            width: '100%',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: theme.spacing(0.6),
        },
        treeIcon: {
            fontSize: 24,
            color: theme.palette.primary.main,
        },
    }),
);
interface Props {
    title: string,
    noPlus?: boolean,
    textColor?: "inherit" | "initial" | "primary" | "secondary" | "textPrimary" | "textSecondary" | "error" | undefined,
    addChild?: (event: MouseEvent) => void
}

const TreeItemLabel: FC<Props> = (props) => {
    const classes = useStyles();
    const [showPlusIcon, setShowIconStyle] = useState(false);
    const color = props.textColor ? props.textColor : "initial"

    return (
        <div
            className={classes.treeLabelCont}
            onMouseOver={() => setShowIconStyle(true)}
            onMouseLeave={() => setShowIconStyle(false)}
        >
            <Tooltip placement="top" title={props.title}>
                <Typography
                    variant="body1"
                    color={color}>
                    {props.title}
                </Typography>
            </Tooltip>

            {!props.noPlus &&
                <>
                {
                    showPlusIcon ?
                        <Tooltip hidden={!showPlusIcon} onClick={props.addChild} placement="right" title="Add child">
                            <AddBoxOutlinedIcon className={classes.treeIcon} />
                        </Tooltip>
                        :
                        null
                }
                </>
            }
        </div>
    )
}

export default TreeItemLabel
