import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "../../../assets/menu/banner3.jpg";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import soupImg from "../../../assets/menu/soup-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";
import Loading from "../../../Components/Loader/Loading";
const Menu = () => {
    const [menu, loading] = useMenu();
    if (loading) return <Loading />;
    const dessert = menu
        ? menu.filter((item) => item.category === "dessert")
        : [];
    const soup = menu ? menu.filter((item) => item.category === "soup") : [];
    const salad = menu ? menu.filter((item) => item.category === "salad") : [];
    const pizza = menu ? menu.filter((item) => item.category === "pizza") : [];
    const offered = menu
        ? menu.filter((item) => item.category === "offered")
        : [];
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
                <link rel="canonical" href="https://www.tacobell.com/" />
            </Helmet>
            <Cover imgUrl={menuImg} coverTitle="Our menu" />
            <SectionTitle
                heading="Today's Offer"
                subheading="---Don't Miss---"
            />
            <MenuCategory items={offered} />
            <MenuCategory
                items={dessert}
                title="Desserts"
                menuImg={dessertImg}
            />
            <MenuCategory items={soup} title="Soups" menuImg={soupImg} />
            <MenuCategory items={salad} title="Salads" menuImg={saladImg} />
            <MenuCategory items={pizza} title="Pizzas" menuImg={pizzaImg} />
        </div>
    );
};

export default Menu;
