import { Link } from "react-router-dom";

function Button({ children, disabled, to, type }) {
  const base =
    "bg-yellow-400 text-sm inline-block uppercase rounded-full text-stone-900 font-semibold hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-yellow-300 disabled:cursor-not-allowed";

  const style = {
    primary: base + " tracking-wide px-3 py-1 md:px-6 md:py-3",
    small:
      base +
      " tracking-tighter px-2 py-1 text-xs md:px-3 md:py-1.5 md:text-sm md:tracking-normal",
    secondary:
      "px-3 py-1 md:px-6 md:py-3 text-sm inline-block uppercase rounded-full text-stone-400 font-semibold border-2 border-stone-300 hover:bg-stone-300 hover:text-stone-800 transition-colors duration-300 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-stone-200 focus:bg-stone-300 focus:text-stone-800 disabled:cursor-not-allowed",
  };

  if (to)
    return (
      <Link to="/order/new" className={style[type]}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={style[type]}>
      {children}
    </button>
  );
}

export default Button;
