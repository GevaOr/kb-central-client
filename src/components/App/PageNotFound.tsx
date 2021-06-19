import { FC } from 'react';
import { Link } from 'react-router-dom';

const PageNotFound: FC = () => {
    return (
        <div>
            <p>PAGE NOT FOUND</p>
            <div>Take me <Link to="/">Home</Link></div>
        </div>
    )
}

export default PageNotFound;

