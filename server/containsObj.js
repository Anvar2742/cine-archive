function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].id === obj.id) {
            return i;
        }
    }

    return -1;
}

const obj = {
    adult: false,
    backdrop_path:
        "https://image.tmdb.org/t/p/w1280/jZIYaISP3GBSrVOPfrp98AMa8Ng.jpg",
    genre_ids: [16, 35, 10751, 14, 10749],
    id: 976573,
    original_language: "en",
    original_title: "Elemental",
    overview:
        "In a city where fire, water, land and air residents live together, a fiery young woman and a go-with-the-flow guy will discover something elemental: how much they have in common.",
    popularity: 3816.744,
    poster_path:
        "https://image.tmdb.org/t/p/w1280/6oH378KUfCEitzJkm07r97L0RsZ.jpg",
    release_date: "2023-06-14",
    title: "Elemental",
    video: false,
    vote_average: 7.8,
    vote_count: 1273,
    isFav: true,
};

const list = [
    {
        adult: false,
        backdrop_path:
            "https://image.tmdb.org/t/p/w1280/jZIYaISP3GBSrVOPfrp98AMa8Ng.jpg",
        genre_ids: [16, 35, 10751, 14, 10749],
        id: 976573,
        original_language: "en",
        original_title: "Elemental",
        overview:
            "In a city where fire, water, land and air residents live together, a fiery young woman and a go-with-the-flow guy will discover something elemental: how much they have in common.",
        popularity: 3816.744,
        poster_path:
            "https://image.tmdb.org/t/p/w1280/6oH378KUfCEitzJkm07r97L0RsZ.jpg",
        release_date: "2023-06-14",
        title: "Elemental",
        video: false,
        vote_average: 7.8,
        vote_count: 1273,
        isFav: true,
    },
];

console.log(containsObject(obj, list));
