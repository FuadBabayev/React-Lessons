import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

const isValidPhone = str => /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str); //https://uibakery.io/regex-library/phone-number

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
const navigation = useNavigation();     // ! Deyerler verir idle, loading ve submitting buna esasen teyin edirik
const isSubmitting = navigation.state === "submitting";
const formErrors = useActionData();     // ! erro ve ya her hansisa melumat gelib burada toplanir

  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>
      <Form method="POST">                            {/* // ! We replace normal form with Form derived from React Router Dom */}
        <div><label>First Name</label><input type="text" name="customer" required /></div>
        <div><label>Phone number</label><div><input type="tel" name="phone" required /></div>
        {formErrors?.phone && <p>{formErrors.phone}</p> }
        </div>
        <div><label>Address</label><div><input type="text" name="address" required /></div></div>
        <div>
          <input type="checkbox" name="priority" id="priority" /* value={withPriority}  onChange={(e) => setWithPriority(e.target.checked)}  */ />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button disabled={isSubmitting}>{isSubmitting ? "Placing Order..." : "Order now"}</button>
        </div>
      </Form>
    </div>
  );
}

// Todo: Create React Router Action 
export async function action({request}){              // ! Ozu avtomatik olaraq React Router Dom-dan gelen Form-u qebul edecek {request}-de
  const formData = await request.formData();          // console.log(formData); // FormData {[[ propotype ]]}
  const data = Object.fromEntries(formData);          // console.log(data); {customer: '...', phone: '...', address: '...'}
  console.log(data);

  const order = { ...data, cart : JSON.parse(data.cart), priority : data.priority === "on"}
  const errors = {};
  if(!isValidPhone(order.phone)) errors.phone = "Please give us your correct phone number. We might need to contact you";
  if(Object.keys(errors).length > 0) return errors;    // Todo: Eger obyektin icinde en azi 1 property varsa  
  
  const newOrder = await createOrder(order);      // ! Post Etmek ucun apiRestaurant-da olan funksiya daxiline argument olaraq yeni objecti gonderdik 
  return redirect(`/order/${newOrder.id}`);      // ! Eslinde useNavigate() ile eyhni seydir sadece o ancaq component daxilinde yazildiqi ucun bzi diger redirect-den istifada etdik
}

export default CreateOrder;