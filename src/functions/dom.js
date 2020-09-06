import {getCharacterInfo} from './api.js'

const changeModal = (show)=>{
    const modal = document.querySelector('.modal');
    if (show) {
        modal.style.display = 'block';
    } else {
        modal.style.display = 'none ';
    }

}

const animationHandler = (hide,elements)=>{
    if(hide){
        elements.forEach(element => {
            element.classList.add('hide');
        });
    }else{
        elements.forEach(element =>{
            element.classList.remove('hide');
        })
    }
}

const deleteChildren = (element,elementChildrens)=>{
    while(elementChildrens.length){
        element.removeChild(elementChildrens[0]);
    }
}


const createTextInfo = (characterInfo)=>{
    const content = {
        name : ('Tu personaje es : ' + characterInfo.name),
        status : ('Estado de personaje : ' + characterInfo.status),
        location : ('Tu personaje proviene del planeta: ' + characterInfo.origin.name)
    }
    return content;
}

const createChildren = (element,information)=>{
    for(const text in information){
       if (information[text]) {
           const paragraph = document.createElement('p')
           paragraph.textContent = information[text];
           element.appendChild(paragraph);
       }
    }
}

export const changeCharacterInfo = async (event)=>{
    changeModal(true);
    const gridText = document.querySelector('.grid-text');
    const img = document.querySelector('.character');
    try {
        const characterInfo = await getCharacterInfo();
        changeModal(false);
        animationHandler(true,[gridText,img]);
        setTimeout(()=>{
            event.target.innerHTML = 'Conseguir otro personaje';
            deleteChildren(gridText,gridText.children)
            img.src=characterInfo.image;
            const textInfo = createTextInfo(characterInfo);
            createChildren(gridText,textInfo);
            gridText.style.textAlign = 'center';
            animationHandler(false,[gridText,img]);
        },600)

    } catch (error) {
        changeModal(false);
        console.log(error);
    }

}