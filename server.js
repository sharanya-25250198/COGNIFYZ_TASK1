const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

mongoose.connect(
"mongodb+srv://25250198sharanya_db_user:Sharanya123@cluster0.uiyxadq.mongodb.net/studentDB?retryWrites=true&w=majority&tls=true"
)

.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    course: String,
    password: String,
    confirmPassword: String,
    phone: String,
    age: Number
});

const Student = mongoose.model("Student", studentSchema);

app.post("/submit", async (req, res) => {

    try {

                const student = new Student(req.body);

        await student.save();

        res.status(200).json({
            message: "Form Submitted Successfully!"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error saving data"
        });

    }

});