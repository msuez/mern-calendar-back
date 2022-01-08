
const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateFields, validateEventNotExist } = require('../middlewares');

const {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent,
} = require('./../controllers/events.controller');

const {
    isDate
} = require('../helpers/is-date.helper');

const router = Router();

// router.use( validateJWT );

router.get('/', [
    validateJWT
], getEvents);

router.post('/', [
    validateJWT,
    check('title', 'The title is required.').not().isEmpty(),
    check('start', 'The start date is required.').custom( isDate ),
    check('end', 'The end date is required.').custom( isDate ),
    validateFields
], createEvent);

router.put('/:id', [
    validateJWT,
    validateEventNotExist,
    check('title', 'The title is required.').not().isEmpty(),
    check('start', 'The start date is required.').custom( isDate ),
    check('end', 'The end date is required.').custom( isDate ),
    validateFields
], updateEvent);

router.delete('/:id', [
    validateJWT,
    validateEventNotExist,
    validateFields
], deleteEvent);

module.exports = router;