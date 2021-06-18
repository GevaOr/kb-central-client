// import { useState } from 'react';
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import { Tooltip, Typography } from '@material-ui/core';
import { FC } from 'react';
import { IArticle } from '../models/models';
// import { Link } from 'react-router-dom';
import PlaceholderArticle from './PlaceholderArticle'
import parse from 'html-react-parser';
import Typography from '@material-ui/core/Typography'


// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         article: {
// display: 'flex',
// width: '100%',
// flexWrap: 'wrap',
// justifyContent: 'space-between',
// alignItems: 'center',
// padding: theme.spacing(0.6),
//         },
//     }),
// );

interface Props {
    data?: IArticle | null,
    // space?: boolean,
    // addChild?: (event: MouseEvent) => void
}

const ArticleView: FC<Props> = (props) => {
    // const classes = useStyles();
    // const [showPlusIcon, setShowIconStyle] = useState(false);

    return (
        <div>
            {
                props.data ?
                    <>
                        <Typography variant="h2" color="initial">{props.data.title}</Typography>
                        {parse(props.data.content)}
                    </>
                    :
                    <PlaceholderArticle />
            }
        </div>
    )
}

export default ArticleView
