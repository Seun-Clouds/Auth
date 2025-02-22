import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";
import { Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const { isLoading, forgotPassword } = useAuthStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await forgotPassword(email);
		setIsSubmitted(true);
	};

	return (
		<motion.div 
			animate={{ opacity: 1, y: 0 }} 
			transition={{ duration: 0.5 }} 
			className="space-y-6"
		>
			<h2 className="text-2xl font-bold">Reset Password</h2>

			{!isSubmitted ? (
				<form onSubmit={handleSubmit} className="space-y-4">
					<p className="text-gray-600">
						Please enter your email associated with your account to reset your password.
					</p>

					<Input
						icon={Mail}
						type="email"
						placeholder="Email Address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>

					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className="w-full p-3 bg-[#1A1942] text-white rounded-md"
						type="submit"
					>
						{isLoading ? <Loader className="w-5 h-5 animate-spin mx-auto" /> : "Reset Password"}
					</motion.button>
				</form>
			) : (
				<div className="text-center">
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ type: "spring", stiffness: 500, damping: 30 }}
						className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
					>
						<Mail className="h-8 w-8 text-white" />
					</motion.div>

					<p className="text-gray-300 mb-6">
						If an account exists for {email}, you will receive a password reset link shortly.
					</p>
				</div>
			)}

			{/* Remember Password link */}
			<div className="mt-6 text-sm text-gray-600">
				Remember password?{" "}
				<Link to="/login" className="text-[#020064] font-semibold hover:underline">
					Log in
				</Link>
			</div>
		</motion.div>
	);
};

export default ForgotPasswordPage;
