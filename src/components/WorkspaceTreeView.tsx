import React, { ChangeEvent, FC, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import DescriptionIcon from '@material-ui/icons/Description';
import Tooltip from '@material-ui/core/Tooltip';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import EnhancedEncryptionRoundedIcon from '@material-ui/icons/EnhancedEncryptionRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import { Typography } from '@material-ui/core';
import TreeItemLabel from './TreeItemLabel';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(1),
            height: '100%',
        },
        hr: {
            border: '1px solid ' + theme.palette.grey['500'],
        },
    }),
);

const WorkspaceTreeView: FC = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState<string[]>([]);
    const [selected, setSelected] = useState<string[]>([]);

    const handleToggle = (event: ChangeEvent<{}>, nodeIds: string[]) => {
        console.log(event)
        setExpanded(nodeIds);
    };

    const handleSelect = (event: ChangeEvent<{}>, nodeIds: string[]) => {
        console.log(event)
        setSelected(nodeIds);
    };

    return (
        <div>

            <hr className={classes.hr} />
            {/* ARTICLE VIEW */}
            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                defaultEndIcon={<DescriptionIcon />}
                expanded={expanded}
                selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
            >
                <TreeItem
                    nodeId="0"
                    label={
                        <TreeItemLabel title="Test1" articleID="1234" />
                    }>
                    <TreeItem
                        nodeId="1"
                        label={
                            <TreeItemLabel title="Test2" articleID="1233" />
                        }>
                    </TreeItem>
                </TreeItem>
                <TreeItem
                    nodeId="2"
                    label={
                        <TreeItemLabel title="Test3" articleID="1232" />
                    }>
                </TreeItem>
            </TreeView>
        </div>
    );
}

export default WorkspaceTreeView;