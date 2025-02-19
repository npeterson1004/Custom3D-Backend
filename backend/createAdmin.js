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
*/

    bcrypt.hash("adminpassword", 10, (err, hash) => {
        console.log("New Hashed Password:", hash);
    });

