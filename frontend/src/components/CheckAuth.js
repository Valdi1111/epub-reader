import {Navigate, useLocation} from "react-router-dom";

/**
 * Show login screen if there is no data in auth prop [not logged in / token expired]
 * @param props required auth and children
 * @returns {JSX.Element|*}
 * @constructor
 */
function CheckAuth(props) {
    const location = useLocation();

    if (!props.auth) {
        return <Navigate to={"/login"} state={{from: location}}/>;
    }
    return props.children;
}

export default CheckAuth;
