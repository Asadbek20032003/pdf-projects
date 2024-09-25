import { Container } from "@mui/material";
import { dataList, imageList, dataImageList } from "./headerData";
import gsap from "gsap";
import "./header.scss";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Card, Col, Row } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Header() {
  const bannerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalItems = Math.max(dataList.length, imageList.length);

  const handleNext = () => {
    setIsAnimating(true);
    setCurrentIndex((prev) =>
      prev + itemsPerPage < totalItems ? prev + itemsPerPage : 0
    );
  };
  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) =>
        prev - itemsPerPage >= 0
          ? prev - itemsPerPage
          : totalItems - itemsPerPage
      );
    }
  };

  const handleDotClick = (index: number) => {
    console.log(index * itemsPerPage);
    setCurrentIndex(index * itemsPerPage);
  };

  const [isDesktop, setIsDesktop] = useState<boolean>(
    window.matchMedia("(max-width: 960px)").matches
  );
  const [isMobile, setIsMobile] = useState<boolean>(
    window.matchMedia("(max-width: 768px)").matches
  );
  const [isMiniMobile, setIsMiniMobile] = useState<boolean>(
    window.matchMedia("(max-width: 480px)").matches
  );

  useLayoutEffect(() => {
    gsap.context(() => {
      // if (isMiniMobile) {
      //   dataImageList.forEach((item) => {
      //     gsap.timeline().fromTo(
      //       `.banner__item1__${item.id}`,
      //       { opacity: 0, x: -100, width: "100%" },
      //       {
      //         opacity: 1,
      //         x: 0,
      //         duration: 0.8,
      //         width: "100%",
      //         onComplete: () => setIsAnimating(true),
      //       }
      //     );
      //   });
      // } else
      if (isDesktop || isMobile) {
        dataList.forEach((item) => {
          gsap.timeline().fromTo(
            `.banner__item1__${item.id}`,
            { opacity: 0, y: -100, width: "100%" },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              width: "100%",
              onComplete: () => setIsAnimating(true),
            }
          );
        });
        imageList.forEach((item) => {
          gsap.timeline().fromTo(
            `.banner__item2__${item.id}`,
            { opacity: 0, y: 100, width: "100%" },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              width: "100%",
              onComplete: () => setIsAnimating(false),
            }
          );
        });
      } else {
        dataList.forEach((item) => {
          gsap
            .timeline()
            .fromTo(
              `.banner__item1__${item.id}`,
              { x: 300, scale: 1, width: 0 },
              {
                x: 0,
                scale: 1,
                duration: 1,
                width: "100%",
                onComplete: () => setIsAnimating(true),
              }
            )
            .fromTo(
              `.banner__item1__${item.id} > .banner__text`,
              { opacity: 0 },
              { opacity: 1, duration: 0.5 }
            );
        });
        imageList.forEach((item) => {
          gsap
            .timeline()
            .fromTo(
              `.banner__item2__${item.id}`,
              { x: 300, scale: 1, width: 0, opacity: 1 },
              {
                x: 0,
                scale: 1,
                duration: 1,
                opacity: 1,
                width: "100%",
                onComplete: () => setIsAnimating(false),
              }
            )
            .fromTo(
              `.banner__item2__${item.id} > .banner__text`,
              { opacity: 0 },
              { opacity: 1, duration: 0.5 }
            );
        });
      }
    }, bannerRef);
  }, [currentIndex, isMobile, isDesktop, isMiniMobile]);

  useEffect(() => {
    const timeline = gsap.timeline({ repeat: -1, repeatDelay: 5 });
    timeline.to(
      {},
      {
        duration: 5,
        onComplete: () => {
          if (!isMobile) {
            handleNext();
          } else {
            const currentIndexPage = Math.floor(currentIndex / itemsPerPage);
            const nextIndexPage =
              (currentIndexPage + 1) % Math.ceil(totalItems / itemsPerPage);
            handleDotClick(nextIndexPage);
          }
        },
      }
    );
    return () => {
      timeline.kill();
    };
  }, [[currentIndex, isMobile, itemsPerPage, totalItems]]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 960px)");
    const mediaQueryMobile = window.matchMedia("(max-width: 768px)");
    const mediaQueryMiniMoile = window.matchMedia("(max-width: 480px)");

    const handleResize = () => setIsDesktop(mediaQuery.matches);
    const handleSize = () => {
      setIsMobile(mediaQueryMobile.matches);
      setItemsPerPage(mediaQueryMobile.matches ? 1 : 2);
    };
    const handleMiniSize = () => setIsMiniMobile(mediaQueryMiniMoile.matches);

    mediaQuery.addEventListener("change", handleResize);
    mediaQueryMobile.addEventListener("change", handleSize);
    mediaQueryMiniMoile.addEventListener("change", handleMiniSize);

    handleResize();
    handleSize();
    handleMiniSize();

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
      mediaQueryMobile.removeEventListener("change", handleSize);
      mediaQueryMiniMoile.removeEventListener("change", handleMiniSize);
    };
  }, []);

  return (
    <div className="banner__wrapper" ref={bannerRef}>
      <Container>
        <div className="flex banner__lists gap-10">
          {!isMiniMobile ? (
            <>
              <div className="banner__items">
                {dataList
                  .slice(currentIndex, currentIndex + itemsPerPage)
                  .map((i, idx) => (
                    <div
                      key={idx}
                      className={`banner__item item__clip__1 banner__item1__${i.id}`}
                    >
                      <span className="banner__text">{i.text}</span>
                      <div className="banner__image col-span-1">
                        <img src={i.image} alt="img" />
                      </div>
                    </div>
                  ))}
              </div>
              <div className="banner__items">
                {imageList
                  .slice(currentIndex, currentIndex + itemsPerPage)
                  .map((i, idx) => (
                    <div
                      key={idx}
                      className={`banner__item item__clip__2 banner__item2__${i.id}`}
                    >
                      <span className="banner__text">{i.text}</span>
                      <div className="banner__image col-span-1">
                        <img src={i.image} alt="img" />
                      </div>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <>
              <div className="banner__items w-full">
                {/* <Row gutter={[24, 24]}>
                  {dataImageList
                    .slice(currentIndex, currentIndex + itemsPerPage)
                    .map((i, idx) => (
                      <Col span={24}>
                        <Card
                          hoverable
                          cover={<img alt={`img-${idx}`} src={i.image} />}
                          className={`banne__item item__clip__1 banner__item1__${i.id}`}
                        >
                          <Card.Meta title={i.text} />
                        </Card>
                      </Col>
                    ))}
                </Row> */}
                <>
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                  >
                    <Row gutter={[24, 24]}>
                      {dataImageList.map((i, idx) => (
                        <SwiperSlide>
                          <Col span={24}>
                            <Card
                              hoverable
                              cover={<img alt={`img-${idx}`} src={i.image} />}
                              className={`banne__item item__clip__1`}
                            >
                              <Card.Meta title={i.text} />
                            </Card>
                          </Col>
                        </SwiperSlide>
                      ))}
                    </Row>
                  </Swiper>
                </>
              </div>
            </>
          )}
        </div>
        <div className="navigation-buttons">
          {!isMobile ? (
            <>
              <button
                className={`nav-button ${currentIndex === 0 ? "active" : ""}`}
                onClick={handlePrev}
              ></button>
              <button
                className={`nav-button ${
                  currentIndex + itemsPerPage >= totalItems ? "active" : ""
                }`}
                onClick={handleNext}
              ></button>
            </>
          ) : !isMiniMobile ? (
            <>
              {Array(Math.ceil(totalItems / itemsPerPage))
                .fill(0)
                .map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${
                      Math.floor(currentIndex / itemsPerPage) === index
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleDotClick(index)}
                  ></button>
                ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Header;
