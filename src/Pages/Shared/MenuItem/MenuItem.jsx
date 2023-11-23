import PropTypes from "prop-types";

const MenuItem = ({ item }) => {
    const { name, recipe, image, price } = item;
    return (
        <div className="flex space-x-4">
            <img
                className="w-[100px] h-[100px] rounded-tr-[50%] rounded-br-[50%] rounded-bl-[50%]"
                src={image}
                alt=""
            />
            <div>
                <h3 className="uppercase">{name}---------</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-amber-600">${price}</p>
        </div>
    );
};

MenuItem.propTypes = {
    item: PropTypes.object,
};

export default MenuItem;
