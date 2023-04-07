export const request={
    userLogin:async (email,password)=>{
        try{
            const response = await fetch('https://api.realworld.io/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    user:{    email: email,
                        password: password
                }})
            });
            const data = await response.json();

            if (response.ok) {
                const token = data.user.token;
                return token;
            } else {
                throw new Error(data.errors);
            }
        } catch (error) {
            console.error(error);
        }
    },


}