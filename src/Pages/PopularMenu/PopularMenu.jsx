import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import MenuItem from "../Shared/MenuItem/MenuItem";
import useMenu from "../../Hooks/useMenu";

const PopularMenu = () => {
    const [menu = [], loading] = useMenu();
    const popular = menu
        ? menu.filter((item) => item.category === "popular")
        : [];

    // const popularItems = menu?.filter((item) => item.category === "popular");
    // const [menu, setMenu] = useState([]);
    // useEffect(() => {
    //     fetch("menu.json")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             const popularItems = data.filter(
    //                 (item) => item.category === "popular"
    //             );
    //             setMenu(popularItems);
    //             console.log(popularItems);
    //         });
    // }, []);
    return (
        <div className="mb-10 mt-10">
            {!loading && (
                <>
                    <SectionTitle
                        heading="Popular Menu"
                        subheading="---Check Out Our Popular Items---"
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                        {popular.map((item) => (
                            <MenuItem key={item._id} item={item} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default PopularMenu;
