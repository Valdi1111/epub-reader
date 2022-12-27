import {Link, useLocation, useNavigate} from "react-router-dom";
import {useRef} from "react";
import {toast} from "wc-toast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faGoogle, faFacebook, faTwitter} from "@fortawesome/free-brands-svg-icons"
import image from "../images/login.svg"
import {login} from "./Api";

function Login(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const email = useRef();
    const password = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        if (e.target.checkValidity()) {
            toast.promise(
                new Promise((resolve, reject) => {
                    login(email.current.value, password.current.value).then(
                        res => {
                            window.localStorage.setItem("token", res.data.token);
                            props.login();
                            if(location.state?.from) {
                                navigate(location.state.from);
                            } else {
                                navigate("/");
                            }
                            resolve();
                        },
                        err => reject()
                    );
                }),
                {
                    loading: "Authenticating...",
                    success: "Authentication success!",
                    error: "Authentication failed!",
                }
            )
        } else {
            e.stopPropagation();
        }
        e.target.classList.add("was-validated");
    }

    return (
        <main className={"container vh-100"}>
            <div className={"d-flex align-items-center justify-content-center row mx-0 h-100"}>
                <div className={"col-md-9 col-lg-6 col-xl-6"}>
                    <img src={image} className={"img-fluid"} alt={"Phone image"}/>
                </div>
                <div className={"col-md-9 col-lg-6 col-xl-5 offset-xl-1"}>
                    <form onSubmit={handleSubmit} noValidate={true}>
                        <div className={"form-floating mb-2"}>
                            <input type={"email"} id={"email_login"} className={"form-control form-control-lg"}
                                   required={true} ref={email} autoComplete={"username"}/>
                            <label htmlFor={"email_login"}>Email address</label>
                            <div className={"invalid-feedback"}>Please insert a valid email.</div>
                        </div>
                        <div className={"form-floating mb-2"}>
                            <input type={"password"} id={"password_login"} className={"form-control form-control-lg"}
                                   placeholder={"Password"} minLength={8} required={true} ref={password}
                                   autoComplete={"current-password"}/>
                            <label htmlFor={"password_login"}>Password</label>
                            <div className={"invalid-feedback"}>Please insert a valid password.</div>
                        </div>
                        <div className={"d-flex justify-content-between align-items-center mb-3"}>
                            <div className={"form-check"}>
                                <input className="form-check-input" type={"checkbox"} id={"submit_login"}
                                       defaultChecked={true}/>
                                <label className={"form-check-label"} htmlFor={"submit_login"}>Remember me</label>
                            </div>
                            <Link to={""} className={"small"}>Forgot password?</Link>
                        </div>
                        <button type={"submit"} className={"btn btn-primary btn-lg btn-block w-100"}>Sign in</button>
                        <div className={"divider d-flex align-items-center my-4"}>
                            <p className={"text-center fw-bold mx-3 mb-0"}>OR</p>
                        </div>
                        <div className={"d-flex justify-content-around align-items-center"}>
                            <button type={"button"} className={"btn btn-social"} style={{color: "#dd4b39"}}>
                                <FontAwesomeIcon icon={faGoogle}/>
                            </button>
                            <button type={"button"} className={"btn btn-social"} style={{color: "#3B5998"}}>
                                <FontAwesomeIcon icon={faFacebook}/>
                            </button>
                            <button type={"button"} className={"btn btn-social"} style={{color: "#55ACEE"}}>
                                <FontAwesomeIcon icon={faTwitter}/>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Login;
