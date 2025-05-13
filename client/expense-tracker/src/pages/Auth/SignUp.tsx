import React, { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/forms/Input";
import { validateEmail } from "../../utils/helpers";
import ProfilePicSelector from "../../components/forms/ProfilePicSelector";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    let profileImageUrl = "";
    if (!fullName) {
      setError("Please enter your full name");
      return;
    }
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
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text xs text-slate-700 mt-[5px] mb-6">
          {`Create a free account or `}
          <Link className="font-medium text-primary underline" to="/login">
            log in
          </Link>
        </p>
        <form onSubmit={handleSignUp}>
          <ProfilePicSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
                setFullName(target.value)
              }
              label="Full Name"
              placeholder="Sally Smith"
              type="email"
            />
            <Input
              value={email}
              onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(target.value)
              }
              label="Email Address"
              placeholder="sally@example.com"
              type="email"
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(target.value)
                }
                label="Password"
                placeholder="Min 8 characters"
                type="password"
              />
            </div>

            <p className="text-red-500 text-xs pb-2.5">
              {error || <>&nbsp;</>}
            </p>

            <button type="submit" className="btn-primary">
              Log in
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
