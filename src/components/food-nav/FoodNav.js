import { Link } from "react-router-dom"
export default function FoodNav(props) {

    return (
        <>
            <div className="food-nav">
                <Link className={props.nonVeg} to="/products-non-veg">Snacks Non-Veg</Link>
                <Link className={props.veg} to="/products-veg">Snacks Veg</Link>
                <Link className={props.drinks} to="/products-drinks">Drinks</Link>
                <Link className={props.alcohol} to="/products-alcohol">Alcohol</Link>
                <Link className={props.dessert} to="/products-dessert">Dessert</Link>
                <Link className={props.extra} to="/products-extra">Extra</Link>
            </div>
        </>
    )
}