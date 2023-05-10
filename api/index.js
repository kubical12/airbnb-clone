const express = require('express');
const cors = require("cors");
const mongoose= require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require('./models/User')
const cookieParser = require('cookie-parser'); 
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const app = express();
const place = require('./models/Place')
require('dotenv').config();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "gfyugudikmshgud";

app.use(express.json({extended : true}));   
app.use(cookieParser());
app.use("/uploads",express.static("uploads"));
app.use(cors({
    credentials :true ,
    origin: "http://127.0.0.1:5173",
}));  


const mongooseUrl = "mongodb+srv://kubraroshi:kubra123@cluster0.szye5cg.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongooseUrl , {
    useNewUrlParser: true
    // useUnifiedTopology: false 
}).then(()=> {console.log("Connected to database");})
.catch((e) => console.log(e))

app.post("/register" , async (req,res)=> {
    const{name, email,password} = req.body;
    try{
        const userDoc = await User.create({  
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt)
        })
        res.json(userDoc);
    } catch(e){
        res.statusCode(422).json(e);
    }
})
app.post("/login" , async(req,res) => {
    const{email,password}= req.body;
  const userDoc = await  User.findOne({email});
    if(userDoc){
       const passOk = bcrypt.compareSync(password , userDoc.password);
       if(passOk){  
        jwt.sign({email:userDoc.email , id:userDoc._id } ,jwtSecret,{},(err, token) => {
            if(err) throw err;
            res.cookie("token" , token ).json(userDoc);
        })
       }  
       else{
        res.json("pass not ok");
       }
    } else{
        res.json("not found ");
    }   
})

app.get("/profile" , (req,res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify(token , jwtSecret, {} , async (err, userData) => {
            if(err) throw err;
           const {name,email,id} = await User.findById(userData.id)
            res.json(name,email,id);
        });
    } else {
        res.json(null);
    }   
})

app.post('/logout' , (req,res) => {   
    res.cookie('token' , '').json(true);
})

console.log({__dirname})
app.post('/upload-by-link' , async(req,res) => {
    const {link} = req.body;
    const newName = Date.now() + '.jpg';
   await imageDownloader.image({
        url: link,
        dest: __dirname+'uploads/' +newName,
    })
    res.json(newName);
})
const photoMiddleware = multer({dest: 'uploads/'})
app.post('/upload' , photoMiddleware.array('photos' , 100),(req,res) => {
   const uploadedFiles = [];
    for(let i =0 ; i<req.files.length ; i++){
        const {path , originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path , newPath)
        uploadedFiles.push(newPath.replace('uploads',''));

    }
    // console.log(req.files);
 res.json(uploadedFiles);
})

app.post("/places"  , (req,res) => {
    const {token} = req.cookies;
    const {title, address , addedPhotos , description, perks, extraInfo , checkIn , checkOut, maxGuests} = req.body;
    jwt.verify(token , jwtSecret, {} , async(err , userData) => {
      const placeDoc=  place.create({
            owner: userData.id,
            title, address , addedPhotos , description, perks, extraInfo , checkIn , checkOut, maxGuests,
        })
    })
    res.json(placeDoc);
})


app.listen(4000, ()=> {
    console.log("server started");
});