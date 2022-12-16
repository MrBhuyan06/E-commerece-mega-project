class CustomError extends Error{

    // how the memory is allocated in class and the function
    // call by value and the call by reference
    constructor(message, code){
        super(message);
        this.code=code
    }
}



module.exports= CustomError