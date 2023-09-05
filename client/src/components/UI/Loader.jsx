const Loader = () => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-primary w-screen h-screen z-50 flex items-center justify-center">
            <h1 className="sm:text-2xl text-xl font-extrabold leading-5">
                <span className="relative transition-all mb-[1px] pb-1 sm:pb-0 sm:mb-0 inline-block after:w-0 after:h-[2px] after:bg-white after:absolute after:transition-all after:bottom-0 after:left-0 after:animate-underline animation-fill-forward">
                    YOUR
                </span>
                <span className="block sm:inline"> CINE ARCHIVE</span>
            </h1>
        </div>
    );
};

export default Loader;
