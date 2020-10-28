import NotFound from '../components/pages/404';
import TOP from '../components/pages/top';
import API1 from '../components/pages/api1';
import API2 from '../components/pages/api2';
import API3 from '../components/pages/api3';
const Routers = [
    { 'id': 0, 'path': '/', 'component': TOP, title: "Home" },
    { 'id': 1, 'path': '/api1', 'component': API1, title: "Google Map", pageList:true },
    { 'id': 2, 'path': '/api2', 'component': API2, title: "YouTube", pageList:true },
    { 'id': 3, 'path': '/api3', 'component': API3, title: "Open Weather Map", pageList:true },
    { 'id': 404, 'path': '/404', 'component': NotFound, title: "404" },
];

export default Routers;
