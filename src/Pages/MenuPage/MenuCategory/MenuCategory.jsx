import PropTypes from "prop-types";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import Cover from "../../Shared/Cover/Cover";
import { Link } from "react-router-dom";

const MenuCategory = ({ items, title, menuImg }) => {
    return (
        <div className="space-y-5 mb-5">
            {title && <Cover imgUrl={menuImg} coverTitle={title} />}
            <div className="grid md:grid-cols-2 gap-4 mt-4 mb-4">
                {items.map((item) => (
                    <MenuItem key={item._id} item={item} />
                ))}
            </div>
            {title && (
                <div className="flex justify-center">
                    <Link
                        to={`/order/${title.toLowerCase()}`}
                        className="btn  border-t-0 border-l-0 border-r-0"
                    >
                        Order now
                    </Link>
                </div>
            )}
        </div>
    );
};

MenuCategory.propTypes = {
    items: PropTypes.array,
    title: PropTypes.string,
    menuImg: PropTypes.string,
};

export default MenuCategory;
