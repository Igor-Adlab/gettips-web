import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Carousel from "infinite-react-carousel";
import { map } from "lodash";
import React, { useEffect, useState } from "react";
import CreditCard from "react-credit-cards";

export function CardsCarousel({ token, list = [], onSelect, user }) {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const card = list[selected];
    setTimeout(() => onSelect(card), 0);
  }, [selected]);

  function onChange(old, index) {
    setSelected(index || old);
  }

  return (
    <Carousel
      style={{ width: "100%" }}
      prevArrow={<LeftOutlined style={{ fontSize: "18px", color: "#333" }} />}
      nextArrow={<RightOutlined style={{ fontSize: "18px", color: "#333" }} />}
      className="CardsCarousel"
      arrows={true}
      beforeChange={onChange}
    >
      {map(list, (card) => (
        <div key={card.id}>
          <CreditCard
            preview
            expiry=""
            cvc=""
            name={user.name}
            number={card.masked.replace(/X/gim, "*")}
          />
          {/*{token === card.token ? <div className="CardsCarousel--selected"><CheckCircleTwoTone twoToneColor="#52c41a" /></div> : null}*/}
        </div>
      ))}
    </Carousel>
  );
}
