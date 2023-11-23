import PropTypes from "prop-types";
import { Parallax } from "react-parallax";

const Cover = ({ imgUrl, coverTitle }) => {
    return (
        <Parallax
            blur={{ min: -15, max: 15 }}
            bgImage={imgUrl}
            bgImageAlt="the dog"
            strength={-200}
        >
            <div className="hero min-h-[600px]">
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold uppercase text-white">
                            {coverTitle}
                        </h1>
                        <p className="mb-5">
                            Provident cupiditate voluptatem et in. Quaerat
                            fugiat ut assumenda excepturi exercitationem quasi.
                            In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                </div>
            </div>
        </Parallax>
    );
};

Cover.propTypes = {
    imgUrl: PropTypes.string,
    coverTitle: PropTypes.string,
};

export default Cover;
