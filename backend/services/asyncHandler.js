const asyncHandler= (fn) => async (req, res, next) => {
    try {
       await  fn(req, res, next)
    } catch (error) {
        res.status(error.code || 500).json(
            {
                success:false,
            }
        )
    }
}


module.exports=asyncHandler



// const asyncHandler= () => {};
// const asyncHandler= (fn) => {};
// const asyncHandler= (fn) => () => {};
// const asyncHandler= (fn) => async () =>{};

//
// function asyncHandle(fn)
// {
//     return async function(req, res, next)
//     {
//         try {
//             await  fn(req, res, next)
//         } catch (error) {
//             res.status(error.code || 500).json(
//                 {
//                     success:false,
//                 }
//             )
//         }
//     }
// }