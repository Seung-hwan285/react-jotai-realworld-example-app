export const getLocalStroage=(key,value)=>{
    try{
        window.localStorage.setItem(key,JSON.stringify(value));

    }catch (err){
        console.error(err);
    }
}