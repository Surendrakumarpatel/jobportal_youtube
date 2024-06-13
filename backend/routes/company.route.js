import express from "express";
import { getCompany, getCompanyById, registerCompany, updateCompanyInformation } from "../controllers/company.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post( isAuthenticated ,registerCompany);
router.route("/getcompany").get( isAuthenticated ,getCompany);
router.route("/getcompany/:id").get( isAuthenticated ,getCompanyById);
router.route("/update/:id").put( isAuthenticated,singleUpload, updateCompanyInformation);

export default router;