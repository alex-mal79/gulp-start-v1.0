//================================================================
// Анимация при скролле
//================================================================
const animItems = document.querySelectorAll('._animation');
if(animItems.length > 0){
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll(){
        for(let i = 0; i < animItems.length; i++){
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemsOffset = offset(animItem).top;
            const animStart = 4;

            let animIntemPoint = window.innerHeight - animItemHeight / animStart;
            if(animItemHeight > window.innerHeight){
                animIntemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            if((pageYOffset > animItemsOffset - animIntemPoint) && pageYOffset < (animItemsOffset +     animItemHeight)){
                animItem.classList.add('_active');
            } 
            else{
                animItem.classList.remove('_active')
            }
        }
    }
    function offset(el){
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return{top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }
}