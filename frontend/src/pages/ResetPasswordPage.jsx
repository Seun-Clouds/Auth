import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { resetPassword, error, isLoading, message } = useAuthStore();

	const [passwordRequirements, setPasswordRequirements] = useState({
		minLength: false,
		uppercase: false,
		lowercase: false,
		specialChar: false,
		number: false,
	});

	const { token } = useParams();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}
		try {
			await resetPassword(token, password);

			toast.success("Password reset successfully, redirecting to login page...");
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		} catch (error) {
			console.error(error);
			toast.error(error.message || "Error resetting password");
		}
	};

	const handlePasswordChange = (e) => {
		const newPassword = e.target.value;
		setPassword(newPassword);

		setPasswordRequirements({
			minLength: newPassword.length >= 8,
			uppercase: /[A-Z]/.test(newPassword),
			lowercase: /[a-z]/.test(newPassword),
			specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
			number: /\d/.test(newPassword),
		});
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
		>
			<div className='p-8'>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
					Reset Password
				</h2>
				{error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
				{message && <p className='text-green-500 text-sm mb-4'>{message}</p>}

				<form onSubmit={handleSubmit}>
					<Input
						icon={Lock}
						type='password'
						placeholder='New Password'
						value={password}
						onChange={handlePasswordChange}
						required
					/>

					<div className='mt-2 text-sm text-gray-400'>
						<p className={`text-sm ${passwordRequirements.minLength ? 'text-green-500' : 'text-red-500'}`}>
							{passwordRequirements.minLength ? '✔ Minimum 8 characters' : '✘ Minimum 8 characters'}
						</p>
						<p className={`text-sm ${passwordRequirements.uppercase ? 'text-green-500' : 'text-red-500'}`}>
							{passwordRequirements.uppercase ? '✔ At least one uppercase letter' : '✘ At least one uppercase letter'}
						</p>
						<p className={`text-sm ${passwordRequirements.lowercase ? 'text-green-500' : 'text-red-500'}`}>
							{passwordRequirements.lowercase ? '✔ At least one lowercase letter' : '✘ At least one lowercase letter'}
						</p>
						<p className={`text-sm ${passwordRequirements.specialChar ? 'text-green-500' : 'text-red-500'}`}>
							{passwordRequirements.specialChar ? '✔ At least one special character' : '✘ At least one special character'}
						</p>
						<p className={`text-sm ${passwordRequirements.number ? 'text-green-500' : 'text-red-500'}`}>
							{passwordRequirements.number ? '✔ At least one number' : '✘ At least one number'}
						</p>
					</div>

					<Input
						icon={Lock}
						type='password'
						placeholder='Confirm New Password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>

					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
						type='submit'
						disabled={isLoading || !passwordRequirements.minLength || !passwordRequirements.uppercase || !passwordRequirements.lowercase || !passwordRequirements.specialChar || !passwordRequirements.number}
					>
						{isLoading ? "Resetting..." : "Set New Password"}
					</motion.button>
				</form>
			</div>
		</motion.div>
	);
};

export default ResetPasswordPage;
