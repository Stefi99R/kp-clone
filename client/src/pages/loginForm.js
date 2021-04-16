import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import * as React from 'react';
import { UserContext } from '../contexts/UserContext';
import { useForm } from 'react-hook-form';
import { fetchUserInfo } from '../services/user';
import { loginUser } from '../services/auth';

export function LoginForm() {
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ requestError, setRequestError ] = useState('');
    const { setUser } = useContext(UserContext);

    const { register, handleSubmit, errors } = useForm({
        defaultValues: {username: "Griffin19", password: "Fi19TB4q"},
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
            }
        } catch(error) {
            setRequestError(error.response?.data?.errors);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Welcome back!</h1>
            <div>   
                <label htmlFor="username">Username:</label>
                <input 
                    id="username"
                    name="username"
                    type="username"
                    {...register('username')} />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    {...register('password')}>
                </input>
               
                    <button type="submit" disabled={isSubmitting}>
                        <Link to="/">
                            Login
                        </Link>
                    </button>
            </div>
        </form>
    )
}