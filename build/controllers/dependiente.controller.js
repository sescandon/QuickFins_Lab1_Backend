"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDependiente = exports.deleteDependiente = exports.getDependiente = exports.createDependiente = exports.getDependientes = void 0;
const database_1 = require("../database");
function getDependientes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield (0, database_1.connect)();
        const dependientes = yield conn.query('SELECT * FROM dependiente');
        return res.json(dependientes[0]);
    });
}
exports.getDependientes = getDependientes;
function createDependiente(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPost = req.body;
        const conn = yield (0, database_1.connect)();
        conn.query('INSERT INTO dependiente SET?', [newPost]);
        return res.json({
            message: 'Dependiente CREATED'
        });
    });
}
exports.createDependiente = createDependiente;
function getDependiente(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.idDependiente;
        const conn = yield (0, database_1.connect)();
        const Dependiente = yield conn.query('SELECT * FROM dependiente WHERE persona_id_cedula = ?', [id]);
        return res.json(Dependiente[0]);
    });
}
exports.getDependiente = getDependiente;
function deleteDependiente(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.idDependiente;
        const conn = yield (0, database_1.connect)();
        try {
            yield conn.query('DELETE FROM dependiente WHERE persona_id_cedula = ?', [id]);
            return res.json({
                message: 'Dependiente DELETED'
            });
        }
        catch (error) {
            return res.status(500).json({
                message: 'Error Deleting Dependiente',
                error
            });
        }
    });
}
exports.deleteDependiente = deleteDependiente;
function updateDependiente(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.idDependiente;
        const updateDependiente = req.body;
        const conn = yield (0, database_1.connect)();
        yield conn.query('UPDATE dependiente set ? WHERE persona_id_cedula = ?', [updateDependiente, id]);
        return res.json({
            message: 'Dependiente UPDATED'
        });
    });
}
exports.updateDependiente = updateDependiente;
