import CreateCustomer from "./features/costumers/CreateCustomer";
import Customer from "./features/costumers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
// import BalanceDisplayOldVersion from "./features/accounts/BalanceDisplayOldVersion";
import { useSelector } from "react-redux";

function App() {
  const customer = useSelector((store) => store.customer);

  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {!customer.fullName
        ? <CreateCustomer />
        : (<>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
          {/* <BalanceDisplayOldVersion /> */}
        </>)}

    </div>
  );
}

export default App;
