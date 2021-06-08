import { Typography } from '@material-ui/core';
import { FC, useState } from 'react'
import { useAuth } from '../authProvider';

const HomeWelcome: FC = () => {
    const { user } = useAuth();
    const [productName] = useState('KB Central')

    return (
        <div>
            <Typography variant="h2">
                {user ?
                    `Welcome, ${user.displayName}!`
                    :
                    `Welcome to the ${productName} knowledge base!`
                }
            </Typography>
        </div>
    )
}

export default HomeWelcome
