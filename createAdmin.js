const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Admin = require("./models/Admin");
/** 
mongoose.connect("mongodb://localhost:27017/custom3d", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        const hashedPassword = await bcrypt.hash("admin", 10);
        await Admin.create({ email: "admin@gmail.com", password: hashedPassword });
        console.log("Admin user created!");
        mongoose.connection.close();
    })
    .catch(err => console.log(err));


    bcrypt.hash("adminpassword", 10, (err, hash) => {
        console.log("New Hashed Password:", hash);
    });

async function generateHashedPassword(password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("Hashed Password:", hashedPassword);
    }
    
    generateHashedPassword("bogey");
*/




const enteredPassword = "bogey"; // The password you entered
const storedHash = "$2a$10$0opWpqnI1tifUIr6CkvSOuUcQC61JsRw7COq1xLIee43k.m67aqEu"; // Hashed password from MongoDB

bcrypt.compare(enteredPassword, storedHash, (err, result) => {
    if (err) {
        console.error("Error comparing passwords:", err);
    } else {
        console.log("Password Match:", result); // Should return `true`
    }
});
