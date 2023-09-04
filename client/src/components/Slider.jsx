import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, PlusIcon } from "./svgIcons";
import { getFormatedDate } from "../utils/utils";
import useGetApiData from "../hooks/api/useGetApiData";

const Slider = ({ heading, link, listType, showDate }) => {
    const [isLoadingSlider, setIsLoadingSlider] = useState(true);
    const [titlesEls, setTitlesEls] = useState(null);
    const [swiper, setSwiper] = useState(null);
    const [swiperEl, setSwiperEl] = useState(null);
    const swiperRef = useRef(null);

    const [titlesArr, setTitlesArr] = useState(null);
    const location = useLocation();
    const getMovies = useGetApiData();

    useEffect(() => {
        getMovies("movie", listType, 1).then((data) => {
            setTitlesArr(data?.results);
        });
    }, [location?.pathname]);

    useEffect(() => {
        if (titlesArr?.length) {
            setTitlesEls(
                titlesArr.map((el) => {
                    return (
                        <swiper-slide
                            class={`transition-all rounded-md overflow-hidden hover:z-50 group relative hover:opacity-100`}
                            key={el?.id}
                        >
                            <Link to={`/titles/${el?.id}`}>
                                <img src={el?.poster_path} alt="" />
                                {el?.isSeen ? (
                                    <PlusIcon
                                        isFilled={true}
                                        fill="white"
                                        className="absolute bottom-1 right-1 transition-all z-10"
                                    />
                                ) : (
                                    ""
                                )}
                                <div className="absolute bottom-0 left-0 right-0 p-4 h-full flex flex-col items- justify-end bg-opacity-50 bg-sliderGrad transition-all">
                                    <h3 className="text-xl overflow-hidden text-ellipsis whitespace-nowrap font-medium">
                                        {el?.title}
                                    </h3>
                                    <p>{}</p>
                                    {showDate ? (
                                        <p>
                                            {getFormatedDate(el?.release_date)}
                                        </p>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </Link>
                        </swiper-slide>
                    );
                })
            );
        }
    }, [titlesArr]);

    // Swiper init
    useEffect(() => {
        if (swiperEl) {
            swiperRef.current = swiperEl;
            // console.log(swiperRef);
            const params = {
                on: {
                    afterInit: function () {
                        setIsLoadingSlider(false);
                    },
                },
            };

            Object.assign(swiperRef.current, params);

            swiperRef.current.initialize();
        }
    }, [swiperEl]);

    useEffect(() => {
        if (titlesEls) {
            setSwiper(
                <swiper-container
                    class={`w-fulltransition-all duration-700 ${
                        isLoadingSlider
                            ? "opacity-0 pointer-events-none translate-y-[200%]"
                            : "translate-y-0"
                    }`}
                    loop="true"
                    slides-per-view="5"
                    space-between="30"
                    init="false"
                    ref={(el) => {
                        setSwiperEl(el);
                    }}
                >
                    {titlesEls}
                </swiper-container>
            );
        }
    }, [titlesEls, isLoadingSlider]);

    return (
        <div className="container mx-auto px-4 pt-28 pb-36">
            <div className="flex justify-between items-center mb-16">
                <h2 className=" text-4xl font-bold">{heading}</h2>
                <Link to={link} className=" flex items-center gap-3 hover:gap-5 transition-all">
                    See more{" "}
                    <ArrowRight className="fill-white w-5" />
                </Link>
            </div>
            {swiper ? swiper : ""}
        </div>
    );
};

export default Slider;
