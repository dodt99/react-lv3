import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h3>Nothing to see here!</h3>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
};

export default NotFound;
