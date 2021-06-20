import { FC } from 'react';
// import { useHistory } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { FlattenedArticleArr } from '../../services/articles.service';
import { IArticle } from '../../models/models';
import { useParams } from 'react-router-dom';

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
    emitArticleData: (newLocation: string, data: IArticle | null) => void
}

const SearchResults: FC<Props> = ({ searchResults, emitArticleData }) => {
    const classes = useStyles();
    const { query } = useParams<{ query: string }>();

    const extractPath = (fullLocation: string | null): string => {
        if (fullLocation === null) {
            return ''
        }
        const locationArr: string[] = fullLocation.split('/');
        const spaceName: string = locationArr[1];
        const key: string = locationArr[locationArr.length - 1];
        return `${spaceName}/${key}`

    }

    return (<>
        <Typography variant="h3" color="initial">Results for "{query}":</Typography>
        <div className={classes.root}>
            <List component="nav">
                {searchResults.length > 0 ?
                    searchResults.map(result => {
                        if (result) {
                            return (
                                <ListItem button onClick={() => emitArticleData(extractPath(result.location), result)}>
                                    <ListItemText primary={result.title} />
                                </ListItem>
                            )
                        } return null
                    })
                    :
                    <ListItem >
                        <ListItemText primary="No results." />
                    </ListItem>
                }
            </List>
        </div>
    </>
    )
}

export default SearchResults;