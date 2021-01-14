import NotFound from '../components/pages/404';
import { Home } from '../components/pages/home';
import { Api1 } from '../components/pages/api1';
import { Api2 } from '../components/pages/api2';
import { Api3 } from '../components/pages/api3';
const Routers = [
    { 'id': 0, 'path': '/', 'component': Home, title: "Home" },
    { 'id': 1, 'path': '/api1', 'component': Api1, title: "Google Map", pageList:true },
    { 'id': 2, 'path': '/api2', 'component': Api2, title: "YouTube", pageList:true },
    { 'id': 3, 'path': '/api3', 'component': Api3, title: "Open Weather Map", pageList:true },
    { 'id': 404, 'path': '/404', 'component': NotFound, title: "404" },
];

export default Routers;
