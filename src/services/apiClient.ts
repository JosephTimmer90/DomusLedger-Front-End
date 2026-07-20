//Define the error class
class ApiRequestError extends Error {
    status: number;
    constructor(message: string, status: number){
        super(message);
        this.status = status;
        this.name = "ApiRequestError";
    }
}

// Generic apiClient function
async function apiClient<T>(url:string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
        //Throw custom error
        throw new ApiRequestError('failed to fetch data', response.status);
    }

    return response.json() as Promise<T>;
}

interface User{
    id: number;
    name: string;
}

async function getUser(){
    try{
        const user = await apiClient<User>("/api/user/1");
        console.log(user.name);
    } catch(error){
        if(error instanceof ApiRequestError){
            console.log('Error code: ${error.status}');
        }
    }
}