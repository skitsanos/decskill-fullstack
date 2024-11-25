import type {Context} from 'hono';
import type Logger from '@/utils/logger.ts';
import dayjs from 'dayjs';
import response from '@/utils/response.ts';
import type {NASA_API_ERROR, NASA_API_RATE_ERROR, NeoFeed} from '@/utils/nasa.ts';
import {join} from 'path';

const ASTEROIDS_API_URL = 'https://api.nasa.gov/neo/rest/v1/feed';
const {
    NASA_API_KEY = 'DEMO_KEY',
    NODE_ENV = 'development'
} = process.env;
// Example:
// https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY

const simplifyResultset = (data: NeoFeed) =>
{
    return Object?.values((data as NeoFeed).near_earth_objects).flatMap(foundObjects =>
        foundObjects.map(({
                              links,
                              ...rest
                          }: Record<string, any>) => rest));
};

export default async ({
                          json,
                          req,
                          get
                      }: Context) =>
{
    const logger = get('logger-http') as Logger;

    const today = dayjs().format('YYYY-MM-DD');

    const {
        startDate = today,
        endDate = today
    } = req.query();

    logger.debug(`Getting asteroids from ${startDate} to ${endDate}`);

    // searches for asteroids between the given dates can be done only within 7 days of difference
    const diff = Math.abs(dayjs(endDate).diff(dayjs(startDate), 'day'));
    if (diff > 7)
    {
        return json(response.error('The difference between the start and end date should be less than 7 days.'), 400);
    }

    try
    {
        const apiResponse = await fetch(`${ASTEROIDS_API_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`);
        const data = await apiResponse.json();

        if ((data as NASA_API_ERROR)?.http_error && data?.code)
        {
            return json(response.error(`Error getting asteroids data. ${data?.error_message}`), 400);
        }

        // sometimes errors come in a different format
        if (data.error && typeof (data as NASA_API_RATE_ERROR)?.error.code === 'string')
        {
            if (NODE_ENV === 'development')
            {
                const cachedFile = Bun.file(join('data', 'feed.json'));
                if (await cachedFile.exists())
                {
                    return json(response.result(simplifyResultset(await cachedFile.json())));
                }

                return json(response.error('Error getting asteroids data. No cache found'), 500);
            }
            return json(response.error(`Error getting asteroids data. ${data.error.message}`), 400);
        }

        return json(response.result(simplifyResultset(data)));
    }
    catch (error)
    {
        logger.error('Error getting asteroids', error);

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