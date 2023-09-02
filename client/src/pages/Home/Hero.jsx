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
    const [swiperRef, setSwiperRef] = useState(null);
    const swiperEl = useRef(null);
    const getMovies = useGetApiData();
    const location = useLocation();

    const handleMouseEnter = (i) => {
        setHeroBg(() => {
            return titlesArr[i].backdrop_path;
        });
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
                            class="transition-all rounded-md overflow-hidden hover:scale-150 hover:-translate-y-[25%] hover:z-50 group relative"
                            key={el?.id}
                        >
                            <Link
                                to={`/titles/${el?.id}`}
                                onMouseEnter={() => handleMouseEnter(i)}
                            >
                                <img src={el?.poster_path} alt="" />
                                {el?.isSeen ? (
                                    <PlusIcon
                                        isFilled={true}
                                        fill="white"
                                        className="absolute top-3 right-4"
                                    />
                                ) : (
                                    ""
                                )}
                                <div className="absolute bottom-0 left-0 right-0 mx-auto h-full flex items-end justify-center bg-opacity-50 bg-sliderGrad transition-all group-hover:opacity-100 opacity-0">
                                    <h3 className="pb-4 text-sm px-4 overflow-hidden text-ellipsis whitespace-nowrap font-semibold transition-all duration-300 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                        {el?.title}
                                    </h3>
                                </div>
                            </Link>
                        </swiper-slide>
                    );
                });
            });

            setHeroBg(titlesArr[0].backdrop_path);
        }
    }, [titlesArr]);

    useEffect(() => {
        if (titlesEls) {
            setSwiper(
                <swiper-container
                    class={`w-full overflow-visible transition-opacity ${
                        isLoadingSlider ? "opacity-0 pointer-events-none" : ""
                    }`}
                    loop="true"
                    centered-slides="true"
                    slides-per-view="8"
                    space-between="30"
                    init="false"
                    ref={(el) => {
                        setSwiperRef(el);
                    }}
                >
                    {titlesEls}
                </swiper-container>
            );
        }
    }, [titlesEls]);

    // Swiper init
    useEffect(() => {
        if (swiperRef) {
            swiperEl.current = swiperRef;
            // console.log(swiperEl);
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

            Object.assign(swiperEl.current, params);

            swiperEl.current.initialize();
        }
    }, [swiperRef]);

    register();

    if (isLoading) return <Loader />;

    return (
        <div
            style={{ "--image-url": `url(${heroBg})` }}
            className={`h-screen transition-all bg-center bg-cover relative after:block after:w-full after:h-full after:absolute after:top-0 after:left-0 after:bg-primary after:bg-opacity-40 ${
                heroBg ? `bg-[image:var(--image-url)]` : "bg-hero"
            }`}
        >
            <div className="flex items-end justify-center h-full overflow-hidden pb-10 relative">
                {swiper ? swiper : ""}
            </div>
        </div>
    );
};

export default HomeHero;
