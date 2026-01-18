import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import toast from "react-hot-toast";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const emailAddress = localStorage.getItem("resetEmail");

  const [otp, setOtp] = useState(["", "", "", "", ""]); // 5 digits
  const inputsRef = useRef([]);

  // Handle input change
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // only digits
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (index < 4) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputsRef.current[index - 1].focus();
      }
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpCode = otp.join("");
    if (otpCode.length !== 5) {
      return toast.error("Enter 5 digit OTP");
    }

    if (!emailAddress) {
      return toast.error("Email not found. Please try again.");
    }

    try {
      await api.post("/api/auth/verify-otp", { emailAddress, otp: otpCode });
      toast.success("OTP verified");
      navigate("/reset-password");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 space-y-10 ">
      {/* HEADER */}
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-extrabold text-white tracking-tight">
          Verify OTP
        </h2>
        <p className="text-gray-400 text-sm">
          Enter the 5-digit code sent to your email
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-14 h-14 text-center text-xl font-semibold rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              autoFocus={index === 0}
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/25 transition"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
}
