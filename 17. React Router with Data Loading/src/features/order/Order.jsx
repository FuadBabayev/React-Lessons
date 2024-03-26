import { calcMinutesLeft, formatCurrency, formatDate} from "../../utils/helpers";
import { getOrder } from "../../services/apiRestaurant";
import { useLoaderData /*, useParams */ } from "react-router-dom";


function Order() {
  // const url = useParams();  console.log(url);      {orderId: what you wrote}         // ! It only work inside components
  const order = useLoaderData();   console.log(order);
  const { id, status, priority, priorityPrice, orderPrice, estimatedDelivery, cart } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div>
      <div>
        <h2>Status</h2>

        <div>
          {priority && <span>Priority</span>}
          <span>{status} order</span>
        </div>
      </div>

      <div>
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <div>
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

export async function loader({params}) {        // ! Yuxarida useParams & useLoaderData yazsaq deyeri buradan el catan deyil React Router ozu {params} deyer verir
  const order = await getOrder(params.orderId);   // * Eynile useParams istifade edecen icinde geldiyi deyer kimi
  return order; // ! Sonra connect etmek ucun bu deyeri App.jsx-da {loader as orderLoader} deyerek <Order />, loader : orderLoader gonderib useLoaderData ile tutaciq in here
}

export default Order;
