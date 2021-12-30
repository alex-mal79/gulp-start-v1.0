//================================================================
// Шапка при скролле
//================================================================
const header = document.querySelector('.header');
if(header){
    let lastScroll = 0;
    const defaultOffset = 150;
    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;            
    const containHide = () => header.classList.contains('_active');
    window.addEventListener('scroll', () => {
        if(scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
            //scroll down
            header.classList.add('_active');
        }
        else if(scrollPosition() < lastScroll && containHide()){
            //scroll up
            header.classList.remove('_active');
        }
        lastScroll = scrollPosition();
    });
}