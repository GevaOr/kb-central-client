import { FC } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../authProvider';

const LandingNavBar: FC = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) return null; // TODO - Loading Spinner


    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/workspace">Workspace</Link>
                </li>
                {user
                    ? <div>
                        <li>
                            <Link to="/logout">Logout</Link>
                        </li>
                    </div>
                    : <div>
                        <li>
                            <Link to="/signin">Sign in</Link>
                        </li>
                        <li>
                            <Link to="/signup">Sign Up</Link>
                        </li>
                    </div>
                }
            </ul>
        </div>
    )
}

export default LandingNavBar;

