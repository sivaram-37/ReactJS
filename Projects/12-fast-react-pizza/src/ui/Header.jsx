import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="px-4 py-3 border-b-2 border-stone-400 bg-yellow-400 uppercase sm:px-6 flex items-center justify-between">
      <Link to="/" className="tracking-widest">
        Fast React Pizza.co
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
