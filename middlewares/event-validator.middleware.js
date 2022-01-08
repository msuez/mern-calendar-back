const { response } = require('express');

const Event = require('../models/event.model');

const validateEventNotExist = async (req, res = response, next) => {
    try {
        
        const eventId = req.params.id;

        const event = await Event.findById(eventId);

        if( !event ) {
            return res.status().json({
                ok: false,
                msg: 'Event not exist with this id.'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = {
    validateEventNotExist
}
