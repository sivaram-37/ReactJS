import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const className =
    "text-sm text-blue-500 font-semibold hover:text-blue-700 hover:underline";

  if (to === "-1")
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link to="/menu" className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
