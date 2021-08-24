"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils");
const patientService_1 = __importDefault(require("./../services/patientService"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    const result = patientService_1.default.getNonSensitiveEntries();
    res.status(200).json(result);
});
router.get('/:id', (req, res) => {
    const result = patientService_1.default.getPatientById(req.params.id);
    if (result) {
        res.status(200).json(Object.assign(Object.assign({}, result), { entries: result.entries ? result.entries : [] }));
    }
    else {
        res.status(404);
    }
});
router.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    try {
        const newPatientEntry = utils_1.toNewPatientEntry({
            name,
            dateOfBirth,
            ssn,
            gender,
            occupation
        });
        const addedPatientEntry = patientService_1.default.addEntry(newPatientEntry);
        res.status(200).json(addedPatientEntry);
    }
    catch (error) {
        const errorContent = error;
        res.status(400).json({ error: errorContent.message });
    }
});
exports.default = router;
