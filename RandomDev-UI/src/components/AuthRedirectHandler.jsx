import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const AuthRedirectHandler = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            // If user is NOT logged in, try to restore session
            if (!user) {
                try {
                    const res = await axios.get(BASE_URL + "/profile", {
                        withCredentials: true,
                    });
                    dispatch(addUser(res.data));
                    // After successful restore, if on public page, redirect to feed
                    if (["/", "/login", "/signup"].includes(location.pathname)) {
                        navigate("/feed");
                    }
                } catch (err) {
                    // Session invalid or expired. User stays on public page.
                }
            } else {
                // If user IS logged in, STRICTLY redirect from public pages.
                if (["/", "/login", "/signup"].includes(location.pathname)) {
                    navigate("/feed");
                }
            }
        };

        checkAuth();
    }, [user, location.pathname, navigate, dispatch]);

    return null; // This component doesn't render anything
};

export default AuthRedirectHandler;
