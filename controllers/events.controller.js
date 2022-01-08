
const { request, response } = require('express');

const Event = require('../models/event.model');

const createEvent = async ( req = request, res = response, next ) => {
    
    const event = new Event( req.body );

    try {

        event.user = req.uid;

        const eventSaved = await event.save();

        return res.status(201).json({
            ok: true,
            msg: 'Event created.',
            event: eventSaved,
        });

    } catch (error) {
        return res.sendStatus(500);
    }
}

const getEvents = async ( req = request, res = response, next ) => {
    try {

        const events = await Event.find({ available: true }).populate('user', 'name');

        return res.status(201).json({
            ok: true,
            msg: 'Events got.',
            events
        });

    } catch (error) {
        return res.sendStatus(500);
    }
}

const updateEvent = async ( req = request, res = response, next ) => {

    try {

        const event = await Event.findById(req.params.id);
        const uid = req.uid;

        if(event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Dont have permission to update this record.'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(event.id, newEvent, {new:true});

        return res.status(201).json({
            ok: true,
            msg: 'Event update.',
            event: updatedEvent
        });

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

const deleteEvent = async ( req = request, res = response, next ) => {
    try {

        const event = await Event.findById(req.params.id);
        const uid = req.uid;

        if(event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Dont have permission to update this record.'
            });
        }

        await Event.findByIdAndUpdate(event.id, { available: false });

        return res.status(201).json({
            ok: true,
            msg: 'Event deleted.',
        });

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

module.exports = {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent
}