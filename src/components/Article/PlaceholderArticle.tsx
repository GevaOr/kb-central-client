import { Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    title: {
        marginTop: theme.spacing(10),
        opacity: 0.7,

    },
    leftArrowCont: {
        marginTop: theme.spacing(8.3),
        display: "flex",
        alignItems: "center",
    },
    topArrowCont: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        marginRight: theme.spacing(6),

    },
    leftArrow: {
        marginRight: theme.spacing(2)
    },
    topArrow: {
        marginRight: theme.spacing(6)
    }
}))

interface Props {

}

const PlaceholderArticle = (props: Props) => {
    const classes: ClassNameMap = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <div className={classes.topArrowCont}>
                <ArrowUpwardIcon fontSize="large" className={classes.topArrow} />
                <Typography variant="subtitle1">Search for articles</Typography>
            </div>
            <div className={classes.leftArrowCont}>
                <ArrowBackIcon fontSize="large" className={classes.leftArrow} />
                <Typography variant="subtitle1">Add/read articles</Typography>
            </div>
            <div>
                <Typography align="center" className={classes.title} variant="h2">Start Working!</Typography>
            </div>
        </div>
    )
}

export default PlaceholderArticle
