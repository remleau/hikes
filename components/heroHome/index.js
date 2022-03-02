import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link'

import 'swiper/css';

export default function () {
  return (
    <div className="heroHome">
      <div className="content">
        <div className="text">
          <h1>Bresaola leberkas picanha pancetta</h1>
        </div>
        <div className="text">
          <p>Spare ribs salami shank cow pastrami sirloin buffalo. Alcatra ham doner, salami jowl chuck pork chop Spare ribs salami shank cow pastrami sirloin buffalo.</p>
        </div>
        <Link href="/hikes/create">
          <a className="btn"><span>Add hike</span></a>
        </Link>
        <a href="" className="btn"><span>Add Pictures</span></a>
      </div>
      <div className="slider-heroHome">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>
            <div className="image" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3570&q=80)" }}>
              <div className="overlay"></div>
              <div className="copyrights">
                <p>Mont washington <span>26 octobre 2019</span></p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="image" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3570&q=80)" }}>
              <div className="overlay"></div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}