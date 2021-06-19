import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FC } from 'react';
import { IArticle } from '../models/models';
import PlaceholderArticle from './PlaceholderArticle';
import parse from 'html-react-parser';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useAuth } from '../authProvider';
import {
    useRouteMatch,
    // useParams
} from 'react-router';
import { deleteArticleByPath } from '../services/articles.service';



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
    data: IArticle | null,
    addChild: (parent: string) => void,
}

// interface Params {
//     space: string;
//     parent?: string;
// }

const ArticleView: FC<Props> = (props) => {
    const classes = useStyles();
    const { user } = useAuth();
    const { url } = useRouteMatch();

    const deleteArticle = () => {
        if (props.data) {
            const location = props.data.location;
            deleteArticleByPath(location);
        }
    }

    return (
        <div >
            {
                props.data ?
                    <div className={classes.root}>
                        {user &&
                            <div className={classes.btnCont}>
                                <ButtonGroup size="large" variant="text" className={classes.btnGroup}>
                                <Button className={classes.btn} onClick={() => props.addChild(url)}>
                                        <Typography variant="body1">Add Child</Typography>
                                    </Button>
                                {/* <Button className={classes.btn} onClick={(e) => console.log(e)
                                    }>
                                        <Typography variant="body1">Edit</Typography>
                                    </Button> */}
                                <Button className={classes.btn} onClick={deleteArticle}>
                                        <Typography variant="body1">Delete</Typography>
                                </Button>
                                </ButtonGroup>
                            </div>
                        }
                        <Typography variant="h2" color="initial">{props.data.title}</Typography>
                        {parse(props.data.content)}
                    </div>
                    :
                    <PlaceholderArticle />
            }
        </div>
    )
}

export default ArticleView
