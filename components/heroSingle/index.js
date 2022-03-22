import { Swiper, SwiperSlide } from 'swiper/react';
import { formatDate } from "../utils/utils";
import Link from 'next/link'

import 'swiper/css';

export default function ({ hike }) {

  console.log(hike)

  return (
    <div className="heroSingle">
      <div className="content">
        <div className="text">
          <h1>{hike?.name}</h1>
        </div>
        <div className="text">
          <p>Spare ribs salami shank cow pastrami sirloin buffalo. Alcatra ham doner, salami jowl chuck pork chop Spare ribs salami shank cow pastrami sirloin buffalo.</p>
        </div>
      </div>
      <div className="slider-heroHome">
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