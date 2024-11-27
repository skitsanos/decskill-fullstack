import {DashboardOutlined, ExperimentOutlined, InfoCircleOutlined} from '@ant-design/icons';

const sidebarMenu = {
    route: {
        path: '/',
        routes: [
            {
                path: '/',
                icon: <DashboardOutlined/>,
                name: 'Dashboard'
            },

            {
                path: '/asteroids',
                icon: <ExperimentOutlined/>,
                name: 'Asteroids'
            },
            {
                path: '/version',
                icon: <InfoCircleOutlined/>,
                name: 'Version'
            }
        ]
    }
};
export default sidebarMenu;
