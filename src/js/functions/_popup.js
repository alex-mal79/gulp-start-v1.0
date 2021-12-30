//================================================================
//Модальные окна
//================================================================
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if(popupLinks.length > 0){
    for(let i = 0; i < popupLinks.length; i++){
        const popupLink = popupLinks[i];
        popupLink.addEventListener("click", function(e){
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault;
        });
    }
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if(popupCloseIcon.length > 0){
    for(let i = 0; i < popupCloseIcon.length; i++){
        const el = popupCloseIcon[i];
        el.addEventListener('click', function(e){
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}
function popupOpen(curentPopup){
    if(curentPopup && unlock){
        const popupActive = document.querySelector('.popup._open');
        if(popupActive){
            popupClose(popupActive, false);
        }
        else{
            bodyLock();
        }
        curentPopup.classList.add('_open');
        curentPopup.addEventListener("click", function(e){
            if(!e.target.closest('.popup__content')){
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}
function popupClose(popupActive, doUnlock = true){
    if(unlock){
        popupActive.classList.remove('_open');
        if(doUnlock){
            bodyUnLock();
        }
    }
}
function bodyLock(){
    const lockPaddingValue = window.innerWidth - document.querySelector('.page').offsetWidth + 'px';
    if(lockPadding.length > 0){
        for(let i = 0; i < lockPadding.length; i++){
            const el = lockPadding[i];
            el.style.paddingRight = lockPaddingValue;

        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('_lock');

    unlock = false;
    setTimeout(() => {
        unlock = true;
    },timeout);
}
function bodyUnLock(){
    setTimeout(function(){
        if(lockPadding.length > 0){
            for(let i = 0; i < lockPadding.length; i++){
                const el = lockPadding[i];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('_lock');

    }, timeout);
    unlock = false;
    setTimeout(() => {
       unlock = true 
    }, timeout);
}
document.addEventListener('keydown', function(e){
    if(e.which === 27){
        const popupActive = document.querySelector('.popup._open');
        popupClose(popupActive);
    }
});
(function(){
    if(!Element.prototype.closest){
        Element.prototype.closest = function(css){
            var node = this;
            while(node){
                if(node.matches(css)) return node
                else node = node.parentElement;
            }
            return null;
        };
    }
})();
(function(){
    if(!Element.prototype.matches){
        Element.prototype.matches = Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.msMatchesSelector;
    }
})();