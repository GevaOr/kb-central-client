import { FC, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ClassNameMap } from '@material-ui/styles';
import { IArticle } from '../models/models';
import { Button } from '@material-ui/core';
// import { useAuth } from '../authProvider';
// import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            flexFlow: 'column',
            padding: theme.spacing(1),
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


const ArticleEditor: FC = () => {
    const classes: ClassNameMap = useStyles();
    // const { user } = useAuth();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState<Array<string | null>>([])
    const [article, setArticle] = useState<IArticle>({
        title: '',
        content: '',
        hasChildren: false,
        creatorUID: '', ////////////////////////
        comments: [],
        createdAt: new Date(),
        updatedAt: new Date()
    });

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

    // const onChangeTitle = (value: string): void => {
    //     setArticle(article => {
    //         return {
    //             ...article,
    //             title: value
    //         }
    //     })
    // }

    // const onChangeContent = (value: string): void => {
    //     setArticle(article => {
    //         return {
    //             ...article,
    //             content: value
    //         }
    //     })
    // }

    const isFormValid = (): boolean => {
        let valid: boolean = false;
        !title.trim() ? errors.push('title')
            : !content.trim() ? errors.push('content')
                : valid = true;
        return valid
    }

    const publishArticle = (): void => {
        if (isFormValid()) {
            setErrors([]);
            console.log(article);
            /// TODO firebase
            return;
        }
        console.log('Errors', errors);
        alert("Title and/or content can't be empty!")
    }

    return (
        <form noValidate autoComplete="off" className={classes.root}>
            <div>
                <Button onClick={publishArticle} variant="outlined" color="primary">Publish</Button>
            </div>
            {/* <Alert hidden={!errors.includes('title')} className={classes.errorMsg} variant="standard" severity="error">
                {titleErrorMsg}
            </Alert> */}
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
            // margin="normal"
            // label="Label"
            // helperText="Full width!"
            />
            {/* <Alert hidden={!errors.includes('content')} className={classes.errorMsg} variant="filled" severity="error">
                {contentErrorMsg}
            </Alert> */}
            <ReactQuill
                theme="snow"
                value={content}
                className={classes.quill}
                modules={modules}
                formats={formats}
                onChange={setContent}
            />
        </form>
    );
}

export default ArticleEditor;

