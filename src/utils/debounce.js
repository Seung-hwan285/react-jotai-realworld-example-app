export const debounce=(func,delay)=>{
    // 위의 코드에서 func는 실행하려는 함수이며 delay는 대기 시간입니다.
    // 이 함수는 실제로 delay 시간이 지난 후에 실행됩니다.
    let timeoutId;
    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
}