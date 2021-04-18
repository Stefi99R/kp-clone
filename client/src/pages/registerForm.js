import * as React from "react";
import { UserContext } from "../contexts/UserContext";
import { useForm } from 'react-hook-form';
import { registerUser } from "../services/auth";
import { useHistory } from 'react-router-dom';

function RegisterForm() {

    const [ isSubmitting, setIsSubmitting ] = React.useState(false);
    const [ requestError, setRequestError ] = React.useState('');
    const { setUser } = React.useContext(UserContext);
    const history = useHistory();

    const { register, handleSubmit, errors } = useForm({
        defaultValues: { username: "", password: "", phone: "" },
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
            <h1 style={{textAlign: 'center'}}><b>We welcome you to our store!</b></h1>
            <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 my-5">
                    <form method="POST" autocomplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input id="username"
                                name="username"
                                type="username"
                                {...register('username')} 
                                className="form-control" required/>
                                <div className="invalid-feedback">
                                    Please enter a username.
                                </div>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input id="password"
                                name="password"
                                type="password"
                                {...register('password')} 
                                className="form-control" required/>
                                <div className="invalid-feedback">
                                    Please enter a username.
                                </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="telephone" className="form-label">Telephone number</label>
                            <input id="phone"
                                    name="phone"
                                    type="text"
                                    {...register('phone')} 
                                    className="form-control"
                                    aria-describedby="phone" required/>
                                    <div className="invalid-feedback">
                                        Please enter a username.
                                    </div>
                            <div id="phone" className="form-text">We'll never share your username and telephone with anyone else.</div>
                        </div>
                        <div style={{justifyContent: 'center', alignItems: 'center', width: '100%', margin: '0 auto'}}>
                            <button 
                                type="submit" 
                                className="btn btn-primary btn-lg btn-block" 
                                disabled={isSubmitting}
                                style={{justifyContent: 'center', alignItems: 'center', width: '100%', margin: '0 auto'}}>Register</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </>
      );
}

export { RegisterForm };

