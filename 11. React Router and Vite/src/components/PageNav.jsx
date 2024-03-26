import { NavLink } from "react-router-dom";
// import { Link } from "react-router-dom";
import styles from './PageNav.module.css';

function PageNav() {
    return (
        // ! Burada cagiranda ise style.nav deye cagirdiqimizi ucun nav icinde olan butun  elemnlet inheritance edir ona gorede adlandirmada her zaman .nav + .classname(tagname, idname) olmalidir

        <nav className={styles.nav}>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/pricing">Pricing</NavLink></li>
                <li><NavLink to="/product">Product</NavLink></li>
                <li><NavLink to="/styling">CSS Styling</NavLink></li>
                <li><NavLink to="/store">Store URL</NavLink></li>
                {/* <li><Link to="/">Home</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/product">Product</Link></li> */}
            </ul>
        </nav>
    )
}

export default PageNav

// ! We use NavLink instead of Link because NavLink has active property which add className="active" to current Component
