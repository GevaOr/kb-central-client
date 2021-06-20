import { FC, useState } from 'react';

import { Button, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import { useAuth } from '../../authProvider';

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
            <Button style={{ marginTop: 50 }} variant="contained" color="primary" href="/workspace" disableElevation size="large">
                Start reading!
            </Button>

        </Container>
    )
}

export default HomeWelcome
