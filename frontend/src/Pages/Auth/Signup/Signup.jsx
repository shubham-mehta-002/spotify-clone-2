import { useNavigate, NavLink } from "react-router-dom";
import { spotifyLogo } from "../../../images";
import { SignupForm } from "./SignupForm";

export function Signup() {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex item-center flex-col overflow-x-hidden">
      <div className="login-header border-2 border-solid border-b-gray-400  p-4 gap-3 flex flex-row items-center justify-center">
        <img src={spotifyLogo} className="h-12" />
        <span className=" text-3xl font-semibold">Spotify</span>
      </div>
      <div className="w-full h-full flex flex-col items-center">
        <div className="login-details flex  items-center flex-col w-1/3">
          <div className="text-2xl font-bold my-6">
            Sign up for free to start listening.
          </div>
          <SignupForm />
          <div className="h-0 w-full border-2 border-solid border-b-gray-400 mt-4">
            <div className="font-bold text-lg my-6">
              Already have an account ?
            </div>

            <button
              className="border-2 border-solid border-gray-400 w-full px-2 py-4 mb-2 rounded-full text-l font-semibold text-gray-500"
              onClick={() => navigate("/login")}
            >
              LOG IN INSTEAD
            </button>

            <div className="flex justify-end text-sm text-red-500 mb-4 pb-2">
              <NavLink to="/">Go to home page</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
