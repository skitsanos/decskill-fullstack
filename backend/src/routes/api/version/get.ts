import type {Context} from 'hono';

export default ({json}: Context) =>
{
    return json({
        'version': '1.0.0'
    });
}