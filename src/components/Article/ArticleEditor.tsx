import 'react-quill/dist/quill.snow.css';

import { FC, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { Redirect, useHistory, useParams } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import PublishIcon from '@material-ui/icons/Publish';
import { ClassNameMap } from '@material-ui/styles';

import { useAuth } from '../../authProvider';
import { IArticle } from '../../models/models';
import { createNewArticleOnPath } from '../../services/articles.service';
import { SpaceNames } from '../Workspace/TreeView/WorkspaceTreeView';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            flexFlow: 'column',
            padding: theme.spacing(1),
        },
        title: {
            color: theme.palette.primary.main,
            textShadow: "-3px 3px 30px #b9b9b9"
        },
        btnGroup: {
            alignSelf: "flex-end",
            marginBottom: theme.spacing(2),
        },
        btn: {
            display: "flex",
            justifyContent: "space-between",
        },
        inputTitle: {
            fontSize: 24,
            borderRadius: '0'
        },
        quill: {
            marginTop: theme.spacing(0.5),
        },
        errorMsg: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            fontSize: 16,
        },
    }),
);

interface Props {
    articleData: IArticle | null,
    resetArticleData: () => void,
    // parentUrl: string;
}

interface Params {
    space: string;
    parent?: string;
    articleKey: string;
}


const ArticleEditor: FC<Props> = (props: Props) => {
    const classes: ClassNameMap = useStyles();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState<Array<string | null>>([])

    const { user } = useAuth();

    const params: Params = useParams();
    const history = useHistory();


    const newArticle: IArticle = {
        key: '',
        location: '',
        title: '',
        content: '',
        children: [],
        creatorUID: user ? user.uid : '',
        comments: [],
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const editArticle: IArticle | null = props.articleData;

    const setInitialData = () => {
        if (params.articleKey && editArticle) {
            return editArticle
        } return newArticle
    }

    const [article, setArticle] = useState<IArticle>(setInitialData());

    // const titleErrorMsg: string = 'You gotta have a title!'
    // const contentErrorMsg: string = 'Nothing to write?\nCome back later and '

    useEffect(() => {
        setArticle(currentArticle => {
            return {
                ...currentArticle,
                title: title,
                content: content,
                updatedAt: new Date()
            }
        })
    }, [title, content])


    const modules: object = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'strike', 'code-block'],
            [{ 'align': [] }, { 'direction': 'rtl' }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '+1' }, { 'indent': '-1' }],
            ['link', 'image'],
            ['clean']
        ],
    }
    const formats: string[] = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'code-block',
        'align', 'direction',
        'color', 'background',
        'list', 'ordered', 'bullet',
        'indent',
        'link', 'image',
        'clean'
    ]

    const isFormValid = (): boolean => {
        let valid: boolean = false;
        !title.trim() ? errors.push('title')
            : !content.trim() ? errors.push('content')
                : valid = true;
        return valid
    }

    const publishArticle = async () => {
        if (isFormValid()) {
            setErrors([]);
            const spaceName: string = params.space;
            let path: string = '';
            if (user) {
                if (spaceName === SpaceNames.private) {
                    if (props.articleData) {
                        path = `${props.articleData.location}/children`;
                    } else {
                        path = `articles/${spaceName}/${user.uid}`
                    }
                    await createNewArticleOnPath(path, article);
                } else {
                    if (props.articleData) {
                        path = `${props.articleData.location}/children`;
                    } else {
                        path = `articles/${spaceName}`
                    }
                    await createNewArticleOnPath(path, article);
                };
            };
            props.resetArticleData();
            history.push('/workspace');
            return;
        }
        console.log('Errors', errors);
        alert("Title and/or content can't be empty!")
    }

    const clearData = async () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure?')) {
            setContent('');
            setTitle('');
            setArticle(newArticle);
        }
    }

    if (!user) { return <Redirect to="/workspace" /> }

    return (
        <>
            <Typography variant="h4" className={classes.title}>New {params.space} article</Typography>
            <form noValidate autoComplete="off" className={classes.root}>
                <ButtonGroup size="large" variant="text" className={classes.btnGroup}>
                    <Button className={classes.btn} onClick={publishArticle}>
                        <PublishIcon />
                        <Typography variant="body1">Publish</Typography>
                    </Button>
                    <Button className={classes.btn} onClick={clearData}>
                        <DeleteIcon />
                        <Typography variant="body1">Clear</Typography>
                    </Button>
                    {/* <Button>Share</Button> */}
                </ButtonGroup>
                <TextField
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="standard-full-width"
                    placeholder="Title..."
                    fullWidth
                    InputProps={{ className: classes.inputTitle }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    autoFocus
                    variant="outlined"
                />
                <ReactQuill
                    theme="snow"
                    value={content}
                    className={classes.quill}
                    modules={modules}
                    formats={formats}
                    onChange={setContent}
                />
            </form>
        </>
    );
}

export default ArticleEditor;

