import { Typography } from '@material-ui/core';
import { FC, useState } from 'react'
import { useAuth } from '../authProvider';

const Home: FC = () => {
    const { user } = useAuth();
    const [productName] = useState('KB Central')

    return (
        <div>
            {user ?
                // User message:
                <div>
                    <Typography variant="h2">
                        Welcome, {user.displayName}!
                    </Typography>
                </div>
                // Default message:
                : <div>
                    <Typography variant="h2">
                        Welcome to the {productName} knowledge base!
                    </Typography>
                </div>
            }
        </div>
    )
}

export default Home;

