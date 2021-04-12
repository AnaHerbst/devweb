let router = require('express').Router();

const agendamentosController = require('../controllers/agendamentos-controller');

router.post('/agendamento', agendamentosController.adicionarAgendamento);

router.get('/agendamentos', agendamentosController.listarAgendamentos);

router.get('/:data_agendamento', agendamentosController.listarAgendamentoPorID);

router.put('/:data_agendamento', agendamentosController.atualizarAgendamento);

router.delete('/:data_agendamento', agendamentosController.removerAgendamento);

module.exports = router;