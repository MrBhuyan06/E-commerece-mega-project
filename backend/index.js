const mongoose=require("mongoose");
const app= require('./app.js')
const config=require('./config/index.js')

// create a method
// run a method

// (async () =>{})()

(async () =>{
    try {
        await mongoose.connect(config.MONNGODB_URL)
        console.log("DB CONNECTED");
        // express evenet listerner

        app.on('error', (err) =>
        {
            console.log("Error", err);
            throw err;
        })

        const onListening= () =>
        {
            console.log(`Listening on ${config.PORT}`);
        }

        app.listen(config.PORT,onListening)

    } catch (err) {
        console.log("ERROR", err);
        throw err // kill the execution
    }
})()