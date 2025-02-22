import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, isLoading, error } = useAuthStore();

	const handleLogin = async (e) => {
		e.preventDefault();
		await login(email, password);
	};

	// Handle "Enter" key for quick login
	const handleKeyPress = (e) => {
		if (e.key === "Enter") handleLogin(e);
	};

	return (
		<motion.div
			// initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<h2 className="text-3xl font-bold text-gray-800">Log in to your Account</h2>
            <p className="mt-2 text-gray-600">
              Don't have an account?{" "}
              <Link to='/signup' className="text-[#1A1942] hover:underline">
                Create an account
              </Link>
			</p>

			<form onSubmit={handleLogin}>
				<Input
					icon={Mail}
					type='email'
					placeholder='Email Address'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					onKeyDown={handleKeyPress}
					autoFocus
					disabled={isLoading}
				/>

				<Input
					icon={Lock}
					type='password'
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					onKeyDown={handleKeyPress}
					disabled={isLoading}
				/>

<div className='flex justify-between items-center mb-4'>
	<label className='flex items-center text-sm text-gray-600'>
		<input type='checkbox' className='mr-2' />
		Remember me
	</label>
	<div className='flex items-center space-x-1'>
		<span className='text-sm text-gray-600'>Forgot password?</span>
		<Link to='/forgot-password' className='text-sm text-blue-600 hover:underline'>
			Reset
		</Link>
	</div>
</div>


				{error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

				<motion.button
					whileHover={!isLoading ? { scale: 1.02 } : {}}
					whileTap={!isLoading ? { scale: 0.98 } : {}}
					className={`h-12 w-full bg-[#1A1942] text-white hover:bg-[#1A1942]/90 text-white font-bold rounded-lg shadow-lg 
					hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
					focus:ring-offset-2 transition duration-200 ${
						isLoading ? "opacity-50 cursor-not-allowed" : ""
					}`}
					type='submit'
					disabled={isLoading}
				>
					{isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "Login"}
				</motion.button>
			</form>
      <div className="mt-6">
  <div className="flex items-center">
    <div className="flex-grow border-t border-gray-400"></div>
    <p className="text-sm text-gray-600 mx-4">Or Login with</p>
    <div className="flex-grow border-t border-gray-400"></div>
  </div>
  <div className="flex justify-center space-x-4 mt-4">
    <button className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 flex items-center">
      <img src="/google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
      Google
    </button>
    <button className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 flex items-center">
      <img src="/apple-icon.png" alt="Apple" className="w-5 h-5 mr-2" />
      Apple
    </button>
  </div>
</div>

		</motion.div>
	);
};

export default LoginPage;
