const useUpdateResults = () => {
    const IMG_BASE_URL = "https://image.tmdb.org/t/p/";
    const updateResults = async (results, favIds, watchIds, size) => {
        if (!results) throw new Error("Results array needed");
        const updatedResults = await results.map((el) => {
            const isTitleFav = favIds.includes(el.id);
            const isTitleWatch = watchIds.includes(el.id);

            return {
                ...el,
                backdrop_path: IMG_BASE_URL + `w${size}` + el.backdrop_path,
                poster_path: IMG_BASE_URL + `w${size}` + el.poster_path,
                isFav: isTitleFav,
                isWatch: isTitleWatch,
            };
        });

        return updatedResults;
    };

    return updateResults;
};

export default useUpdateResults;
