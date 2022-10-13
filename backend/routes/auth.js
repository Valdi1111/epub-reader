const response = require("../methods/response");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../services/auth");

router.post(
    "/login",
    async (req, res, next) => {
        try {
            const {email, password} = req.body
            const results = await auth.getUser(email);
            if (!results.length) {
                // unauthorized - user does not exists
                return response.unauthorized(res, "email_not_found", "Email or password is incorrect!");
            }
            // check password
            const match = await bcrypt.compareSync(password, results[0].password);
            if (!match) {
                // unauthorized - wrong password
                return response.unauthorized(res, "wrong_password", "Email or password is incorrect!");
            }
            const token = jwt.sign({id: results[0].id}, process.env.SECRET, {expiresIn: "30d"});
            await auth.updateLastLogin(results[0].id);
            return res.json({id: results[0].id, token});
        } catch (err) {
            console.error("Error on POST /auth/login.");
            next(err);
        }
    }
);

router.post(
    "/register",
    async (req, res, next) => {
        try {
            const {email, password} = req.body
            const results = await auth.getUser(email);
            if (results.length) {
                // email is already registered
                return res.status(409).send({
                    error: "already_registered",
                    message: "This email is already in use!"
                });
            }
            const hash = await bcrypt.hashSync(password, 10);
            await auth.addUser(email, hash);
            // created
            return res.status(201).send({success: "The user has been registered with us!"});
        } catch (err) {
            console.error("Error on POST /auth/register.");
            next(err);
        }
    }
);

module.exports = router;
