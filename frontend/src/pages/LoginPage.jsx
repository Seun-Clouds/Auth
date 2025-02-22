"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Loader, Eye, EyeOff } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading, error } = useAuthStore()

  const handleLogin = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <motion.div animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
     
      <h2 className="text-2xl font-bold">Log in to your Account</h2>
      <p className="text-gray-600">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600">
          Create an account
        </Link>
      </p>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-md bg-[#D7D6FF] pr-10 border border-black focus:outline-none focus:ring-2 focus:ring-black"        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md bg-[#D7D6FF] pr-10 border border-black focus:outline-none focus:ring-2 focus:ring-black"          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex justify-between items-center">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Remember me</span>
          </label>
          <div className="text-sm">
            <span>Forgot Password? </span>
            <Link to="/forgot-password" className="text-blue-600">
              Reset
            </Link>
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button type="submit" disabled={isLoading} className="w-full p-3 bg-[#1A1942] text-white rounded-md">
          {isLoading ? <Loader className="w-5 h-5 animate-spin mx-auto" /> : "Login"}
        </button>
      </form>

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
    </motion.div>
  )
}

export default LoginPage

