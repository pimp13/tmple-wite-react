import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <h1 className="text-xl text-rose-500">404 NOT FOUND!</h1>
        <div className="text-center mt-2">
          <Link
            to="/"
            className="text-indigo-600 hover:text-indigo-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
