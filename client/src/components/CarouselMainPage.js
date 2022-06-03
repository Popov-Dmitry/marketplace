import React from 'react';
import {Carousel} from "react-bootstrap";
import sale from "../assets/images/sale.jpg"

const CarouselMainPage = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className={"d-block w-100"}
                    src={sale}
                    alt="Summer sale"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className={"d-block w-100"}
                    src={sale}
                    alt="Summer sale"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className={"d-block w-100"}
                    src={sale}
                    alt="Summer sale"
                />
            </Carousel.Item>
        </Carousel>
    );
};

export default CarouselMainPage;
