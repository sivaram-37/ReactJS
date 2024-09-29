// Test ID: IIDSAT
import OrderItem from "./OrderItem";
import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";

function Order() {
  const order = useLoaderData();

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="m-3 space-y-4 md:space-y-10 md:text-lg">
      <div>
        <h2 className="text-xl font-bold">{`Order #${id}`}</h2>
      </div>

      <div className="text-sm font-semibold flex gap-2 flex-wrap justify-between items-center">
        <h2 className="text-lg">Status</h2>
        <div className="space-x-2 text-red-100 uppercase tracking-wide">
          {priority && (
            <span className="px-2 py-1 bg-red-600 rounded-full">Priority</span>
          )}
          <span className="px-2 py-1 bg-green-600 rounded-full">
            {status} order
          </span>
        </div>
      </div>

      <div className="px-3 py-4 bg-stone-200 rounded-xl flex gap-2 flex-wrap justify-between items-center">
        <p className="text-stone-800">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-300 border-y border-stone-300">
        {cart.map((item) => (
          <OrderItem item={item} key={item.id} />
        ))}
      </ul>

      <div className="px-3 py-4 rounded-xl bg-stone-200 space-y-2">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-500">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  return await getOrder(params.orderId);
}

export default Order;
