const useUpdateResults = () => {
    const IMG_BASE_URL = "https://image.tmdb.org/t/p/";
    const updateResults = async (results, user, size, backSize = null) => {
        let favIds = [];
        let watchIds = [];

        if (user) {
            favIds = user.favIds;
            watchIds = user.watchIds;
        }
        if (!results) throw new Error("Results array needed");
        const updatedResults = await results.map((el) => {
            const isTitleFav = favIds.includes(el.id);
            const isTitleWatch = watchIds.includes(el.id);

            let backDropSize = size;
            if (backSize) {
                backDropSize = backSize;
            }
            const fixedVoteAverage = el.vote_average.toFixed(2);
            return {
                ...el,
                backdrop_path:
                    IMG_BASE_URL + `w${backDropSize}` + el.backdrop_path,
                poster_path: IMG_BASE_URL + `w${size}` + el.poster_path,
                isSeen: isTitleFav,
                isWatch: isTitleWatch,
                vote_average: fixedVoteAverage,
            };
        });

        return updatedResults;
    };

    return updateResults;
};

export default useUpdateResults;
