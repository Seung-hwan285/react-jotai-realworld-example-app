export const setLocalStroage=(key,value)=>{
    try{
        window.localStorage.setItem(key,JSON.stringify(value));
    }catch (err){
        console.error(err);
    }
}
export const getLocalStroage=(key)=>{
    try {
        console.log(key);
        const value = window.localStorage.getItem(key);

        console.log(value);
        return value=== null ? null :JSON.parse(value);
    } catch (err) {
        console.error(err);
        return null;
    }
};