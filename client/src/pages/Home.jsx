import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="h-[calc(100vh-80px)] bg-hero">
            <div className="container mx-auto px-4 flex items-center justify-center h-full">
                <div className=" backdrop-blur rounded-3xl py-6 px-9 bg-opacity-5 bg-black overflow-hidden text-center">
                    <h1 className=" text-6xl font-bold mb-4">
                        Your Cine Archive
                    </h1>
                    <p className=" text-xl">
                        Explore, save movies, learn new things about them!
                    </p>
                    <Link
                        to="/discover"
                        className="inline-block ml-auto bg-sec font-bold py-2 px-8 mt-4"
                    >
                        Discover
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
