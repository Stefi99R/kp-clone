import * as React from "react";
import { UserContext } from "../contexts/UserContext";
import { useForm } from 'react-hook-form';
import { registerUser } from "../services/auth";

export function RegisterForm() {

    const [ isSubmitting, setIsSubmitting ] = React.useState(false);
    const [ requestError, setRequestError ] = React.useState('');
    const { setUser } = React.useContext(UserContext);

    const { register, handleSubmit, errors } = useForm({
        defaultValues: { username: "example123" },
    });

    async function onSubmit({ username, password, phone }) {
        try {
            setIsSubmitting(true);

            const requestData = {
                username,
                password,
                phone
            };

            const user = await registerUser(requestData);
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
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <h1>Register</h1>
            <div>
                <label htmlFor="username">Username</label>
                <input
                id="username"
                name="username"
                type="username"
                {...register('username')}

                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                id="password"
                name="password"
                type="password"
                {...register('password')}
                />
            </div>
            <div>
                <label htmlFor="phone">Phone number</label>
                <input
                id="phone"
                name="phone"
                type="text"
                {...register('phone')}
                />
            </div>
            <button type="submit" disabled={isSubmitting}>
                Sign In
            </button>
        </form>
      );
}