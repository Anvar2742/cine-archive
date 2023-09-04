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

            const backdrop = el?.backdrop_path
                ? IMG_BASE_URL + `w${backDropSize}` + el.backdrop_path
                : "https://placehold.co/1280x720?text=No%20image";
            const poster = el?.poster_path
                ? IMG_BASE_URL + `w${size}` + el.poster_path
                : "https://placehold.co/1280x1920?text=No%20image";

            return {
                ...el,
                backdrop_path: backdrop,
                poster_path: poster,
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
