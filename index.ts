import express, { Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { reservationRouter } from './routes/reservation';
import { InitiateMongoServer } from './config/db';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

dotenv.config();

const app: Express = express();
const port: number = Number(process.env.PORT) || 4000;

InitiateMongoServer()
.then(()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(reservationRouter);

    const swaggerFile: any = (process.cwd()+"/swagger.json");
    const swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
    const swaggerDocument: any = JSON.parse(swaggerData);
    app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    
    app.listen(port, (): void =>{
        console.log(`⚡️ Server is running at http://localhost:${port}`);
    });
}).catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
});
