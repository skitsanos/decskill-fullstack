import {type Context, Hono} from 'hono';
import {createBunWebSocket} from 'hono/bun';
import Logger from '@/utils/logger.ts';
import loadRoutes from '@/utils/loadRoutes.ts';

const logger = new Logger('Core');
const loggerHttp = new Logger('HTTP');

const {
    websocket,
    upgradeWebSocket
} = createBunWebSocket();

const app = new Hono();

app.use('*', async (c: Context, next) =>
{
    c.set('logger-core', logger);
    c.set('logger-http', loggerHttp);

    const start = Bun.nanoseconds();
    await next();
    const end = Bun.nanoseconds();
    c.res.headers.set('X-Response-Time', `${(end - start) / 1000000}`);
    c.res.headers.set('Server', 'bun-service');
});

await loadRoutes({
    app,
    upgradeWebSocket
}, 'routes');

const server = Bun.serve({
    fetch: app.fetch,
    websocket
});

logger.info(`Server started at ${server.url}`);