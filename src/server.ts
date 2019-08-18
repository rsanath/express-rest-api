import router from './router';
import 'reflect-metadata'; // important to import this at the very begining
import { getConnection } from './db';

// load config properties
require('custom-env').env(process.env.NODE_ENV || 'development');

// handle node instance exceptions
process.on('uncaughtException', e => {
    console.log(e);
    process.exit(1);
});
process.on('unhandledRejection', e => {
    console.log(e);
    process.exit(1);
});

(async () => {
    // create db tables for defined entities
    await getConnection();

    // start the server
    const { PORT = 8000 } = process.env;
    router.listen(PORT, () =>
        console.log(`Server is running at http://localhost:${PORT}...`)
    );
})();
