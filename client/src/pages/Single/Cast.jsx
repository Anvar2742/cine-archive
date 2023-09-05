import React from "react";

const Cast = ({ cast }) => {
    return (
        <div>
            <h2>Cast</h2>
            <div className="grid grid-cols-4 gap-4">
                {cast?.map((el) => {
                    return (
                        <div>
                            <img src={el?.profile_path} alt="" />
                            <h4>{el?.name}</h4>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Cast;
