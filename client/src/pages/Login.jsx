import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMyContext } from '../contexts/MyContext';
import { useState } from 'react';
import Loading from '../components/Loading';
import '../scss/login.scss';

const Login = () => {
    const { setIsAuthenticated } = useMyContext();
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .min(3, 'Must be 3 characters or more')
                .required('Username is required'),
            password: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .required('Password is required'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const response = await fetch('http://127.0.0.1:5000/user-login/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('session_id', data.session_id);
                    setIsAuthenticated(true);
                } else {
                    const error = await response.json();
                    alert(error.message);
                }
            } catch (e) {
                console.error(`Error during login: ${e}`);
                alert('An error occurred during login');
            } finally {
                setLoading(false);
            }
        }
    });
    return (
        <section className="login-section">
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <h2>Login</h2>
                    </div>
                    <form onSubmit={formik.handleSubmit} className='login-form'>
                        <div className='form-group'>
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                name="username"
                                className='form-input'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                                required
                            />
                            {formik.touched.username && formik.errors.username ? (
                                <p className='error-msg'>{formik.errors.username}</p>
                            ) : null}
                        </div>
                        <div className='form-group'>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                name="password"
                                className='form-input'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                required
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <p className='error-msg'>{formik.errors.password}</p>
                            ) : null}
                        </div>
                        <button type="submit" className='login-btn' disabled={loading}>
                            Login
                        </button>
                        {loading && <Loading />}
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login