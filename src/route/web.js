import express from "express";
import homeController from '../controller/homeController';

let router = express.Router();

const initWebroute = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/about', homeController.getAboutPage)
    router.get('/dashboard', homeController.getDashboardPage)
    router.get('/detail/user/:userID', homeController.getUserPage)
    router.post('/login', homeController.loginProcessing)
    router.post('/sign-up', homeController.signUpProcessing)
    router.get('/log-out', homeController.logOutProcessing)
    router.get('/edit/:userID', homeController.editUserProcessing)
    router.get('/delete/:userID', homeController.deleteUserProcessing)
    router.post('/edit/:userID', homeController.editUser)
    router.get('/upload-file', homeController.uploadFilePage)
    router.post('/upload-file', homeController.uploadFileProcessing)
    router.post('/upload-mutiple-file', homeController.uploadMutipleFile)
    return(app.use('/', router))
}

export default initWebroute;
