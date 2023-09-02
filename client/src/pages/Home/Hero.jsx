import { Link, useLocation } from "react-router-dom";
import useGetApiData from "../../hooks/api/useGetApiData";
import Loader from "../../components/Loader";
import { useEffect, useRef, useState } from "react";
import { register } from "swiper/element/bundle";
import { PlusIcon } from "../../components/svgIcons";

const HomeHero = () => {
    const [titlesArr, setTitlesArr] = useState(null);
    const [titlesEls, setTitlesEls] = useState(null);
    const [isLoadingSlider, setIsLoadingSlider] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [heroBg, setHeroBg] = useState(null);
    const [swiper, setSwiper] = useState(null);
    const [swiperEl, setSwiperEl] = useState(null);
    const [isHover, setIsHover] = useState(false);
    const swiperRef = useRef(null);
    const getMovies = useGetApiData();
    const location = useLocation();

    const handleMouseEnter = (i) => {
        setHeroBg(() => {
            return titlesArr[i].backdrop_path;
        });
        setIsHover(true);
    };

    const handleMouseLeave = (i) => {
        setIsHover(false);
    };

    const updateList = (listType) => {
        setIsLoadingSlider(true);
        setTimeout(() => {
            setSwiper(null);
            setSwiperEl(null);
            setTitlesEls(null);
            getMovies("movie", listType, 1).then((data) => {
                setTitlesArr(data?.results);
            });
        }, 300);
    };

    useEffect(() => {
        getMovies("movie", "now_playing", 1)
            .then((data) => {
                setTitlesArr(data?.results);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [location?.pathname]);

    useEffect(() => {
        if (titlesArr?.length) {
            setTitlesEls(() => {
                return titlesArr.map((el, i) => {
                    return (
                        <swiper-slide
                            class={`transition-all rounded-md overflow-hidden hover:scale-[2] hover:-translate-y-[50%] hover:z-50 group relative ${
                                isHover ? "opacity-50" : ""
                            } hover:opacity-100`}
                            key={el?.id}
                        >
                            <Link
                                to={`/titles/${el?.id}`}
                                onMouseEnter={() => handleMouseEnter(i)}
                                onMouseLeave={() => handleMouseLeave(i)}
                            >
                                <img src={el?.poster_path} alt="" />
                                {el?.isSeen ? (
                                    <PlusIcon
                                        isFilled={true}
                                        fill="white"
                                        className="absolute bottom-1 right-1 transition-all scale-75 group-hover:bottom-0 group-hover:right-0 group-hover:scale-50 z-10"
                                    />
                                ) : (
                                    ""
                                )}
                                <div className="absolute bottom-0 left-0 right-0 mx-auto h-full flex items-end justify-center bg-opacity-50 bg-sliderGrad transition-all group-hover:opacity-100 opacity-0">
                                    <h3 className="pb-4 text-[9px] px-4 overflow-hidden text-ellipsis whitespace-nowrap font-medium transition-all duration-300 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                        {el?.title}
                                    </h3>
                                </div>
                            </Link>
                        </swiper-slide>
                    );
                });
            });

            if (isLoadingSlider) {
                setHeroBg(titlesArr[0].backdrop_path);
            }
        }
    }, [titlesArr, isHover]);

    useEffect(() => {
        if (titlesEls) {
            setSwiper(
                <swiper-container
                    class={`w-full overflow-visible transition-all duration-700 ${
                        isLoadingSlider
                            ? "opacity-0 pointer-events-none translate-y-[200%]"
                            : "translate-y-0"
                    }`}
                    loop="true"
                    centered-slides="true"
                    slides-per-view="8"
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

    // Swiper init
    useEffect(() => {
        if (swiperEl) {
            swiperRef.current = swiperEl;
            // console.log(swiperRef);
            const params = {
                injectStyles: [
                    `
                        .swiper {
                            overflow: unset;
                        }
                    `,
                ],
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

    register();

    if (isLoading) return <Loader />;

    return (
        <div
            style={{ "--image-url": `url(${heroBg})` }}
            className={`h-screen transition-all bg-center bg-cover bg-no-repeat relative after:block after:w-full after:h-full after:absolute after:top-0 after:left-0 after:bg-primary after:bg-opacity-40 ${
                heroBg ? `bg-[image:var(--image-url)]` : "bg-hero"
            }`}
        >
            <div className="absolute left-[5%] top-1/3 z-10">
                <button
                    onClick={() => updateList("now_playing")}
                    className="block"
                >
                    Now playing
                </button>
                <button
                    onClick={() => updateList("upcoming")}
                    className="block"
                >
                    Upcoming
                </button>
            </div>
            <div className="flex items-end justify-center h-full overflow-hidden pb-10 relative">
                {swiper ? swiper : ""}
            </div>
        </div>
    );
};

export default HomeHero;
