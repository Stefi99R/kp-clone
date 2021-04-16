import { Route, Link } from 'react-router-dom';
import { removeCookies } from './config/axios-instance';
import { UserContext } from './contexts/UserContext';
import { Ads } from './pages/ads';
import { useQuery } from 'react-query';
import { fetchUserInfo } from './services/user';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { Ad } from './pages/ad';
import { LoginForm } from './pages/loginForm';
import { RegisterForm } from './pages/registerForm';
import { NewAd } from './pages/newAd';

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
    },
    {
        path: "/login",
        render: function LoginRoute() {
            return <PrivateRoute title="Login" component={LoginForm} />
        }
    },
    {
        path: "/register",
        render: function RegisterRoute() {
            return <PrivateRoute title="Register" component={RegisterForm} />
        }
    },
    {
        path: "/create",
        render: function CreateNewAd() {
            return <PrivateRoute title="Create a new Ad" component={NewAd} />
        }
    },

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
                            <li><Link to="/create">Add a new ad</Link></li>
                            <li><Link to="/login" onClick={removeCookies}>Sign out</Link></li>
                            <Component />
                        </>
                    ) : (
                        <>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                            <Component />
                        </>
                    )
                }
            />
        </>
    )
};