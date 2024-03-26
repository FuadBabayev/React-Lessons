import { connect } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplayOldVersion({balance}) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}

function mapStateToProps(state){
    return {
        balance : state.account.balance
    };
}
export default connect(mapStateToProps)(BalanceDisplayOldVersion);


// ! Connect API is Old School version nowadays in modern Redux we use only useSelector (read) and useDispatch (send) 