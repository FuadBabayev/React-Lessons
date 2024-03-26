import { calcMinutesLeft, formatCurrency, formatDate} from "../../utils/helpers";
import { getOrder } from "../../services/apiRestaurant";
import { useLoaderData /*, useParams */ } from "react-router-dom";
import OrderItem from "./OrderItem";


function Order() {
  // const url = useParams();  console.log(url);      {orderId: what you wrote}         // ! It only work inside components
  const order = useLoaderData();   console.log(order);
  const { id, status, priority, priorityPrice, orderPrice, estimatedDelivery, cart } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-6 space-y-8">

      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} Status</h2>
        <div className="space-x-2">{priority && <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase text-red-50 tracking-wide">Priority</span>}
        <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase text-green-50 tracking-wide">{status} order</span></div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 py-5 px-6">
        <p className="font-medium">{deliveryIn >= 0 ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃` : "Order should have arrived"}</p>
        <p className="text-xs text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map(item=><OrderItem item={item} key={crypto.randomUUID()} />)}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm text-stone-600 font-medium">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm text-stone-600 font-medium">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="text-sm text-stone-600 font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

export async function loader({params}) {        // ! Yuxarida useParams & useLoaderData yazsaq deyeri buradan el catan deyil React Router ozu {params} deyer verir
  const order = await getOrder(params.orderId);   // * Eynile useParams istifade edecen icinde geldiyi deyer kimi
  return order; // ! Sonra connect etmek ucun bu deyeri App.jsx-da {loader as orderLoader} deyerek <Order />, loader : orderLoader gonderib useLoaderData ile tutaciq in here
}

export default Order;
