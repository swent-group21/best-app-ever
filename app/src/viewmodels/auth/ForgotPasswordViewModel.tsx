import { useState } from "react";
import  {resetPassword}  from "@/types/Auth";

export default function ForgotPasswordViewModel() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleEmailChange = (text: string) => setEmail(text);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      setErrorMessage("Please enter a valid email.");
      return;
    }

    try {
      await resetPassword(email);
      alert("A reset password link has been sent to your email.");
    } catch (error) {
      console.error("Error resetting password: ", error);
      setErrorMessage("Failed to reset password. Please try again.");
    }
  };

  return {
    email,
    errorMessage,
    handleEmailChange,
    handleResetPassword,
  };
}
