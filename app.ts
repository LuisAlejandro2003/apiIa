import dotenv from 'dotenv'
import ServerNode from './src/models/server'


dotenv.config()

if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.prod' });
} else {
    dotenv.config({ path: '.env.dev' });
};

const server = new ServerNode();


server.listen();
