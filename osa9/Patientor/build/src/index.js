"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.status(200).send('pong');
});
const diagnoses_1 = __importDefault(require("./routes/diagnoses"));
app.use('/api/diagnoses', diagnoses_1.default);
const patients_1 = __importDefault(require("./routes/patients"));
app.use('/api/patients', patients_1.default);
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
