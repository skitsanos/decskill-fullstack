/**
 * Getting an asteroid by id
 */
import type {Context} from 'hono';
import type Logger from '@/utils/logger.ts';
import response from '@/utils/response.ts';
import type {NASA_API_ERROR, NASA_API_RATE_ERROR} from '@/utils/nasa.ts';

const ASTEROIDS_API_URL = 'https://api.nasa.gov/neo/rest/v1/neo';
const {
    NASA_API_KEY = 'DEMO_KEY'
} = process.env;

export default async ({
                          req,
                          get,
                          json
                      }: Context) =>
{
    const logger = get('logger-http') as Logger;

    const {id} = req.param();

    try
    {
        const apiResponse = await fetch(`${ASTEROIDS_API_URL}/${id}?api_key=${NASA_API_KEY}`);
        const data = await apiResponse.json();

        if ((data as NASA_API_ERROR)?.http_error && data?.code)
        {
            return json(response.error(`Error getting asteroids data. ${data?.error_message}`), 400);
        }

        // sometimes errors come in a different format
        if (data.error && typeof (data as NASA_API_RATE_ERROR)?.error.code === 'string')
        {
            return json(response.error(`Error getting asteroids data. ${data.error.message}`), 400);
        }

        // drop links, because it includes an API key and we don't want to expose it
        const {
            links,
            ...rest
        } = data;

        return json(response.result(rest));
    }
    catch (error)
    {
        logger.error(`Error getting asteroid details for #${id}`, error);

        if (error instanceof Error)
        {
            return json(response.error(`Error getting asteroids data. ${error.message}`), 500);
        }
        else
        {
            return json(response.error('Error getting asteroids data.'), 500);
        }
    }
};