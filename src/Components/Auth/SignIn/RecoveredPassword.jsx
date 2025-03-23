import { useNavigate } from "react-router-dom";

export default function PasswordResetSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md text-center min-h-[550px] space-y-6">
        <img
          src="https://img.icons8.com/ios/50/000000/clock--v1.png"
          alt="Success Icon"
          className="mx-auto mb-6"
        />
        <h2 className="text-xl font-semibold">Here Ya go.</h2>
        <p className="text-gray-600">Don't Forget it next Time.</p>
        <p className="text-gray-600">If you do, Don’t worry we will remember.</p>

        <p className="text-gray-500 text-sm mt-4">
          Your Email <span className="text-teal-600 font-medium">example@example.com</span> has <span className="text-teal-600 font-medium">password</span>
        </p>

        <button
          onClick={() => navigate("/signin")}
          className="w-full bg-teal-600 text-white py-4 rounded-lg text-lg font-medium mt-6 hover:bg-teal-700"
        >
          Go Back to Login
        </button>
      </div>
    </div>
  );
}
