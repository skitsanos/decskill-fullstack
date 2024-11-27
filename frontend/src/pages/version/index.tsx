import ContentArea from '@/components/ContentArea';
import {useRequest} from 'ahooks';
import {apiGet, endpoints} from '@/api';
import {Card} from 'antd';


const Page = () =>
{
    const {data} = useRequest(() => apiGet(endpoints.version));

    return <ContentArea title={'Version'}>
        <Card>Current version is: {data && data.version}</Card>
    </ContentArea>;
};

export default Page;
