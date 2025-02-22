import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader, Lock, Mail, User, Phone } from "lucide-react";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const { signup, error, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!agree) return;
    try {
      await signup(email, password, `${firstName} ${lastName}`);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <h2 className="text-2xl font-bold">Create an account</h2>
      <p className="text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600">Log in</Link>
      </p>

      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="flex space-x-2">
          <div className="relative w-full">
            <User className="absolute left-3 top-3 text-gray-400 size-5" />
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 pl-10 rounded-md bg-[#D7D6FF] border border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="relative w-full">
            <User className="absolute left-3 top-3 text-gray-400 size-5" />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 pl-10 rounded-md bg-[#D7D6FF] border border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400 size-5" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 pl-10 rounded-md bg-[#D7D6FF] border border-black focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="relative">
          <Phone className="absolute left-3 top-3 text-gray-400 size-5" />
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 pl-10 rounded-md bg-[#D7D6FF] border border-black focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

		<div className="relative">
  <Lock className="absolute left-3 top-3 text-gray-400 size-5" />
  <input
    type="password"
    placeholder="Enter your password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    onFocus={() => setIsPasswordFocused(true)}
    onBlur={(e) => {
      if (!e.target.value) setIsPasswordFocused(false);
    }}
    className="w-full p-3 pl-10 rounded-md bg-[#D7D6FF] border border-black focus:outline-none focus:ring-2 focus:ring-black"
  />
</div>

{/* Password Strength Meter - Only shows when password input is focused */}
{isPasswordFocused && <PasswordStrengthMeter password={password} />}

        <label className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
            className="w-4 h-4"
          />
          <span>
            I agree to the {" "}
            <Link to="/terms" className="text-blue-600">Terms & Conditions</Link>
          </span>
        </label>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isLoading || !agree}
          className="w-full p-3 bg-[#1A1942] text-white rounded-md disabled:opacity-50"
        >
          {isLoading ? <Loader className="w-5 h-5 animate-spin mx-auto" /> : "Create account"}
        </button>
      </form>

      <div className="flex items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <p className="text-sm text-gray-600 mx-4">Or register with</p>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      <div className="flex justify-center space-x-4">
        <button className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 flex items-center">
          <img src="/google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
          Google
        </button>
        <button className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 flex items-center">
          <img src="/apple-icon.png" alt="Apple" className="w-5 h-5 mr-2" />
          Apple
        </button>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
