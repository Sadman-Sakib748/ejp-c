import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Providers/AuthProviders';
import { Link, useNavigate } from 'react-router';
import Spinner from '../Spinner/Spinner';
import toast from 'react-hot-toast';

const SignUp = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);

  const postUserToDB = async (userInfo) => {
    try {
      const res = await fetch('https://ejp-s.vercel.app/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Failed to add user to database', error);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const result = await createUser(data.email, data.password);
      const loggedUser = result.user;

      await updateUserProfile(data.name, data.photoURL);

      const userInfo = {
        name: data.name,
        email: data.email,
      };

      const res = await postUserToDB(userInfo);

      if (res.insertedId) {
        reset();
        toast.success('User profile info updated!', {
          position: 'top-right',
          autoClose: 1500,
        });
        setTimeout(() => {
          navigate('/');
        }, 1600);
      }
    } catch (error) {
      toast.error('An error occurred during sign up');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await googleSignIn();
      const loggedUser = result?.user;

      const userInfo = {
        name: loggedUser?.displayName,
        email: loggedUser?.email,
      };

      const res = await postUserToDB(userInfo);

      if (res.insertedId) {
        toast.success('Signed in with Google!', {
          position: 'top-right',
          autoClose: 1500,
        });
        setTimeout(() => {
          navigate('/');
        }, 1600);
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error('Google sign-in failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Hobby || Sign Up</title>
      </Helmet>

      {loading ? (
        <Spinner />
      ) : (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-700 via-purple-500 to-purple-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
          <div className="space-y-6 max-w-md w-full p-6 rounded-lg shadow-lg bg-white bg-opacity-10 dark:bg-black dark:bg-opacity-30 backdrop-blur-sm border border-white border-opacity-20 dark:border-gray-600">
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Sign Up</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="w-full bg-white dark:bg-purple-900 dark:bg-opacity-30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white px-3 py-2 rounded border border-gray-300 dark:border-white focus:outline-none focus:ring-2 focus:ring-purple-300"
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">Photo URL</label>
                <input
                  type="text"
                  {...register("photoURL", { required: "Photo URL is required" })}
                  className="w-full bg-white dark:bg-purple-900 dark:bg-opacity-30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white px-3 py-2 rounded border border-gray-300 dark:border-white focus:outline-none focus:ring-2 focus:ring-purple-300"
                  placeholder="Photo URL"
                />
                {errors.photoURL && <p className="text-red-500 text-sm">{errors.photoURL.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/,
                      message: "Invalid email format",
                    },
                  })}
                  className="w-full bg-white dark:bg-purple-900 dark:bg-opacity-30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white px-3 py-2 rounded border border-gray-300 dark:border-white focus:outline-none focus:ring-2 focus:ring-purple-300"
                  placeholder="Email"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/,
                      message: "Must include uppercase, lowercase, number & special character",
                    },
                  })}
                  className="w-full bg-white dark:bg-purple-900 dark:bg-opacity-30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white px-3 py-2 rounded border border-gray-300 dark:border-white focus:outline-none focus:ring-2 focus:ring-purple-300"
                  placeholder="Password"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-purple-700 hover:bg-purple-600 text-white py-2 rounded transition"
              >
                Sign Up
              </button>
            </form>

            <div className="mt-6">
              <button
                onClick={handleGoogleSignIn}
                className="w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded transition"
              >
                Sign in with Google
              </button>
            </div>

            <p className="text-center text-sm text-gray-900 dark:text-white mt-4">
              Already have an account?{" "}
              <Link to="/signIn" className="underline underline-offset-4 hover:text-purple-300">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
