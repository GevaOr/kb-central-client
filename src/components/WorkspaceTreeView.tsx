import { ChangeEvent, FC, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import DescriptionIcon from '@material-ui/icons/Description';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
// import Tooltip from '@material-ui/core/Tooltip';
// import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
// import EnhancedEncryptionRoundedIcon from '@material-ui/icons/EnhancedEncryptionRounded';
// import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
// import { Typography } from '@material-ui/core';
import PublicRoundedIcon from '@material-ui/icons/PublicRounded';
import TreeItemLabel from './TreeItemLabel';
import { useAuth } from '../authProvider';

enum SpaceNames {
    public = 'public',
    internal = 'internal',
    personal = 'personal',
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
    }),
);

const WorkspaceTreeView: FC = () => {
    const classes = useStyles();
    const { user } = useAuth();
    const [expanded, setExpanded] = useState<string[]>([]);
    const [selectedArticle, setSelectedArticle] = useState<string>('');
    const [selectedSpace, setSelectedSpace] = useState<string>(SpaceNames.public);

    const handleArticleToggle = (event: ChangeEvent<{}>, nodeIds: string[]) => {
        console.log('Toggle:', nodeIds)
        setExpanded(nodeIds);
    };

    const handleArticleSelect = (event: ChangeEvent<{}>, nodeId: string) => {
        console.log('Article select:', nodeId)
        // TODO Open article on main
        setSelectedArticle(nodeId);
    };

    const handleSpaceSelect = (event: ChangeEvent<{}>, nodeId: string) => {
        console.log('Space select:', nodeId)
        // TODO call server for the right articles
        setSelectedArticle('');
        setSelectedSpace(nodeId);
    };

    return (
        <div className={classes.root}
        >
            {/* SPACES VIEW */}
            <TreeView
                selected={selectedSpace}
                onNodeSelect={handleSpaceSelect}
            >
                {
                    user &&
                    <>
                        <TreeItem
                            nodeId={SpaceNames.public}
                            label={
                                <TreeItemLabel title="Public articles" />
                            }
                            icon={<PublicRoundedIcon />}
                        >
                        </TreeItem>
                        <TreeItem
                            nodeId={SpaceNames.internal}
                            label={
                                <TreeItemLabel title="Internal articles" />
                            }
                            icon={<LockRoundedIcon />}
                        >
                        </TreeItem>
                        <TreeItem
                            nodeId={SpaceNames.personal}
                            label={
                                <TreeItemLabel title="Personal articles" />
                            }
                            icon={<PersonRoundedIcon />}
                        >
                        </TreeItem>

                        <hr className={classes.hr} />
                    </>
                    // TODO Personal > Private
                    // TODO Fav
                    // TODO My Docs
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
                <TreeItem
                    nodeId="Test1"
                    label={
                        <TreeItemLabel title="Test1" articleID="1234" />
                    }>
                    <TreeItem
                        nodeId="Test2"
                        label={
                            <TreeItemLabel title="Test2" articleID="1233" />
                        }>
                    </TreeItem>
                </TreeItem>
                <TreeItem
                    nodeId="Test3"
                    label={
                        <TreeItemLabel title="Test3" articleID="1232" />
                    }>
                </TreeItem>
            </TreeView>
        </div>
    );
}

export default WorkspaceTreeView;