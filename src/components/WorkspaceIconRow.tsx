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
import { FC } from 'react';
import { SpaceNames } from './WorkspaceTreeView';

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
        },
        newArticleIcons: {
            cursor: "pointer",
        }
    }),
);

interface Props {
    toggleEditor: (space: string) => void;
}

const WorkspaceIconRow: FC<Props> = (props) => {
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
            {user &&
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                <Grid item className={classes.newArticleIcons} onClick={() => {
                    props.toggleEditor(SpaceNames.public)
                }}>
                    <Tooltip title={`New ${SpaceNames.public} article`}>
                        <AddBoxRoundedIcon className={classes.navIcon} />
                    </Tooltip>
                    </Grid>
                <Grid item className={classes.newArticleIcons} onClick={() => {
                    props.toggleEditor(SpaceNames.internal)
                }}>
                    <Tooltip title={`New ${SpaceNames.internal} article`}>
                        <EnhancedEncryptionRoundedIcon className={classes.navIcon} />
                    </Tooltip>
                    </Grid>

                <Grid item className={classes.newArticleIcons} onClick={() => {
                    props.toggleEditor(SpaceNames.private)
                }}>
                    <Tooltip title={`New ${SpaceNames.private} article`}>
                        <PersonAddRoundedIcon className={classes.navIcon} />
                    </Tooltip>
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
