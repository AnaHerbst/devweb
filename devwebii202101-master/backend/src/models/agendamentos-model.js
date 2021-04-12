const mongoose = require('mongoose');

const agendamentoSchema = mongoose.Schema({
    data_agendamento: {
        type: mongoose.Schema.Types.Date,
        default: Date.now
    },
    necessidades_especiais: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    obs_agendamento: {
        type: mongoose.Schema.Types.String,
        required: false
    },
    cpf_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    codigo_unidade: {
        type: mongoose.Schema.Types.Number,
        required: true
    }
});

let Agendamento = module.exports = mongoose.model('agendamento', agendamentoSchema);

module.exports.get = function(callback, limit){
    Agendamento.find(callback).limit(limit);
}