import { Slide } from "../Slide";
import classes from "./Carousel.module.scss";
import Slider from "react-slick";
import "@../../slick-carousel/slick/slick.css";
import "@../../slick-carousel/slick/slick-theme.css";
import cn from "classnames";

const slides = [
    {
        img: "./img/carousel/1.svg",
        text: "Многоканальный номер работает через интернет, за счет чего пользоваться услугой можно в любом месте, где есть доступ в Сеть.Сотрудникам компании не обязательно находиться в офисе — на звонки можно отвечать с мобильного или любого другого устройства.",
    },
    {
        img: "./img/carousel/2.svg",
        text: "Облачная АТС позволяет подключить все телефоны компании в общую инфраструктуру. Для стационарных аппаратов потребуется IP-шлюз. Они также поддерживают многоканальный режим. Единый многоканальный номер от МТТ позволяет обрабатывать одновременно до 100 входящих звонков.",
    },
    {
        img: "./img/carousel/3.svg",
        text: "С ВАТС от МТТ вы получаете не просто многоканальные телефонные линии с возможностью объединения стационарных телефонов, смартфонов, IP-аппаратов. Вы получаете мощный аналитический инструмент для вашего бизнеса. Изучайте отчеты о звонках в личном кабинете или настройте подключение к CRM, чтобы свести всю информацию о клиентах в общую базу.",
    },
    {
        img: "./img/carousel/4.svg",
        text: "К одной АТС возможно подключение нескольких телефонных номеров. Если компания расширяется, можно выбирать городские номера с разной региональной привязкой. Так вы сможете централизованно обрабатывать все обращения клиентов.",
    },
];

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <img
            className={cn(classes.arrow__next, classes.arrow)}
            onClick={onClick}
            src='/img/arrow_right.svg' alt={""}
        />
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (

        <img
            className={cn(classes.arrow__prev, classes.arrow)}
            onClick={onClick}
            src='/img/arrow_left.svg'  alt={""}
        />
    );
}

export const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        //  autoplay: true,
        className: `${classes.carousel__wrapper}`,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        appendDots: (dots) => (
            <div className={classes.slickDots}>
                <ul className={classes.dots}>{dots}</ul>
            </div>
        ),
    };

    return (
        <Slide
            title="Возможности городского номера"
            className={classes.carousel}
        >
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <CarouselSlide slide={slide} key={index} />
                ))}
            </Slider>
        </Slide>
    );
};

const CarouselSlide = ({ slide }) => {
    return (
        <div className={classes.slider__wrapper}>
            <img
                src={slide.img}
                alt={"company info"}
                className={classes.slider__img}
            />
            <p className={classes.slider__text}>{slide.text}</p>
        </div>
    );
};
