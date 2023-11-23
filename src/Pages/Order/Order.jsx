import { useState } from "react";
import orderImg from "../../assets/shop/banner2.jpg";
import Cover from "../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../Hooks/useMenu";
import FoodCard from "../../Components/FoodCard/FoodCard";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Order = () => {
    const categories = ["salads", "pizzas", "soups", "desserts", "drinks"];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex ? initialIndex : 0);
    const [menu] = useMenu();
    const dessert = menu
        ? menu.filter((item) => item.category === "dessert")
        : [];
    const soup = menu ? menu.filter((item) => item.category === "soup") : [];
    const salad = menu ? menu.filter((item) => item.category === "salad") : [];
    const pizza = menu ? menu.filter((item) => item.category === "pizza") : [];
    const drinks = menu
        ? menu.filter((item) => item.category === "drinks")
        : [];
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Order Food</title>
                <link rel="canonical" href="https://www.tacobell.com/" />
            </Helmet>
            <Cover imgUrl={orderImg} coverTitle="Order Now" />
            <Tabs
                defaultIndex={tabIndex}
                onSelect={(index) => setTabIndex(index)}
                className="text-center mt-5 mb-5"
            >
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                <TabPanel>
                    <div className="grid grid-cols-3 gap-5">
                        {salad.map((item) => (
                            <FoodCard key={item._id} item={item} />
                        ))}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="grid grid-cols-3 gap-5">
                        {pizza.map((item) => (
                            <FoodCard key={item._id} item={item} />
                        ))}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="grid grid-cols-3 gap-5">
                        {soup.map((item) => (
                            <FoodCard key={item._id} item={item} />
                        ))}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="grid grid-cols-3 gap-5">
                        {dessert.map((item) => (
                            <FoodCard key={item._id} item={item} />
                        ))}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="grid grid-cols-3 gap-5">
                        {drinks.map((item) => (
                            <FoodCard key={item._id} item={item} />
                        ))}
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;
