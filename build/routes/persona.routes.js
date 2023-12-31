"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const persona_controller_1 = require("../controllers/persona.controller");
const router = (0, express_1.Router)();
router.route('/')
    .get(persona_controller_1.getPersonas)
    .post(persona_controller_1.createPersona);
router.route('/:id_persona')
    .delete(persona_controller_1.deletePersona)
    .put(persona_controller_1.updatePersona)
    .get(persona_controller_1.getPersonaDetails);
exports.default = router;
