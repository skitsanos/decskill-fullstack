import ContentArea from '@/components/ContentArea';
import {Card} from 'antd';
import {Link, useLocation, useParams} from 'umi';
import {useRequest} from 'ahooks';
import {apiGet, endpoints} from '@/api';

const Page = () =>
{
    const params = useParams();
    const {id} = params;

    const location = useLocation();
    const {record} = location.state as Record<string, any>;
    //TODO: rate limit issue, read from local cache
    const {data} = useRequest(() => apiGet(`${endpoints.asteroids}/${id}`));

    console.log('data', data);

    return (
        <ContentArea title={'Asteroid'}
                     subTitle={'Asteroids management zone'}
                     breadcrumb={{
                         items: [
                             {
                                 title: <Link to={'/'}>Dashboard</Link>
                             },
                             {
                                 title: <Link to={'/asteroids'}>Versions</Link>
                             },
                             {
                                 title: id
                             }
                         ]
                     }}>
            {(record) && <Card>
                <div>
                    Name: <strong>{record.name}</strong>
                </div>
                <div>
                    Designation: <strong>{record.designation}</strong>
                </div>
                <div>
                    Nasa JPL URL: <a target="_blank"
                                     href={record.nasa_jpl_url}> Check</a>
                </div>
            </Card>}
        </ContentArea>
    );
};

export default Page;
