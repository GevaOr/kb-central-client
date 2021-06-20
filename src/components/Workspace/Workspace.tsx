import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { fade, makeStyles, Theme } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle } from '@material-ui/icons';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import { useAuth } from '../../authProvider';
import { IArticle } from '../../models/models';
import {
    FlattenedArticleArr, getAllArticlesByTitle, getPublicArticlesByTitle
} from '../../services/articles.service';
import { fireLogout } from '../../services/auth.service';
import ArticleEditor from '../Article/ArticleEditor';
import ArticleView from '../Article/ArticleView';
import AddUser from './AddUser';
import SearchResults from './SearchResults';
import WorkspaceTreeView from './TreeView/WorkspaceTreeView';
import WorkspaceIconRow from './WorkspaceIconRow';

const drawerWidth = 260;

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    drawerTopRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
        cursor: 'pointer',
        '&:hover': {
            color: fade(theme.palette.common.white, 0.9),
        },
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.20),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


const Workspace: FC = () => {
    const classes: ClassNameMap = useStyles();
    const history = useHistory();
    const { url } = useRouteMatch();
    const { user, userData } = useAuth();
    const [isAuth, setIsAuth] = useState<boolean>();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuOpen, setMenuOpen] = useState(true);

    const [query, setQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<FlattenedArticleArr>([]);

    const optionsOpen = Boolean(anchorEl);
    const [currentArticleData, setCurrentArticleData] = useState<IArticle | null>(null);

    const searchQuery = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.trim().length === 0) {
            return;
        }
        let results: FlattenedArticleArr = [];
        if (user) {
            results = await getAllArticlesByTitle(query.toLowerCase(), user.uid)
        } else {
            results = await getPublicArticlesByTitle(query.toLowerCase())
        }
        toggleSearchResults(results);
    }

    const toggleSearchResults = (results: FlattenedArticleArr): void => {
        setSearchResults(results);
        history.push(`${url}/search/${query}`)
    }

    const handleMenuSelect = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleOptionsClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerOpen = () => {
        setMenuOpen(true);
    };
    const handleDrawerClose = () => {
        setMenuOpen(false);
    };

    const goHome = () => {
        history.push("/")
    }

    const addChildPage = (location: string): void => {
        history.push(`${location}/new`);
    }

    const toggleEditor = (newLocation: string): void => {
        history.push(`${url}/${newLocation}/new`);
    };

    const toggleArticle = (newLocation: string, data: IArticle | null): void => {
        setCurrentArticleData(data);
        history.push(`${url}/${newLocation}`);
    };

    useEffect(() => {
        user ? setIsAuth(true) : setIsAuth(false);
    }, [user])

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, menuOpen && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, menuOpen && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography onClick={goHome} variant="h6" className={classes.title}>
                        KB Central
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <form onSubmit={searchQuery}>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </form>
                    </div>
                    {isAuth && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenuSelect}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={optionsOpen}
                                onClose={handleOptionsClose}
                            >
                                {
                                    userData?.isAdmin &&
                                    <MenuItem onClick={async () => {
                                        await handleOptionsClose();
                                        history.push(
                                            `${url}/addusers`
                                        );
                                    }}>Add User</MenuItem>
                                }
                                <MenuItem onClick={async () => {
                                    await fireLogout();
                                    history.push("/")
                                }
                                }>Log out</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !menuOpen && classes.drawerPaperClose),
                }}
                open={menuOpen}
            >
                <div className={classes.drawerTopRow}>
                    <Typography variant="h6" color="textPrimary">Hi, {user ? user.displayName : 'Guest'}!</Typography>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                {menuOpen ?
                    <WorkspaceTreeView
                        toggleEditor={toggleEditor}
                        toggleArticle={toggleArticle}
                        resetArticleData={() => setCurrentArticleData(null)}
                    />
                    : <WorkspaceIconRow toggleEditor={toggleEditor} />
                }
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Switch>
                        <Route path={`${url}/search/:query`}>
                            <SearchResults
                                emitArticleData={toggleArticle}
                                searchResults={searchResults}
                            />
                        </Route>
                        <Route exact path={`${url}/addusers`}>
                            {userData?.isAdmin ? <AddUser /> : <Redirect to="/" />}
                        </Route>
                        <Route exact path={`${url}/:space/:parent?/new`}>
                            <ArticleEditor
                                articleData={currentArticleData}
                                resetArticleData={() => setCurrentArticleData(null)}
                            />
                        </Route>
                        <Route exact path={`${url}/:space/:articleKey/edit`}>
                            <ArticleEditor
                                articleData={currentArticleData}
                                resetArticleData={() => setCurrentArticleData(null)}
                            />
                        </Route>
                        <Route path={`${url}/:space/:article?`}>
                            <ArticleView
                                addChild={addChildPage}
                                data={currentArticleData}
                            />
                        </Route>
                    </Switch>
                </Container>
            </main>
        </div>
    )
}

export default Workspace;