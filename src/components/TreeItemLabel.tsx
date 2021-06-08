import { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Tooltip, Typography } from '@material-ui/core';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        treeLabelCont: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            // TODO stop + from expanding box
            padding: theme.spacing(0.6),
            width: '100%',
        },
        treeIcon: {
            fontSize: 24,
            color: theme.palette.primary.main,
        },
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
                    variant="body1"
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
