let router = require('express').Router();

const pessoasController = require('../controllers/pessoas-controller');

router.post('/pessoa', pessoasController.adicionarPessoa);

router.get('/pessoas', pessoasController.listarPessoas);

router.get('/:cpf_pessoa', pessoasController.listarPessoaPorCPF);

router.put('/:cpf_pessoa', pessoasController.atualizarPessoa);

router.delete('/:cpf_pessoa', pessoasController.removerPessoa);

module.exports = router;