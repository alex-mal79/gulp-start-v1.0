//================================================================
//Слайдер Swiper
//================================================================
let swiperGallery = new Swiper('.slider-gallery__body',{
    // Обновление слайдера при изминении элементов слайдера
    observer: true,
    // Обновление слайдера при изминении родительских элементов слайдера
    observerParents: true,
    // Обновление слайдера при изминении дочерних элементов слайдера
    observerSlideChildren: true,
    // Показ количества слайдеров
    slidesPerView: 3,
    // Количество пролистываемых слайдеров
    slidesPerGroup: 3,
    // Авто высота
    autoHeight: true,
    // Мультирядность
    grid: {
        rows: 2,
      },
    // Отступ между слайдами, px
    spaceBetween: 30,
    // Бесконечная прокрутка
    loop: true,
    // Автопрокрутка
    autoplay:{
        // Пауза между прокруткой
        delay: 1000,
        // Закончить на последнем слайде
        StopOnLastSlide: true,
        // Отключить после ручного переключения
        disableOnInteraction: false,
    },
    // Скорость переключения слайдов
    speed: 1500,
    // Навигация
    // Стрелки
    navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
    },
    // Буллеты, Текущее положение, Прогрессбар
    pagination: {
        el: '.swiper-pagination',
        // Буллеты
        // clickable: true,
        // Динамические буллеты
        // dynamicBullets: true,
        // Кастомные буллеты
        // renderBullet: function(index, className){
        //     return '<span class="' + className + '">' + (index + 1) + '</span>';
        // },
        // Фракции
        type: 'fraction',
        // Кастомный вывод фракции
        renderFraction: function(currentClass, totalClass){
            return 'Фото <span class="' + currentClass + '"></span>' +
                    ' из ' +
                    '<span class="' + totalClass + '"></span>'
        },
        // Шкала просмотра слайдов
        // type: 'progressbar',
    },
    // Адаптив
    breakpoints: {
        320: {
            
        },
        480: {
            
        },
        992: {

        },
    },
});