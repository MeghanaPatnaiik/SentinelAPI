import express from "express";
const app = express();
app.use(express.json());

const logger = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(`${req.method}  ${req.path}`);
    next();
};
app.use(logger);

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        service: "SentinelAPI",
        version: "0.1.0"
    });
});
const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            error: "Unauthorized"
        });
    }
    next();
}
app.post("/projects", authenticate, (req, res) => {
    const { name } = req.body;
    if (!name || typeof name !== "string") {
        return res.status(400).json({
            error: "Input Validation error"
        });
    }
    return res.status(201).json({
        status: "created",
        project: {
            name
        }
    });
});

app.listen(3000, () => {
    console.log("backend is running on port 3000");
});
