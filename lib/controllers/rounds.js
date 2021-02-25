const { Router } = require('express');
const Round = require('../models/Round');

module.exports = Router()
  .post('/', (req, res, next) => {
    Round
      .createRound(req.body)
      .then(round => res.send(round))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Round
      .getRounds()
      .then(rounds => res.send(rounds))
      .catch(next);
  });
