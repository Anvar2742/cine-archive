import React from "react";

const Cast = ({ cast }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-10">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-8">
                {cast?.map((el) => {
                    return (
                        <div key={el?.id}>
                            <img src={el?.profile_path} alt="" className="rounded-2xl" />
                            <h4 className="text-sm mt-2 sm:mt-4 sm:text-xl font-bold">{el?.name}</h4>
                            <h5 className="text-xs sm:mt-1 sm:text-sm opacity-80">{el?.character}</h5>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Cast;
