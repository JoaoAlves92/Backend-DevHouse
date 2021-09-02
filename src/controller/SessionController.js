import User from "../models/User";

class SessionController{
    async store(req, res){
        const email = req.body.email;
        const nome = req.body.nome;

        let user = await User.findOne({ email })

        if(!user) {
            user = await User.create({ email: email, nome: nome })
        }

        return res.json(user)
    }
}

export default new SessionController();