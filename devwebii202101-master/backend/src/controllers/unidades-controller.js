const unidadesModel = require('../models/unidades-model');

exports.adicionarUnidade = (req, res) => {
    unidadesModel.find((err, unidades) => {
        if(err){
            console.log("Não foi possível recuperar a unidade!");
            res.json({
                status: "erro",
                message: "Não foi possível recuperar as unidades e portanto inserir a nova unidade!"
            });
        }
        //Eu tenho a lista das unidades

        for(let i = 0; i < unidades.length; i++){
            if(req.body.nome_unidade === unidades[i].nome_unidade){
                res.json({
                    status: "erro",
                    message: `A unidade ${req.body.nome_unidade} já está cadastrado com o nome ${req.body.nome_unidade}`
                });
                return;
            }
        }

        let unidade = new unidadesModel();
        unidade.codigo_unidade=req.body.codigo_unidade;
        unidade.nome_unidade = req.body.nome_unidade;
        unidade.descricao_unidade = req.body.descricao_unidade;
        unidade.endereco_unidade = req.body.endereco_unidade;
        unidade.telefone_unidade = req.body.telefone_unidade;
        unidade.email_unidade = req.body.email_unidade;
        unidade.latlong_unidade = req.body.latlong_unidade;
        unidade.save((erro) => {
            if(erro){
                res.send({
                    status: "erro",
                    message: "Não foi possível inserir a unidade."
                });
            }else{
                res.send({
                    status: "ok",
                    message: `Unidade ${req.body.nome_unidade} inserida com sucesso!`
                });
            }
        })
    });
}

exports.listarUnidades = (req, res) => {
    unidadesModel.find(function(err, unidades){
        if(err){
            console.log("Não foi possível recuperar as unidades!");
            res.json({
                status: "erro",
                message: "Não foi possível recuperar as unidades!"
            });
        }else{
            res.json({
                status: "ok",
                unidades: unidades
            })
        }
        
    });
}

exports.listarUnidadePorNome = (req, res) => {
    let nome_unidade = req.params.nome_unidade;
    
   unidadesModel.findById(nome_unidade, function(err, unidade){
        if(err || !unidade){
            console.log(`Não foi possivel recuperar a unidade de nome: ${nome_unidade}`);
            res.json({
                status: "erro",
                message: `Não foi possivel recuperar a unidade de nome: ${nome_unidade}`
            });
        }else{
            res.json({
                status: "ok",
                unidade: unidade
            })
        }
        
    });
}

exports.atualizarUnidade = (req, res) => {
    let id_unidade = req.params.nome_unidade;

    unidadesModel.findById(nome_unidade, (erro, unidade) => {
        if(erro || !unidade){
            console.log("Não foi possível recuperar as unidades!");
            res.json({
                status: "erro",
                message: `Não foi possível recuperar a unidade de nome ${nome_unidade} para atualização`
            });
        }else{
        unidade.nome_unidade = req.body.nome_unidade;
        unidade.descricao_unidade = req.body.descricao_unidade;
        unidade.endereco_unidade = req.body.endereco_unidade;
        unidade.telefone_unidade = req.body.telefone_unidade;
        unidade.email_unidade = req.body.email_unidade;
        unidade.latlong_unidade = req.body.latlong_unidade;
            unidade.save((err => {
                if(err){
                    res.json({
                        status: "erro",
                        message: "Houve um erro ao atualizar a unidade"
                    });
                }else{
                    res.json({
                        status: "ok",
                        message: `Unidade ${nome_unidade} atualizada com sucesso!`,
                        novoUnidade: unidade
                    })
                }
            }))
        }
    });
}

exports.removerUnidade = (req, res) => {
    let nome_unidade = req.params.nome_unidade;

    unidadesModel.remove({
        _nome_unidade: nome_unidade
    }, (err) => {
        if(err){
            res.json({
                status: "erro",
                message: "Houve um erro ao deletar a unidade"
            });
        }else{
            res.json({
                status: "ok",
                message: `Unidade deletada com sucesso!`
            })
        }
    });
}