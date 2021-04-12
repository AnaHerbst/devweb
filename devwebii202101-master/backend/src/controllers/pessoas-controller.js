const pessoasModel = require('../models/pessoas-model');

exports.adicionarPessoa = (req, res) => {
    pessoasModel.find((err, pessoas) => {
        if(err){
            console.log("Não foi possível recuperar as pessoas!");
            res.json({
                status: "erro",
                message: "Não foi possível recuperar as pessoas e portanto inserir a nova pessoa!"
            });
        }
        //Eu tenho a lista das pessoas

        for(let i = 0; i < pessoas.length; i++){
            if(req.body.cpf_pessoa === alunos[i].cpf_pessoa){
                res.json({
                    status: "erro",
                    message: `A pessoa ${req.body.nome_pessoa} já está cadastrado com o cpf ${req.body.cpf_pessoa}`
                });
                return;
            }
        }

        let pessoa = new pessoasModel();
        pessoa.nome_pessoa = req.body.nome_pessoa;
        pessoa.cpf_pessoa = req.body.cpf_pessoa;
        pessoa.codigo_unidade = req.body.codigo_unidade;
        pessoa.data_nascimento_pessoa = req.body.data_nascimento_pessoa;
        pessoa.telefone_pessoa = req.body.telefone_pessoa;
        pessoa.grupo_prioritario = req.body.grupo_prioritario;
        pessoa.endereco_pessoa = req.body.endereco_pessoa;
        pessoa.email_pessoa = req.body.email_pessoa;
        pessoa.save((erro) => {
            if(erro){
                res.send({
                    status: "erro",
                    message: "Não foi possível inserir a pessoa."
                });
            }else{
                res.send({
                    status: "ok",
                    message: `Pessoa ${req.body.nome_pessoa} inserido com sucesso!`
                });
            }
        })
    });
}

exports.listarPessoas = (req, res) => {
    pessoasModel.find(function(err, pessoas){
        if(err){
            console.log("Não foi possível recuperar as pessoas!");
            res.json({
                status: "erro",
                message: "Não foi possível recuperar as pessoas!"
            });
        }else{
            res.json({
                status: "ok",
                pessoas: pessoas
            })
        }
        
    });
}

exports.listarPessoaPorCPF = (req, res) => {
    let id_aluno = req.params.id;
    
    pessoasModel.findById(cpf_pessoa, function(err, pessoa){
        if(err || !pessoa){
            console.log(`Não foi possivel recuperar a pessoa de cpf: ${cpf_pessoa}`);
            res.json({
                status: "erro",
                message: `Não foi possivel recuperar a pessoa de cpf: ${cpf_pessoa}`
            });
        }else{
            res.json({
                status: "ok",
                pessoa: pessoa
            })
        }
        
    });
}

exports.atualizarPessoa = (req, res) => {
    let cpf_pessoa = req.params.id;

    pessoasModel.findById(cpf_pessoa, (erro, pessoa) => {
        if(erro || !pessoa){
            console.log("Não foi possível recuperar as pessoas!");
            res.json({
                status: "erro",
                message: `Não foi possível recuperar a pessoa de cpf ${cpf_pessoa} para atualização`
            });
        }else{
        pessoa.nome_pessoa = req.body.nome_pessoa;
        pessoa.cpf_pessoa = req.body.cpf_pessoa;
        pessoa.unidade_id = req.body.unidade_id;
        pessoa.data_nascimento_pessoa = req.body.data_nascimento_pessoa;
        pessoa.telefone_pessoa = req.body.telefone_pessoa;
        pessoa.grupo_prioritario_pessoa = req.body.grupo_prioritario_pessoa;
        pessoa.endereco_pessoa = req.body.endereco_pessoa;
        pessoa.email_pessoa = req.body.email_pessoa;
            pessoa.save((err => {
                if(err){
                    res.json({
                        status: "erro",
                        message: "Houve um erro ao atualizar a pessoa"
                    });
                }else{
                    res.json({
                        status: "ok",
                        message: `Pessoa ${pessoa.nome_pessoa} atualizado com sucesso!`,
                        novoPessoa: pessoa
                    })
                }
            }))
        }
    });
}

exports.removerPessoa = (req, res) => {
    let cpf_pessoa = req.params.cpf_pessoa;

    pessoasModel.remove({
        _cpf_pessoa: cpf_pessoa
    }, (err) => {
        if(err){
            res.json({
                status: "erro",
                message: "Houve um erro ao deletar a pessoa"
            });
        }else{
            res.json({
                status: "ok",
                message: `Pessoa deletada com sucesso!`
            })
        }
    });
}