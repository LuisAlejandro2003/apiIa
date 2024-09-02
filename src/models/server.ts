import express, { Application, NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import userRoutes from '../routes/userRoutes'

class ServerNode {
    private io: any;
    private server: any;
    private app: Application;
    private port: string;
    private address: string;
    private apiPtahs = {
        user: '/api/user',
    }


    constructor() {
        this.app = express();
        this.port = process.env.PORT || '5000';
        this.address = process.env.ADDRESS || '0.0.0.0'
        this.initState();
    }

    initState() {
        this.dbMongoConnection();
        this.middlewares()
        this.server = http.createServer(this.app);
      
       
        this.routes();

    }

    async dbMongoConnection() {
        const uri = `${process.env.DB_CONNECTION_STRING}`;
        try {
            await mongoose.connect(uri);
            console.log("Database connection was successfully");
        } catch (error) {
            throw new Error(`Something wrongs: ${error}`);
        }
    }

    middlewares() {
        // this.app.use(morgan('dev'))

        // BODY RESPONSES;
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.set('json spaces', 2);


     
    }



    middlewaresPath() {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            const error = new Error('Ruta no encontrada');
         
            res.status(404).json({ message: error.message });
        });

        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
          
            next();
        });
    }

  

    routes() {
     
        const showDocs = process.env.NODE_ENV === 'development';
      
        this.app.get('/api', (req, res) => {
            res.json({ "title": "Hello world" })
        })

        this.app.use(this.apiPtahs.user, userRoutes);

        this.middlewaresPath()
    }

    listen() {

        const showtoken = process.env.NODE_ENV === 'development';
        if (showtoken) {
            const payload = { UserName: process.env.USER_TOKEN, Password: process.env.PASSWORD_TOKEN };
            const secretKey = "l%N6v@x6YBe44Lz0l";
            const tiempoExpiracion = '24h';
   
        }
        this.app.set('port', this.port);
        try {
            this.server.listen(this.app.get('port'), this.address, () => {
                console.log(`Server on port: ${this.address}:${this.app.get('port')}`);
            })
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }
}

export default ServerNode;