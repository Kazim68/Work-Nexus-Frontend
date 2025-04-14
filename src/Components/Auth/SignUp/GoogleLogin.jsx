import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../../../Api/GoogleOAuthApi";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { signInStart, signInFailure, signInSuccess } from "../../../Redux/UserSlice";
import { toast } from "react-toastify";
import ButtonLoader from '../../Shared/ButtonLoader';

const GoolgeLogin = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const responseGoogle = async (authResult) => {
        try {
            dispatch(signInStart()); // set loading state
            setIsLoading(true);

            if (authResult["code"]) {
                const result = await googleAuth(authResult.code);
                if (result.error) {
                    console.log('Error while Google Sign up...', result.error);
                    dispatch(signInFailure(result.error));
                    setIsLoading(false);
                    toast.error("Google sign-up failed!");
                    return;
                }

                const { user, token } = result.data;

                dispatch(signInSuccess({ user, token }));
                setIsLoading(false);
                toast.success("Successfully signed up with Google!");

                navigate('/orgInfo');
            } else {
                console.log(authResult);
                dispatch(signInFailure("Authorization code not received"));
                setIsLoading(false);
                toast.error("Google sign-up failed!");
            }
        } catch (e) {
            console.log('Error while Google Login...', e);
            dispatch(signInFailure(e.message));
            setIsLoading(false);
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
                disabled={isLoading}
                className="mt-1 tracking-wide font-semibold bg-white text-gray-100 w-full py-4 rounded-lg hover:bg-gray-300 cursor-pointer transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
                {isLoading ? (
                    <ButtonLoader />
                ) : (
                    <>
                        <img
                            src="https://img.icons8.com/color/48/000000/google-logo.png"
                            alt="Google logo"
                            className="w-6 h-6 mr-2"
                        />
                        <span className="text-gray-700 font-medium">Sign up with Google</span>
                    </>
                )}
            </button>
        </div>
    );
    
};

export default GoolgeLogin;