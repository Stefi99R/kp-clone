import * as React from "react";
import { UserContext } from "../contexts/UserContext";
import { useForm } from 'react-hook-form';
import { registerUser } from "../services/auth";
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterForm() {

    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [requestError, setRequestError] = React.useState('');
    const { setUser } = React.useContext(UserContext);
    const history = useHistory();

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { username: "", password: "", phone: "" },
    });

    toast.configure({
        autoClose: 4000,
        draggable: false,
        bodyClassName: "text-sm font-white font-med block p-10"
    });

    async function onSubmit({ username, password, phone }) {
        try {
            setIsSubmitting(true);

            const requestData = {
                username,
                password,
                phone
            };

            const { user } = await registerUser(requestData);
            console.log(user)
            if (user) {
                await setUser(user);
                history.push(`/`);
            }

        } catch (error) {
            setRequestError(error.response?.data?.errors);
            toast.error("Username already exists.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <ToastContainer style={{ width: "250px" }} />
            <h1 style={{ textAlign: 'center' }}><b>We welcome you to our store!</b></h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 my-5">
                        <form method="POST" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input id="username"
                                    name="username"
                                    type="username"
                                    {...register('username', { required: true, maxLength: 20, minLength: 4 })}
                                    className="form-control" />
                                <span style={{ color: 'red' }}>{errors.username && "Please enter a valid username (4-20 characters)"}</span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input id="password"
                                    name="password"
                                    type="password"
                                    {...register('password', { required: true, maxLength: 20, minLength: 8 })}
                                    className="form-control" />
                                <span style={{ color: 'red' }}>{errors.password && "Please enter a valid password (8-20 characters)"}</span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="telephone" className="form-label">Telephone number</label>
                                <input id="phone"
                                    name="phone"
                                    type="text"
                                    // this pattern mathes phone numbers like:  123-456-7890
                                    //                                            (123) 456-7890
                                    //                                            123 456 7890
                                    //                                            123.456.7890
                                    //                                            +91 (123) 456-7890
                                    {...register('phone', { pattern: '^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$', required: true })}
                                    className="form-control"
                                    aria-describedby="phone" />
                                <span style={{ color: 'red' }}>{errors.phone && "Please enter a valid 10-digit phone number"}</span>
                                <div id="phone" className="form-text">We'll never share your username and telephone with anyone else.</div>
                            </div>
                            <div style={{ justifyContent: 'center', alignItems: 'center', width: '100%', margin: '0 auto' }}>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg btn-block"
                                    disabled={isSubmitting}
                                    style={{ justifyContent: 'center', alignItems: 'center', width: '100%', margin: '0 auto' }}>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export { RegisterForm };

