import { FC } from 'react'
// import { useAuth } from '../authProvider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link as MuiLink } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <MuiLink color="inherit" href="https://material-ui.com/">
                KB Central
            </MuiLink>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%'
    },
}));

const LandingFooter: FC = () => {
    const classes = useStyles();

    return (
        <Container component="footer" className={classes.footer}>
            <Grid container spacing={4} justify="space-evenly">
                <Grid item xs={6} sm={3}>
                    <Typography variant="h6" color="textPrimary" gutterBottom>
                        KB Central
                    </Typography>
                </Grid>
            </Grid>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    )
}

export default LandingFooter
