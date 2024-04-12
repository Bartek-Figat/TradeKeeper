import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const handleRegister = () => {
    // Perform registration logic here
    // Show success or error message using React-Toastify
    toast.success("Registration successful!");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleRegister}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Register
      </button>
    </div>
  );
};

export default Register;
