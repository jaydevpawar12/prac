import { Router } from "express";
import { loginAdmin, logoutAdmin, registerAdmin, userLogin, userLogout } from "../controller/authController.js";


const router = Router()

router
    .post("/user/login", userLogin)
    .post("/user/logout", userLogout)


    .post("/admin/register", registerAdmin)

    .post("/admin/login", loginAdmin)
    .post("/admin/logout", logoutAdmin)

export default router