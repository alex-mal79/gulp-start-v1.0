//================================================================
//Меню DropDown
//================================================================
const dropMenuButtons = document.querySelectorAll('.menu__button');
const mediaQuery = window.matchMedia('(min-width: 992px)');
if(dropMenuButtons){
    for(let i = 0; i < dropMenuButtons.length; i++){
        let dropMenuButton = dropMenuButtons[i];
        dropMenuButton.addEventListener("click", function(e){
            let currentButton = e.currentTarget;
            let dropDownParent = currentButton.closest('.menu__item');

            function ScreenChange(e) {
                if (e.matches) {
                    for(let i = 0; i < dropMenuButtons.length; i++){
                        let dropMenuButton = dropMenuButtons[i];
                        if(dropMenuButton !== currentButton){
                            dropMenuButton.closest('.menu__item').classList.remove('_active'); 
                        }
                    }
                }
            }
            mediaQuery.addListener(ScreenChange);
            ScreenChange(mediaQuery);

            dropDownParent.classList.toggle('_active');
        });
    }
    document.addEventListener("click", function(e){
        if(!e.target.closest('.menu')){
            for(let i = 0; i < dropMenuButtons.length; i++){
                let dropMenuButton = dropMenuButtons[i];
                dropMenuButton.closest('.menu__item').classList.remove('_active');
            }
        }
    });
}