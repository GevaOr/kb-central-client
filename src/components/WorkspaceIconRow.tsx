import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { Link } from 'react-router-dom';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import EnhancedEncryptionRoundedIcon from '@material-ui/icons/EnhancedEncryptionRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import ContactSupportRoundedIcon from '@material-ui/icons/ContactSupportRounded';
import { useAuth } from '../authProvider';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(2),
            display: 'flex',
            height: '100%'
        },
        navIcon: {
            fontSize: 32,
            marginBottom: theme.spacing(3),
            color: theme.palette.primary.main,
        }
    }),
);

const WorkspaceIconRow = () => {
    const classes = useStyles();
    const { user } = useAuth();

    return (
        <Grid
            className={classes.root}
            container
            direction="column"
            justify="space-between"
            alignItems="center"
        >
            { user &&
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Grid item>
                        <Link to="#" >
                            <Tooltip title="New private article">
                                <EnhancedEncryptionRoundedIcon className={classes.navIcon} />
                            </Tooltip>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="#" >
                            <Tooltip title="New public article">
                                <AddBoxRoundedIcon className={classes.navIcon} />
                            </Tooltip>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="#" >
                            <Tooltip title="New personal article">
                                <PersonAddRoundedIcon className={classes.navIcon} />
                            </Tooltip>
                        </Link>
                    </Grid>
                </Grid>
            }
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
            >
                <Grid item>
                    <Link to="/" >
                        <Tooltip title="Home page">
                            <HomeRoundedIcon className={classes.navIcon} />
                        </Tooltip>
                    </Link>
                </Grid>
                <Grid item>
                    <Link to="#" >
                        <Tooltip title="Contact support">
                            <ContactSupportRoundedIcon className={classes.navIcon} />
                        </Tooltip>
                    </Link>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default WorkspaceIconRow
