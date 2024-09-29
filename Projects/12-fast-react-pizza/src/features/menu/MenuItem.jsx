import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li className="flex gap-4 p-4">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "grayscale opacity-70" : ""}`}
      />
      <div className="flex flex-col grow">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic  capitalize text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto text-stone-50 flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm text-green-600 font-medium">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="text-xs sm:text-sm text-red-600 uppercase font-semibold">
              Sold out
            </p>
          )}
          <Button type="small">Add to cart</Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
