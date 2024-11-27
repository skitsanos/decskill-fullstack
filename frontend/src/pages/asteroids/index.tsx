import ContentArea from '@/components/ContentArea';
import {App, Button, Card, DatePicker, Space, Table} from 'antd';
import {useRequest, useSetState} from 'ahooks';
import {apiGet, endpoints} from '@/api';
import {history, Link} from 'umi';
import {useEffect} from 'react';
import dayjs from 'dayjs';

const dateFormat = 'YYYY-MM-DD';

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (_, row) => <span>{row.name}</span>
    },
    {
        dataIndex: 'is_potentially_hazardous_asteroid',
        title: 'Hazardous',
        key: 'is_potentially_hazardous_asteroid',
        render: (_, row) => <span>{row.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</span>
    },
    {
        dataIndex: 'is_sentry_object',
        title: 'Sentry',
        key: 'is_sentry_object',
        render: (_, row) => <span>{row.is_sentry_object ? 'Yes' : 'No'}</span>
    }

];

const onExpandRowRender = record => (
    <div key={record.id}>
        <p>Neo Reference Id: {record.neo_reference_id}</p>
        <a target="_blank"
           href={record.nasa_jpl_url}>Nasa JPL URL</a>
        <p>Absolute Magnitude: {record.absolute_magnitude_h}</p>
        <p>Is Potentially hazardous
            asteroid: {record.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
        <p>Is Sentry Object: {record.is_sentry_object ? 'Yes' : 'No'}</p>
    </div>
);

const Page = () =>
    {
        const {
            notification
        } = App.useApp();

        const [
            selectedDates,
            setSelectedDates
        ] = useSetState({
            startDate: dayjs().subtract(7, 'day').format(dateFormat),
            endDate: dayjs().format(dateFormat)
        });

        const {
            data,
            error,
            loading,
            refresh
        } = useRequest(() => apiGet(`${endpoints.asteroids}?startDate=${selectedDates.startDate}&endDate=${selectedDates.endDate}`));

        useEffect(() =>
        {
            if (error)
            {
                notification.error({
                    message: error.message
                });
            }
        }, [error]);

        return <ContentArea title={'Asteroids'}
                            subTitle={'Asteroids management zone'}
                            breadcrumb={{
                                items: [
                                    {
                                        title: <Link to={'/dashboard'}>Dashboard</Link>
                                    },
                                    {
                                        title: <Link to={'/version'}>Versions</Link>
                                    },
                                    {
                                        title: 'Asteroids'
                                    }
                                ]
                            }}>
            <Card extra={<Space>
                <DatePicker.RangePicker format={dateFormat}
                                        defaultValue={[
                                            dayjs(selectedDates.startDate, dateFormat),
                                            dayjs(selectedDates.endDate, dateFormat)
                                        ]}
                                        onChange={dates =>
                                        {
                                            setSelectedDates({
                                                startDate: dates[0].format(dateFormat),
                                                endDate: dates[1].format(dateFormat)
                                            });
                                        }}/>

                <Button type={'primary'}
                        onClick={refresh}>Refresh</Button>
            </Space>}>
                <Table loading={loading}
                       dataSource={data?.result}
                       columns={columns}
                       rowKey={'id'}
                       onRow={record => ({
                           onClick: () => history.push(`asteroids/${record.id}`, {record})
                       })}
                       expandable={{
                           expandedRowRender: onExpandRowRender,
                           rowExpandable: (record) => record.name !== 'Not Expandable'
                       }}
                />
            </Card>
        </ContentArea>;
    }
;

export default Page;
;
