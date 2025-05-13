import React, { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/forms/Input";
import { validateEmail } from "../../utils/helpers";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }
    setError("");
  };
  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text xs text-slate-700 mt-[5px] mb-6">
          {`Don't have an account yet? `}
          <Link className="font-medium text-primary underline" to="/signup">
            Sign up
          </Link>
        </p>
        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(target.value)
            }
            label="Email Address"
            placeholder="sally@example.com"
            type="email"
          />
          <Input
            value={password}
            onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(target.value)
            }
            label="Password"
            placeholder=""
            type="password"
          />

          <p className="text-red-500 text-xs pb-2.5">{error || <>&nbsp;</>}</p>

          <button type="submit" className="btn-primary">
            Log in
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
