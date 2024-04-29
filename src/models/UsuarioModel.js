import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true,
        select: false
    },
    ativo: {
        type: Boolean,
        default: true
    },

},
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
        versionKey: "_version"
    }
);

usuarioSchema.plugin(mongoosePaginate);

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;