import { Route, Link } from 'react-router-dom';
//import { removeCookies } from './config/axios-instance';
import { UserContext } from './contexts/UserContext';
import { Ads } from './pages/ads';
import { useQuery } from 'react-query';
import { fetchUserInfo } from './services/user';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { Ad } from './pages/ad';

export const routes = [
    {
        path: '/',
        render: function AdsRoute() {
            return <PrivateRoute title="Home" component={Ads} />
        }
    },
    {
        path: "/ad/:id",
        render: function AdRoute() {
            return <PrivateRoute title="Home" component={Ad} />
        }
    }
];

export function PrivateRoute({
    component: Component,
    title = '',
    ...props
}) {
    const isAuthenticated = Cookies.get('access_token');
    const { user, setUser } = useContext(UserContext);

    useQuery('user', async () => {
        const user = await fetchUserInfo();
        setUser(user)
    })
    const username = user?.username;
    return (
        <>
            <title>{title}</title>
            <Route
                {...props}
                render = {() => 
                    isAuthenticated ? (
                        <>
                            <p>{username}</p>
                            <li><Link to="/">Home</Link></li>
                            {/* <li><Link to="/create">Add a new ad</Link></li>
                            <li><Link to="/login" onClick={removeCookies}>Sing out</Link></li> */}
                            <Component /> { /* komponenta koja se nalazi ispod navbara */}
                        </>
                    ) : (
                        <>
                            <li><Link to="/">Home</Link></li>
                            {/* <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li> */}
                            <Component />
                        </>
                    )
                }
            />
        </>
    )
};