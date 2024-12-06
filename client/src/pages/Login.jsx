import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useMyContext } from '../contexts/MyContext';
import '../scss/login.scss';

const Login = () => {
    const { setIsAuthenticated } = useMyContext();
    const navigate = useNavigate();

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
                .min(8, 'Must be 8 characters or more')
                .required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await fetch('http://127.0.0.1:5000/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('session_id', data.session_id);
                    console.log(`Login successful: ${data.session_id}`);
                    setIsAuthenticated(true);
                    navigate('/home');
                } else {
                    const error = await response.json();
                    alert(error.message);
                }
            } catch (e) {
                console.error(`Error during login: ${e}`);
                alert('An error occurred during login');
            }
        }
    });
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div>{formik.errors.username}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                    ) : null}
                </div>
                <button type="submit" className='login-btn'>Login</button>
            </form>
        </div>
    )
}

export default Login