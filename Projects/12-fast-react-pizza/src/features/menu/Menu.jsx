import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();

  return (
    <>
      <h1 className="my-4 text-center">
        <span>&ndash;&ndash;&#9733;</span>{" "}
        <span className="font-bold text-xl">Our Menu</span>{" "}
        <span>&#9733;&ndash;&ndash;</span>
      </h1>
      <ul className="divide-y divide-stone-300">
        {menu.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.id} />
        ))}
      </ul>
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  return await getMenu();
}

export default Menu;
