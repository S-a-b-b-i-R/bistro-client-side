import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import featuredImg from "../../assets/home/featured.jpg";
import "./Featured.css";
const Featured = () => {
    return (
        <div className="mb-10 featured-item">
            <div className="bg-slate-800 bg-opacity-50 p-5 text-white">
                <SectionTitle
                    heading="Featured"
                    subheading="---Check Out Our Featured Items---"
                />
                <div className="flex items-center gap-3">
                    <div className="flex justify-end">
                        <img className="w-3/4" src={featuredImg} alt="" />
                    </div>
                    <div className="space-y-4 text-white">
                        <p>March 20, 2023</p>
                        <p>WHERE CAN I GET SOME?</p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Error voluptate facere, deserunt dolores
                            maiores quod nobis quas quasi. Eaque repellat
                            recusandae ad laudantium tempore consequatur
                            consequuntur omnis ullam maxime tenetur.
                        </p>
                        <button className="btn bg-white text-white bg-opacity-10 border-t-0 border-l-0 border-r-0">
                            Read More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;
