import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { FlattenedArticleArr } from '../../services/articles.service';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            flexFlow: 'column',
            padding: theme.spacing(1),
        },
        btnCont: {
            display: 'flex',
            flexFlow: 'column',
        },
        btnGroup: {
            alignSelf: "flex-end",
            marginBottom: theme.spacing(2),
        },
        btn: {
            display: "flex",
            justifyContent: "space-between",
        },
    }),
);

interface Props {
    searchResults: FlattenedArticleArr,
    query: string
}

const SearchResults: FC<Props> = ({ searchResults, query }) => {
    const classes = useStyles();
    const history = useHistory()

    return (<>
        <Typography variant="h2" color="initial">Results for "{query}"</Typography>
        <div className={classes.root}>
            <List component="nav">
                {searchResults.map(result => {
                    const space = result?.location.split('/')[1];
                    const articleUrl = `/workspace/${space}/${result?.key}`;
                    return (
                        <ListItem button onClick={() => history.push(articleUrl)}>
                            <ListItemText primary={result?.title} />
                        </ListItem>
                    )
                })}
            </List>
        </div>
    </>
    )
}

export default SearchResults
