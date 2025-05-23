import { Github } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hook/useAuth";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { signIn, googleSignIn, githubSignIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") || "";
    const password = formData.get("password") || "";

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const result = await signIn(email, password);
      if (result?.error) throw new Error(result.error.message);

      toast.success("Logged in successfully!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || "Login failed. Try again.");
    }
  }

  async function handleGoogleLogin() {
    try {
      await googleSignIn();
      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Failed to login with Google. Please try again.");
    }
  }

  async function handleGithubLogin() {
    try {
      await githubSignIn();
      toast.success("Logged in with GitHub!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Failed to login with GitHub. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-700 via-purple-500 to-purple-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="rounded-lg p-8 max-w-md w-full shadow-lg space-y-6 bg-white bg-opacity-10 dark:bg-black dark:bg-opacity-30 backdrop-blur-sm border border-white border-opacity-20 dark:border-gray-600">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full bg-white dark:bg-purple-900 dark:bg-opacity-30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white px-3 py-2 rounded border border-gray-300 dark:border-white focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full bg-white dark:bg-purple-900 dark:bg-opacity-30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white px-3 py-2 rounded border border-gray-300 dark:border-white focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-600 text-white py-2 rounded transition"
          >
            Login
          </button>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white opacity-40" />
          </div>
          <div className="relative flex justify-center text-xs uppercase bg-transparent px-2 text-white">
            or continue with
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full border border-white px-4 py-2 rounded flex justify-center items-center gap-2 text-white hover:bg-white hover:text-purple-700 transition"
          >
            <FcGoogle className="h-5 w-5" />
            Google
          </button>
        </div>
        <p className="text-center text-sm text-gray-900 dark:text-white">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="underline underline-offset-4 hover:text-purple-300">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
