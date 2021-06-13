import { Button, Typography } from '@material-ui/core';
import { FC, useState } from 'react'
import { useAuth } from '../authProvider';
import Container from '@material-ui/core/Container';

const HomeWelcome: FC = () => {
    const { user } = useAuth();
    const [productName] = useState('KB Central')

    return (
        <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} maxWidth="md" component="main">
            <Typography align="center" variant="h2">
                {user ?
                    `Welcome, ${user.displayName}!`
                    :
                    `Welcome to the ${productName} knowledge base!`
                }
            </Typography>
            <Button style={{ marginTop: 20 }} variant="contained" color="primary" href="/workspace" disableElevation size="large">
                Start reading!
            </Button>

        </Container>
    )
}

export default HomeWelcome
