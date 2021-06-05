import { FC, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { SvgIconTypeMap, Tooltip, Typography } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        treeLabelCont: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0.5),
            width: '100%',
            justifyItems: 'space-around',
            justifyContent: 'center',
        },
        treeIcon: {
            fontSize: 24,
            color: theme.palette.primary.main,
            // marginLeft: theme.spacing(2)
        },
        treeLabel: {
            // marginLeft: theme.spacing(0.8),
        }
    }),
);
interface Props {
    title: string,
    articleID?: string,
    // icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
}

const TreeItemLabel = (props: Props) => {
    const classes = useStyles();
    const [showPlusIcon, setShowIconStyle] = useState(false);

    return (
        <div
            className={classes.treeLabelCont}
            onMouseOver={() => {
                if (props.articleID) { setShowIconStyle(true) }
            }}
            onMouseLeave={() => {
                if (props.articleID) { setShowIconStyle(false) }
            }}
        >
            {/* {
                    props.icon &&
                    <props.icon className={classes.treeIcon} />
                } */}
            <Tooltip title={props.title}>
                <Typography
                    className={classes.treeLabel}
                    variant="h6"
                    color="initial">
                    {props.title}
                </Typography>
            </Tooltip>
            {
                showPlusIcon &&
                <Link
                    to={
                        props.articleID + `/new` //////
                    }>
                    <Tooltip title="Add child">
                        <AddBoxOutlinedIcon className={classes.treeIcon} />
                    </Tooltip>
                </Link>
            }
        </div>
    )
}

export default TreeItemLabel
