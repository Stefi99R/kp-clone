import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import * as React from 'react';
import { UserContext } from '../contexts/UserContext';
import { useForm } from 'react-hook-form';
import { fetchUserInfo } from '../services/user';
import { loginUser } from '../services/auth';
import { useHistory } from 'react-router-dom';

export function LoginForm() {
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ requestError, setRequestError ] = useState('');
    const { setUser } = useContext(UserContext);
    const history = useHistory();

    const { register, handleSubmit, errors } = useForm({
        defaultValues: {username: "", password: ""},
    });

    async function onSubmit({ username, password }) {
        try {
            setIsSubmitting(true);
            const requestData = {
                username,
                password
            }

            await loginUser(requestData);
            const user = await fetchUserInfo();

            if (user) {
                await setUser(user);
                history.push(`/`);
            }
        } catch(error) {
            setRequestError(error.response?.data?.errors);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
        <h1 style={{textAlign: 'center'}}><b>Welcome back!</b></h1>
        <form onSubmit={handleSubmit(onSubmit)} style={{justifyContent: 'center', alignItems: 'center'}}>
            <div style={{justifyContent: 'center', alignItems: 'center', width: '50%', margin: '0 auto'}}>
                <label htmlFor="username">Username</label>
                <input placeholder="Enter your username..."
                    id="username"
                    name="username"
                    type="username"
                    {...register('username')} 
                    className="form-control" 
                    aria-describedby="emailHelp" required/>
                    <div className="invalid-feedback">
                        Please enter a username.
                    </div>
            </div>
            <br/>
            <div style={{justifyContent: 'center', alignItems: 'center', width: '50%', margin: '0 auto'}}>
                <label htmlFor="password">Password</label>
                <input placeholder="Enter your password..."
                    id="password"
                    name="password"
                    type="password"
                    {...register('password')} 
                    className="form-control" required/>
                    <div className="invalid-feedback">
                        Please enter a username.
                    </div>
            </div>
            <br/>
            <div style={{justifyContent: 'center', alignItems: 'center', width: '50%', margin: '0 auto'}}>
                <button 
                    type="submit" 
                    className="btn btn-primary btn-lg btn-block" 
                    disabled={isSubmitting}
                    style={{justifyContent: 'center', alignItems: 'center', width: '100%', margin: '0 auto'}}>Login</button>
            </div>
            
        </form>
        </>
    )
}
