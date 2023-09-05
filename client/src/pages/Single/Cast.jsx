import React from "react";

const Cast = ({ cast }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-10">Cast</h2>
            <div className="grid grid-cols-6 gap-x-6 gap-y-8">
                {cast?.map((el) => {
                    return (
                        <div key={el?.id}>
                            <img src={el?.profile_path} alt="" className="rounded-2xl" />
                            <h4 className=" mt-4 text-xl font-bold">{el?.name}</h4>
                            <h4 className=" mt-1 text-sm font-semibold opacity-80">{el?.character}</h4>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Cast;
