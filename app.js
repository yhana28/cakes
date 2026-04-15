AOS.init();

new FinisherHeader({
    "count": 90,
    "size": {
        "min": 5,
        "max": 144,
        "pulse": 0.1
    },
    "speed": {
        "x": {
            "min": 0,
            "max": 0.5
        },
        "y": {
            "min": 0,
            "max": 0.5
        }
    },
    "colors": {
        "background": "#b580ff",
        "particles": [
            "#ffe960",
            "#87ddfe",
            "#8481ff",
            "#fc7bfc",
            "#e2ffa5"
        ]
    },
    "blending": "overlay",
    "opacity": {
        "center": 0.1,
        "edge": 0.45
    },
    "skew": 0,
    "shapes": [
        "c"
    ]
});

var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 450,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
    },
    loop: true
});