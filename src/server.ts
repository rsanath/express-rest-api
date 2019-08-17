import dotenv from 'dotenv';
import router from './router';
import 'reflect-metadata';
import { getConnection } from './db';

// load config properties from .env file
dotenv.config();

// handle node instance exceptions
process.on('uncaughtException', e => {
    console.log(e);
    process.exit(1);
});
process.on('unhandledRejection', e => {
    console.log(e);
    process.exit(1);
});

// wrap inside async function inorder to finish db migrations first
(async () => {
    // create db tables for defined models
    await getConnection();

    // start the server
    const { PORT = 8000 } = process.env;
    router.listen(PORT, () =>
        console.log(`Server is running at http://localhost:${PORT}...`)
    );
})();
