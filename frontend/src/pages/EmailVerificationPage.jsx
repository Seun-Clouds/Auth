"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { error, isLoading, verifyEmail } = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];

    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/");
      toast.success("Email verified successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
      <motion.div animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">

			<h2 className="text-2xl font-bold">Reset Password</h2>
			<p className="text-gray-600">
			Please check your email, we've sent a code to verify your email address.
				  </p>
			
				  <p className="text-gray-600">
					Enter OTP</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-start gap-x-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
				className="w-16 h-16 text-center text-3xl font-bold bg-[#D7D6FF] border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"              />
            ))}
          </div>

          {error && <p className="text-red-500">{error}</p>}

		  <div className="text-gray-600">
          Didn’t get any code?{" "}
          <button className="text-blue-600 font-semibold">Send Again</button>
        </div>

          <button
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            className="w-full p-3 bg-[#1A1942] text-white rounded-md hover:bg-[#131234] disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>
        </form>
		

      </motion.div>
  );
};

export default EmailVerificationPage;
