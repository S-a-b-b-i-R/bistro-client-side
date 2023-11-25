import Lottie from "lottie-react";
import animationData from "../../Lottie/loading.json";
const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-[400px]">
            <p className="text-4xl">Loading...</p>
            <Lottie animationData={animationData} />
        </div>
    );
};

export default Loading;
