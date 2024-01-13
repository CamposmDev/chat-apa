export default class UserController {
    async loginUser(req, res) {
        if (!req || !req.body) {
            return res.status(400).json({ message: 'Bad Request!' });
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
        // TODO
        /* verify that email is not already in use */
        /* verify that usernaem is not already in use */
    }
}