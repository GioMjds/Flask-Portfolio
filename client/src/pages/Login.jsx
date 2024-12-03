import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../scss/login.scss';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Username is required'),
            password: Yup.string()
                .min(8, 'Must be 8 characters or more')
                .required('Password is required'),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            login();
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