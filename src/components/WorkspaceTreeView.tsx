import { ChangeEvent, FC, useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import DescriptionIcon from '@material-ui/icons/Description';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import PublicRoundedIcon from '@material-ui/icons/PublicRounded';
import AddBoxIcon from '@material-ui/icons/AddBox';
import TreeItemLabel from './TreeItemLabel';
import { useAuth } from '../authProvider';
import {
    useRouteMatch,
    useHistory,
    // useLocation 
} from 'react-router-dom';
import { getInternalArticles, getPublicArticles, getUserPrivateArticles } from '../services/articles.service';

export enum SpaceNames {
    public = 'public',
    internal = 'internal',
    private = 'private',
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(1),
            height: '100%',
            marginLeft: theme.spacing(1),
        },
        hr: {
            border: '1px solid ' + theme.palette.grey['500'],
            marginLeft: theme.spacing(-1),

        },
        spacer: {
            marginBottom: theme.spacing(0.8),
        }
    }),
);

interface Props {
    toggleEditor: (location: string) => void;
}

const WorkspaceTreeView: FC<Props> = ({ toggleEditor }) => {
    const classes = useStyles();
    const { user } = useAuth();
    const [expanded, setExpanded] = useState<string[]>([]);
    const [selectedArticle, setSelectedArticle] = useState<string>('');
    const [selectedSpace, setSelectedSpace] = useState<string>(SpaceNames.public);

    const [articleTree, setArticleTree] = useState<object | null>(null);

    const history = useHistory();
    const { url } = useRouteMatch();
    // const { pathname } = useLocation();

    // const addArticleToSpace = (spaceName: string) => {
    //     pushSpaceNameToHistory(spaceName);
    //     console.log(url);
    // }


    const handleArticleToggle = (event: ChangeEvent<{}>, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };

    const handleArticleSelect = (event: ChangeEvent<{}>, nodeId: string) => {
        // TODO Open article on main
        setSelectedArticle(nodeId);
    };

    const pushSpaceNameToHistory = (spaceName: string): void => {
        history.push(`${url}/${spaceName}`);
    }

    const handleSpaceSelect = (event: ChangeEvent<{}>, spaceName: string) => {
        setSelectedSpace(spaceName);
        pushSpaceNameToHistory(spaceName);
    };

    const toggleArticleEditor = (event: ChangeEvent<{}>): void => {
        handleSpaceSelect(event, selectedSpace);
        setSelectedArticle('');
        toggleEditor(selectedSpace); ///////////
    }


    const renderTree = (nodes: any) => {
        const keys = Object.keys(nodes);
        return keys.map(key => {
            const article = nodes[key];
            const title = article.title;
            let children: Array<object | null> = []
            if (article.children) {
                children = Object.keys(article.children).map(key => {
                    const child = {
                        [key]: article.children[key]
                    }
                    return child;
                }
                )
            }
            return (
                <TreeItem key={key} nodeId={key} label={
                    <TreeItemLabel addChild={(e) => console.log(e)} title={title} />
                }>
                    {
                        (children.length) ?
                            children.map((node: any) => renderTree(node))
                            : null}
                </TreeItem>
            );
        });
    };

    // const fetchPublicArticles = async () => {
    //     return (await getPublicArticles()).val();
    // };

    // const fetchInternalArticles = async () => {
    //     if (user) {
    //         return (await getInternalArticles()).val();
    //     }
    //     return fetchPublicArticles();
    // };
    // const fetchUserPrivateArticles = async () => {
    //     if (user) {
    //         return (await getUserPrivateArticles(user.uid)).val();
    //     }
    //     return fetchPublicArticles();
    // };


    useEffect(() => {
        const fetchArticles = async () => {
            switch (selectedSpace) {
                case SpaceNames.public:
                    setArticleTree((await getPublicArticles()).val());
                    break;
                case SpaceNames.internal:
                    setArticleTree((await getInternalArticles()).val());
                    break;
                case SpaceNames.private:
                    user && setArticleTree((await getUserPrivateArticles(user.uid)).val());
                    break;
            }
            setSelectedArticle('');
        };
        user && fetchArticles();
        // articleTree && renderTree(articleTree)
    }, [selectedSpace, user])


    return (
        <div className={classes.root}
        >
            {/* SPACES VIEW */}
            <TreeView
                selected={selectedSpace}
                onNodeSelect={handleSpaceSelect}
                defaultSelected={SpaceNames.public}
            >
                {
                    user &&
                    <>
                        <TreeItem
                            nodeId={SpaceNames.public}
                            label={
                                <TreeItemLabel noPlus title="Public articles" />
                            }
                            icon={<PublicRoundedIcon />}
                        >
                        </TreeItem>
                        <TreeItem
                            nodeId={SpaceNames.internal}
                            label={
                                <TreeItemLabel noPlus title="Internal articles" />
                            }
                            icon={<LockRoundedIcon />}
                        >
                        </TreeItem>
                        <TreeItem
                            nodeId={SpaceNames.private}
                            label={
                                <TreeItemLabel noPlus title="Private articles" />
                            }
                            icon={<PersonRoundedIcon />}
                        >
                        </TreeItem>

                        {/* TODO Fav */}

                        <hr className={classes.hr} />
                        <TreeItem
                            nodeId="addArticle"
                            label={
                                <TreeItemLabel noPlus title="Add article" />
                            }
                            icon={<AddBoxIcon />}
                            onClick={(e) => toggleArticleEditor(e)}
                        >
                        </TreeItem>
                        <div className={classes.spacer} />
                    </>
                }
            </TreeView>
            {/* ARTICLE VIEW */}
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                defaultEndIcon={<DescriptionIcon />}
                expanded={expanded}
                selected={selectedArticle}
                onNodeToggle={handleArticleToggle}
                onNodeSelect={handleArticleSelect}
            >
                {articleTree ?
                    renderTree(articleTree)
                    : null
                }
            </TreeView>
        </div>
    );
}

export default WorkspaceTreeView;