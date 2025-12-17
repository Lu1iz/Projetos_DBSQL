import express from "express";
import cors from "cors";

import productRoute from "./route/products.js";

const port = 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/', productRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}!`);
});