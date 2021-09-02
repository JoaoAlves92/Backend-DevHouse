import House from "../models/House";
import User from "../models/User";

class HouseController{

    async index(req, res) {
        const { status } = req.query;
        const house = await House.find({ status: status })

        if(house){
            return res.json(house);
        } else {
            return res.json({ok: 'não ok'})
        }
    }

    async store(req, res) {
        const { filename } = req.file;
        const { description, price, location, status} = req.body;
        const { user_id} = req.headers;

        const house = await House.create({
            user: user_id,
            imagem: filename,
            description,
            price,
            location,
            status
        })
        return res.json(house)
    }

    async update(req, res) {
        const { filename } = req.file;
        const { house_id } = req.params;
        const { description, price, location, status} = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        const house = await House.findById(house_id);

        if (String(user._id) !== String(house.user)){
            return res.status(401).json({error: 'Não autorizado'})
        }

        const house_update = await House.updateOne({ _id: house_id }, {
            user: user_id,
            imagem: filename,
            description,
            price,
            location,
            status
        })
        return res.json({ok: true})
    }

    async destroy(req, res){
        const { house_id } = req.params;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        const house = await House.findById(house_id);

        if (String(user._id) !== String(house.user)){
            return res.status(401).json({error: 'Não autorizado'})
        }

        const house_to_delete = await House.findByIdAndDelete({ _id: house_id })
        return res.json({message: 'excluido com sucesso'})
    }
}

export default new HouseController();