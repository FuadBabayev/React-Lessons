import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  ); //https://uibakery.io/regex-library/phone-number

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formErrors = useActionData();
  const cart = fakeCart;

  return (
    <div className='px-4 py-6'>
      <h2 className='mb-8 text-xl font-semibold'>Ready to order? Let's go!</h2>
      <Form method="POST">
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>First Name</label>
          <input type="text" name="customer" required className='input grow' />
        </div>
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input type="tel" name="phone" required className='input w-full' />
          {formErrors?.phone && <p className='mt-2 text-xs text-red-700 bg-red-100 p-2 rounded-md'>{formErrors.phone}</p>}
          </div>
        </div>
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input type="text" name="address" required className='input w-full' />
          </div>
        </div>
        <div className='mb-12 flex items-center gap-5'>
          <input type="checkbox" name="priority" id="priority" 
          className='h-6 w-6 accent-green-400 focus:outline-none focus:ring focus:ring-green-400 focus:ring-offset-2' />
          <label htmlFor="priority" className='font-medium'>Want to yo give your order priority?</label>
        </div>
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting}>{isSubmitting ? 'Placing Order...' : 'Order now'}</Button>
        </div>
      </Form>
    </div>
  );
}

// Todo: Create React Router Action
export async function action({ request }) {
  // ! Ozu avtomatik olaraq React Router Dom-dan gelen Form-u qebul edecek {request}-de
  const formData = await request.formData(); // console.log(formData); // FormData {[[ propotype ]]}
  const data = Object.fromEntries(formData); // console.log(data); {customer: '...', phone: '...', address: '...'}
  console.log(data);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  };
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need to contact you';
  if (Object.keys(errors).length > 0) return errors; // Todo: Eger obyektin icinde en azi 1 property varsa

  // const newOrder = await createOrder(order); // ! Post Etmek ucun apiRestaurant-da olan funksiya daxiline argument olaraq yeni objecti gonderdik
  // return redirect(`/order/${newOrder.id}`); // ! Eslinde useNavigate() ile eyhni seydir sadece o ancaq component daxilinde yazildiqi ucun bzi diger redirect-den istifada etdik
  return null;
}

export default CreateOrder;
