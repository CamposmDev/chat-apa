import db from "../../database/index.js"
import bcrypt from "bcrypt"


export default class UserController {
    async loginUser(req, res) {
        if (!req || !req.body) {
            return res.status(400).json({ message: 'Bad Request!' });
        }
        if (!req.body.credential) {
            return res.status(400).json({ message: "User missing required field 'email'" });
        }
        if (!req.body.password) {
            return res.status(400).json({ message: "User missing required field 'password'" });
        }
        const cred = req.body.credential;
        /* try to get user by email */
        let user = await db.users.getUserByEmail(cred);
        if (!user) {
            /*  try to get user by username */
            user = await db.users.getUserByUsername(cred);
        }
        if (!user) {
            return res.status(400).json({ message: `No user registered with email/username ${cred}` })
        }
        const password = req.body.password;
        /* verify password */
        let match = await bcrypt.compare(password, user.password);
        return res.status(400).json({ message: 'WIP' })
    }

    async createUser(req, res) {
        /* verify that all required fields are here */
        if (!req || !req.body) {
            return res.status(400).json({ message: 'Bad Request!' });
        }
        if (!req.body.firstName) {
            return res.status(400).json({ message: "User missing required field 'first name'" });
        }
        if (!req.body.lastName) {
            return res.status(400).json({ message: "User missing required field 'last name'" });
        }
        if (!req.body.email) {
            return res.status(400).json({ message: "User missing required field 'email'" });
        }
        if (!req.body.username) {
            return res.status(400).json({ message: "User missing required field 'username'" });
        }
        if (!req.body.password) {
            return res.status(400).json({ message: "User missing required field 'password'" });
        }
        /* verify that email is not already in use */
        if (await db.users.getUserByEmail(req.body.email)) {
            return res.status(400).json({ message: `User with email ${req.body.email} already exists` });
        }
        /* verify that usernaem is not already in use */
        if (await db.users.getUserByUsername(req.body.username)) {
            return res.status(400).json({ message: `User with username ${req.body.username} already exists` });
        }
        /* verify password must be at least 12 characters */
        if (req.body.password.length < 12) {
            return res.status(400).json({ message: "Password must be at least 12 characters" })
        }
        const ROUNDS = 10;
        const salt = await bcrypt.genSalt(ROUNDS);
        const passwordHash = await bcrypt.hash(req.body.password, salt);
        let user = await db.users.createUser({
            name: `${req.body.firstName} ${req.body.lastName}`,
            email: req.body.email,
            username: req.body.username,
            password: passwordHash
        })
        /* if mongodb, failed to create a user, return 500 */
        if (!user) {
            return res.status(500).json({ message: "Internal Server Error" })
        }
        return res.status(201).json({ message: "User created successfully!", user: user })
    }
}