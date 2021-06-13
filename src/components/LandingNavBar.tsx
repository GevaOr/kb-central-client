import { FC } from 'react'
import { useAuth } from '../authProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link as MuiLink } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { fireLogout } from '../services/auth.service';

const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        marginBottom: theme.spacing(1)
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    muiLink: {
        margin: theme.spacing(1, 1.5),
    },
    routerLink: {
        color: 'inherit',
        textDecoration: 'inherit',
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
}));

const LandingNavBar: FC = () => {
    const { user, isLoading } = useAuth();
    const classes = useStyles();

    if (isLoading) return null; // TODO - Loading Spinner


    return (
        <>
            <CssBaseline />
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        <Link to="/" className={classes.routerLink}>KB Central</Link>
                    </Typography>
                    <nav>
                        <MuiLink variant="button" color="textPrimary" className={classes.muiLink}>
                            <Link to="/" className={classes.routerLink}>Home</Link>
                        </MuiLink>
                        <MuiLink variant="button" color="textPrimary" href="#" className={classes.muiLink}>
                            <a href="/workspace" className={classes.routerLink}>Workspace</a>
                        </MuiLink>
                        {user
                            ?
                            <Button onClick={fireLogout} color="primary" variant="outlined" className={classes.muiLink}>
                                Logout
                            </Button>
                            :
                            <Button color="primary" variant="outlined" className={classes.muiLink}>
                                <Link to="/signin" className={classes.routerLink}>Sign In</Link>
                            </Button>
                        }
                    </nav>
                </Toolbar>
            </AppBar>
        </>
        // <div>
        //     <ul>
        //         <li>
        //             <Link to="/">Home</Link>
        //         </li>
        //         <li>
        //             <a href="/workspace">Workspace</a>
        //         </li>
        //         {user
        //             ? <div>
        //                 <li>
        //                     <Link to="/logout">Logout</Link>
        //                 </li>
        //             </div>
        //             : <div>
        //                 <li>
        //                     <Link to="/signin">Sign in</Link>
        //                 </li>
        //                 <li>
        //                     <Link to="/signup">Sign Up</Link>
        //                 </li>
        //             </div>
        //         }
        //     </ul>
        // </div>
    )
}

export default LandingNavBar;

