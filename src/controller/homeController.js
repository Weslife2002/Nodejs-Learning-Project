import session from 'express-session';
import pool from '../configs/connectDB';
// Library for uploading file
const multer  = require('multer');
const path = require('path');

let getHomePage = async (req, res) =>{
    const [rows, fields] = await pool.execute('SELECT * FROM users');

    return res.render('index.ejs', {userData: rows});
}

let getAboutPage = (req,res)=>{
    res.send("I am Duy Tan!");
}

let getUserPage = async (req, res)=>{
    const [rows, fields] = await pool.execute('SELECT * FROM `users` WHERE `ID` = ?', [req.params.userID]);

    return res.render('index.ejs', {userData: rows});
}

let loginProcessing = async (req, res, next) =>{
    const [rows, fields] = await pool.execute('SELECT * FROM `users` WHERE `username` = ? and `password` = ?', [req.body.username, req.body.password]);
    // Session manipulation
    var session = req.session;
    try{
        req.session.loggedIn = true;
        if(rows[0].id){
            session.userID = rows[0].id;
            session.username = rows[0].username;
        }
        console.log(session);
    }
    catch(err){
        console.log(err);
        req.session.loggedIn = false;
        return res.redirect('/');
    }
    return res.redirect('/dashboard');
}

let signUpProcessing = async (req, res, next) =>{
    console.log("Check form >> ", req.body);
    try{
        req.session.loggedIn = true;
        await pool.execute('INSERT INTO users(name, job, address, username, password) VALUES(?, ?, ?, ?, ?)', [req.body.realname, req.body.job, req.body.address, req.body.username, req.body.password]);
        // Session manipulate
        var session = req.session;
        session.username = req.body.username;
        
        var [rows, fields] = await pool.execute('SELECT * FROM `users` WHERE `username` = ?', [req.body.username]);
        console.log(rows);
        session.userID = rows[0].id;
        console.log(session);
        return res.redirect('/dashboard');
    }
    catch(err){
        req.session.loggedIn = false;
        console.log(err.message);
        return res.redirect('/');
    }
}

let logOutProcessing = async(req, res ,next) =>{
    req.session.loggedIn=false;
    return res.redirect('/');
}

let getDashboardPage = (req, res) =>{
    // Access Session
    var session = req.session;
    if(session.userID){
        res.render("dashboard.ejs");
    }
    else{
        res.send("Please sign-up or login first!")
    }
}
let editUserProcessing = (req,res) =>{
    return res.render("editUser.ejs", {userID: req.params.userID});
}

let deleteUserProcessing = async (req,res) =>{
    await pool.execute('DELETE FROM `users` WHERE `ID` = ?', [req.params.userID]);
        return res.redirect('/');
}
let editUser = async (req,res) =>{
    await pool.execute('UPDATE `users` SET name = ?, job = ?, address = ? WHERE `ID` = ? ', [req.body.realname, req.body.job, req.body.address, req.params.userID]);
    return res.redirect('/');
}
let uploadFilePage = async (req,res)=>{
    return res.render('upload-file.ejs');
}

// Storage destination
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'src/public/img/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

let uploadFileProcessing = async(req, res) =>{
    // 'avatar' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage, fileFilter: imageFilter}).single('avatar');
    
    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/img/${req.file.filename}"><hr /><a href="./upload-file">Upload another image</a>`);
    });
}
const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};  
let uploadMutipleFile = async(req,res) => {
     // 'avatar' is the name of our file input field in the HTML form
     let upload = multer({ storage: storage, fileFilter: imageFilter}).array('avatar', 10);
    
     upload(req, res, function(err) {
         // req.file contains information of uploaded file
         // req.body contains information of text fields, if there were any
 
         if (req.fileValidationError) {
             return res.send(req.fileValidationError);
         }
         else if (!req.files) {
             return res.send('Please select an image to upload');
         }
         else if (err instanceof multer.MulterError) {
             return res.send(err);
         }
         else if (err) {
             return res.send(err);
         }
 
        
        let result = "You have uploaded these images: <hr />";
        const files = req.files;
        let index, len;

        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {
            result += `<img src="/img/${files[index].filename}" width="300" style="margin-right: 20px;">`;
        }
        result += '<hr/><a href="./">Upload more images</a>';
        res.send(result);
    });
}
module.exports = {
    getHomePage,
    getAboutPage,
    getUserPage,
    loginProcessing,
    signUpProcessing,
    getDashboardPage,
    logOutProcessing,
    editUserProcessing,
    deleteUserProcessing,
    editUser,
    uploadFilePage,
    uploadFileProcessing,
    uploadMutipleFile
}