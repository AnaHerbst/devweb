const agendamentosModel = require('../models/agendamentos-model');

exports.adicionarAgendamento = (req, res) => {
    agendamentosModel.find((err, agendamentos) => {
        if(err){
            console.log("Não foi possível recuperar os agendamentos!");
            res.json({
                status: "erro",
                message: "Não foi possível recuperar os agendamentos e portanto inserir o novo agendamento"
            });
        }
        //Eu tenho a lista dos agendamentos

        for(let i = 0; i < agendamentos.length; i++){
            if(req.body.data_agendamento === agendamentos[i].data_agendamento){
                res.json({
                    status: "erro",
                    message: `O agendamento ${req.body.data_agendamento} já está cadastrado com a data ${req.body.data_agendamento}`
                });
                return;
            }
        }

        let agendamento = new agendamentosModel();
        agendamento.data_agendamento = new Date();
        agendamento.necessidades_especiais = req.body.necessidades_especiais;
        agendamento.obs_agendamento = req.body.obs_agendamento;
        agendamento.cpf_pessoa = req.body.cpf_pessoa;
        agendamento.codigo_unidade = req.body.codigo_unidade;
        agendamento.save((erro) => {
            if(erro){
                res.send({
                    status: "erro",
                    message: "Não foi possível inserir o agendamento."
                });
            }else{
                res.send({
                    status: "ok",
                    message: `Agendamento ${req.body.obs_agendamento} inserido com sucesso!`
                });
            }
        })
    });
}

exports.listarAgendamentos = (req, res) => {
    agendamentosModel.find(function(err, alunos){
        if(err){
            console.log("Não foi possível recuperar os agendamentos!");
            res.json({
                status: "erro",
                message: "Não foi possível recuperar os agendamentos!"
            });
        }else{
            res.json({
                status: "ok",
                agendamentos: agendamentos
            })
        }
        
    });
}

exports.listarAgendamentoPorID = (req, res) => {
    let agendamento_id = req.params.agendamento_id;
    
    agendamentosModel.findById(agendamento_id, function(err, Agendamento){
        if(err || !agendamento){
            console.log(`Não foi possivel recuperar o agendamento de id: ${agendamento_id}`);
            res.json({
                status: "erro",
                message: `Não foi possivel recuperar o agendamento de id: ${agendamento_id}`
            });
        }else{
            res.json({
                status: "ok",
                agendamento: agendamento
            })
        }
        
    });
}

exports.atualizarAgendamento = (req, res) => {
    let agendamento_id = req.params.agendamento_id;

    agendamentosModel.findById(agendamento_id, (erro, agendamento) => {
        if(erro || !agendamento){
            console.log("Não foi possível recuperar os agendamentos!");
            res.json({
                status: "erro",
                message: `Não foi possível recuperar o agendamento de id ${agendamento_id} para atualização`
            });
        }else{
            agendamento.data_agendamento = req.body.data_agendamento;
            agendamento.necessidades_especiais = req.body.necessidades_especiais;
            agendamento.obs_agendamento = req.body.obs_agendamento;
            agendamento.pessoa_id = req.body.pessoa_id;
            agendamento.agendamento_id = req.body.agendamento_id;
            aluno.save((err => {
                if(err){
                    res.json({
                        status: "erro",
                        message: "Houve um erro ao atualizar o agendamento"
                    });
                }else{
                    res.json({
                        status: "ok",
                        message: `Agendamento ${agendamento_id} atualizado com sucesso!`,
                        novoAgendamento: agendamento
                    })
                }
            }))
        }
    });
}

exports.removerAgendamento = (req, res) => {
    let agendamento_id = req.params.agendamento_id;

    agendamentoModel.remove({
        _id: agendamento_id
    }, (err) => {
        if(err){
            res.json({
                status: "erro",
                message: "Houve um erro ao deletar o agendamento"
            });
        }else{
            res.json({
                status: "ok",
                message: `Agendamento deletado com sucesso!`
            })
        }
    });
}