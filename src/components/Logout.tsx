import { FC, useEffect } from 'react'
import { useHistory } from 'react-router';
import { fireLogout } from '../services/auth.service'

const Logout: FC = () => {
    const history = useHistory();

    useEffect(() => {
        async function logout() {
            await fireLogout()
            history.push('/')
        }
        logout();
    })

    return (
        <div>
            Add loading spinner!!!
        </div>
    )
}

export default Logout;

