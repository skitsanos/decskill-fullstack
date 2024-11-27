import ContentArea from '@/components/ContentArea';
import {gridGutter} from '@/defaults';
import ProCard from '@ant-design/pro-card';
import {Divider, Statistic} from 'antd';

const Page = () =>
{
    return <ContentArea title={'Welcome'}
                        subTitle={'You are logged as Demo user'}>
        <ProCard direction={'row'}
                 ghost={true}
                 gutter={gridGutter}
                 title={'Stats'}
                 subTitle={'Your current situation'}>

            <ProCard>
                <Statistic title={'Satellites'}
                           value={256}/>
            </ProCard>

            <ProCard>
                <Statistic title={'Asteroids'}
                           value={128}
                           suffix={'B'}/>
            </ProCard>
            <ProCard>
                <Statistic title={'In Collision'}
                           value={16}/>
            </ProCard>
        </ProCard>

        <Divider/>

        <ProCard bordered={true} title={'Asteroid news'}>
            Placeholder for some content, like news and etc
        </ProCard>
    </ContentArea>;
};

export default Page;
