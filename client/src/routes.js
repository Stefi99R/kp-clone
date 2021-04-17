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
import { EditAd } from './pages/editAd';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from './assets/images/logo.png';

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
    {
        path: "/ad/edit/:id",
        render: function AdEditRoute() {
            return <PrivateRoute title="Edit ad" component={EditAd} />
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
                            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
                            <Navbar.Brand href="/">
                                <img
                                    src={Logo}
                                    className="d-inline-block align-top"
                                    width='32'
                                    height='32'
                                    alt=""
                                />
                            </Navbar.Brand>
                            <Navbar.Brand href="/">Kp Clone</Navbar.Brand>
                                <Nav className="container-fluid">
                                    <Nav.Link className="ml-auto" href="/">Home</Nav.Link>
                                    <Nav.Link className="mr-auto" href="/create">Create a new ad</Nav.Link>
                                </Nav>
                                <Nav className="container-fluid">
                                    <Nav.Link>{username}</Nav.Link>
                                    <Nav.Link className="ml-auto" href="/login" onSelect={() => removeCookies()}>Sign out</Nav.Link>
                                </Nav>
                            </Navbar>
                            <div class="container my-5">
                                <Component />
                            </div>
                        </>
                    ) : (
                        <>
                            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
                            <Navbar.Brand padding='10px' href="/">
                                <img
                                    src={Logo}
                                    className="d-inline-block align-top"
                                    width='32'
                                    height='32'
                                    alt=""
                                />
                            </Navbar.Brand>
                            <Navbar.Brand href="/">Kp Clone</Navbar.Brand>
                                <Nav className="mr-auto">
                                    <Nav.Link href="/">Home</Nav.Link>
                                </Nav>
                                <Nav className="container-fluid">
                                    <Nav.Link  className="me-2" href="/login">Login</Nav.Link>
                                    <Nav.Link className="border-left pl-2 ml-auto" href="/register">Sign up</Nav.Link>
                                </Nav>
                            </Navbar>
                            <div class="container my-5">
                                <Component />
                            </div>
                        </>
                    )
                }
            />
        </>
    )
};