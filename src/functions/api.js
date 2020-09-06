
const randomNumber = (maxNumber)=>{
    return Math.floor(Math.random()*(maxNumber+1));
}

export const getCharacterInfo = async ()=>{
    try {
        const link = 'https://rickandmortyapi.com/api/character/' + randomNumber(671);
        const rawCharacterInfo = await fetch(link);
        const characterInfo = await rawCharacterInfo.json()
        return characterInfo;
    } catch (error) {
        throw (error);
    }
}