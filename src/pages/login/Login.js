import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Login() {

    const {user,loading, error, dispatch} = useContext(AuthContext)
    const navigate = useNavigate()

    const loginSchema = Yup.object().shape({
        password: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async(values, action) => {
            dispatch({type:"LOGIN_START"})
            try {
                const res = await axios.post("/user/login", values)
                dispatch({type:"LOGIN_SUCCESS", payload: res.data})
                navigate("/")
            } catch (error) {
                dispatch({type:"LOGIN_FAILURE", payload: error.response.data})
            }
        },
    });
    return (
        <>
            <div className="container">
                <div className="login-box mx-auto m-5">
                    <div className="row">
                        <div className="col-lg col-12 py-4 px-sm-5 px-5 pb-five">
                            {/* <img className="mb-3" src="https://cdn.asparksys.com/medias/1666334554281.png" alt="" /> */}
                            <h2 className="fw-semibold p-0 mt-4"><span className="text-warning">Hi,</span> Welcome Back!</h2>
                            <p className="text-info mb-5 fs-14">
                                Sign in and continue your journey
                            </p>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                    <label htmlFor="username" className="fw-normal mb-2" id="inputGroup-sizing-default">Username</label>
                                    <input type="text"
                                        id="username"
                                        onChange={formik.handleChange}
                                        value={formik.values.username}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter Username"
                                        className="form-control w-100 rounded-pill px-4 text-field"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" />

                                    {formik.errors.username && formik.touched.username ? (
                                        <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.username}</p>
                                    ) : null}
                                </div>


                                <div className="input-group mb-3 d-flex flex-column w-100 text-info">
                                    <label htmlFor="password" className="fw-normal mb-2" id="inputGroup-sizing-default">Password</label>
                                    <input type="text"
                                        id="password"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter Password"
                                        className="form-control w-100 rounded-pill px-4 text-field"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" />

                                    {formik.errors.password && formik.touched.password ? (
                                        <p className="fs-14 fw-500 text-primary pt-1 ps-3" >{formik.errors.password}</p>
                                    ) : null}
                                </div>

                                <div className="d-flex justify-content-between">
                                    <div className="form-check text-info">
                                        <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            <small> Keep me signed in</small>
                                        </label>
                                    </div>
                                </div>
                                {error && <div className="err-btn">{error}</div>}
                                <button disabled={loading} className="btn btn-lg btn-warning w-100 py-2 fw-normal fs-5 text-white mt-4" type="submit">
                                    Sign in
                                </button>

                            </form>
                            <p className="text-info text-center mt-3">
                                <small>Not registered yet?</small>
                                <span className="text-secondary ms-1"><Link to="/register" className="fw-500 text-warning"> Create an Account</ Link></span>
                            </p>
                        </div>
                        <div className="col-lg col-0">
                            <img className="bg-img img-fluid h-100 w-100 d-lg-block d-none modal-img-radius" src="https://cdn.asparksys.com/medias/1666333898975.png" alt="" />

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}