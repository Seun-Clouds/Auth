import { Circle, CircleCheck } from "lucide-react";

const PasswordCriteria = ({ password }) => {
	const criteria = [
		{ label: "8 characters minimum", met: password.length >= 8 },
		{ label: "An uppercase letter (A)", met: /[A-Z]/.test(password) },
		{ label: "A lowercase letter (a)", met: /[a-z]/.test(password) },
		{ label: "A number (1)", met: /\d/.test(password) },
		{ label: "A special character (!@#)", met: /[^A-Za-z0-9]/.test(password) },
	];

	return (
		<div className="mt-2 space-y-1 bg-[#D7D6FF] p-2 rounded-md">
			{criteria.map((item) => (
				<div key={item.label} className="flex items-center text-sm">
					{item.met ? (
						<CircleCheck className="size-4 text-[#00008B] mr-2" />
					) : (
						<Circle className="size-4 text-red-500 mr-2" />
					)}
					<span className={item.met ? "text-[#00008B]" : "text-red-500"}>{item.label}</span>
				</div>
			))}
		</div>
	);
};

export default PasswordCriteria;
