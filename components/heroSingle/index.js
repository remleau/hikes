import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatDate } from "../utils/utils";
import { gsap } from "gsap";

import 'swiper/css';

export default function ({ hike, animated = false }) {
  const texth1ref = useRef();
  const textref = useRef();
  const statref = useRef();
  const sliderref = useRef();

  useEffect(() => {
    if (animated) {
      gsap.fromTo(texth1ref.current, { xPercent: "-100", opacity: 0 }, { xPercent: "0", opacity: 1, duration: 0.6, ease: 'power2.easeOut', delay: 0.5});
      gsap.fromTo(textref.current, { xPercent: "-50", opacity: 0 }, { xPercent: "0", opacity: 1, duration: 0.6, ease: 'power2.easeOut', delay: 0.6});
      gsap.fromTo(statref.current, { yPercent: "50", opacity: 0 }, { yPercent: "0", opacity: 1, duration: 0.5, ease: 'power2.easeOut', delay: 0.75});
      gsap.fromTo(sliderref.current, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power2.easeOut', delay: 0.7});
    }
  }, [animated])

  return (
    <div className={`heroSingle`}>
      <div className="content">
        <div className="text" ref={texth1ref}>
          <h1>{hike?.name}</h1>
        </div>
        <div className="text" ref={textref}>
          <p>Spare ribs salami shank cow pastrami sirloin buffalo. Alcatra ham doner, salami jowl chuck pork chop Spare ribs salami shank cow pastrami sirloin buffalo.</p>
        </div>
        <div className="stats" ref={statref}>
          <div className="hikeName">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p>{hike?.location && hike?.location?.adress}</p>
          </div>
          <div className="hikeDate">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>{formatDate(hike?.date?.seconds)}</p>
          </div>
          <div className="hikeKilometer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>{hike?.kilometer + 'km'}</p>
          </div>
        </div>
      </div>
      <div className="slider-heroHome" ref={sliderref}>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
        >
          {hike?.files && hike?.files.map((image, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="image" style={{ backgroundImage: `url(${image})` }}>
                  <div className="overlay"></div>
                  <div className="copyrights">
                    <p><span>{formatDate(hike?.date?.seconds)}</span></p>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}