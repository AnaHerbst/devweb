let router = require('express').Router();

const unidadesController = require('../controllers/unidades-controller');



router.post('/unidade', unidadesController.adicionarUnidade);

router.get('/unidades', unidadesController.listarUnidades);

router.get('/:nome_unidade', unidadesController.listarUnidadePorNome);

router.put('/:nome_unidade', unidadesController.atualizarUnidade);

//router.delete('/:nome_unidade', unidadessController.remo);

module.exports = router;