import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../../../Api/GoogleOAuthApi";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { signInStart, signInFailure, signInSuccess } from "../../../Redux/UserSlice";
import { toast } from "react-toastify";

const GoolgeLogin = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const responseGoogle = async (authResult) => {
        try {
            dispatch(signInStart()); // set loading state
            if (authResult["code"]) {
                console.log(authResult['code']);
                const result = await googleAuth(authResult.code);
                if (result.error) {
                    console.log('Error while Google Sign up...', result.error);
                    dispatch(signInFailure(result.error));
                    toast.error("Google sign-up failed!");
                    return;
                }

                const { email, name, image } = result.data.user;
                const token = result.data.token;
                const obj = { email, name, token, image };
                console.log(email, name);

                dispatch(signInSuccess(obj));
                toast.success("Successfully signed up with Google!");

                navigate('/orgInfo');
            } else {
                console.log(authResult);
                dispatch(signInFailure("Authorization code not received"));
                toast.error("Google sign-up failed!");
            }
        } catch (e) {
            console.log('Error while Google Login...', e);
            dispatch(signInFailure(e.message));
            toast.error("Something went wrong with Google sign-up");
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code",
    });

    return (
        <div>
            <button
                onClick={googleLogin}
                type="button"
                className="w-full cursor-pointer w-full  flex items-center justify-center gap-3 py-3 px-23 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200"
            >
                <img
                    src="https://img.icons8.com/color/48/000000/google-logo.png"
                    alt="Google logo"
                    className="w-6 h-6"
                />
                <span className="text-gray-700 font-medium">Sign up with Google</span>
            </button>
        </div>
    );
};

export default GoolgeLogin;