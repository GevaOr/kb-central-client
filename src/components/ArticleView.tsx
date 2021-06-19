import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FC } from 'react';
import { IArticle } from '../models/models';
import PlaceholderArticle from './PlaceholderArticle';
import parse from 'html-react-parser';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useAuth } from '../authProvider';
import { useRouteMatch, useParams } from 'react-router';



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
    data?: IArticle | null,
    addChild: (e: any) => void
}

interface Params {
    space: string;
    article?: string;
}

const ArticleView: FC<Props> = (props) => {
    const classes = useStyles();
    const { user } = useAuth();
    const { url } = useRouteMatch();
    const params: Params = useParams();
    // const [showPlusIcon, setShowIconStyle] = useState(false);

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
                                    <Button className={classes.btn} onClick={(e) => console.log(e)
                                    }>
                                        <Typography variant="body1">Edit</Typography>
                                    </Button>
                                    <Button className={classes.btn} onClick={(e) => console.log(e)
                                    }>
                                        <Typography variant="body1">Delete</Typography>
                                    </Button>
                                    {/* <Button>Share</Button> */}
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
