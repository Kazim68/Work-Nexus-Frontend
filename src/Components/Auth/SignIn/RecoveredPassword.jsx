import { useNavigate } from "react-router-dom";
import keyIcon from "../../../assets/images/key.png";

export default function PasswordResetSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-end h-screen bg-gray-300 p-4 pr-16">
      <div className="bg-white p-10 rounded-lg shadow-lg w-[670px] h-[730px]">
        <div className="flex justify-end mb-30">
          <img
            src={keyIcon}
            alt="success-key"
            className="w-16 h-16"
          />
        </div>


        <h2 className="text-2xl font-semibold  mb-2">Here Ya go.</h2>
        <p className="text-2xl font-semibold mb-2">Don't Forget it next Time.</p>
        <p className="text-2xl font-semibold  mb-17">If you do, Don’t worry we will remember.</p>

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/signin")}
            className="w-full bg-teal-600 text-white py-4 rounded-lg text-lg font-medium mt-14 hover:bg-teal-700">
            Go Back to Login
          </button>
        </div>

      </div>
    </div>
  );
}
