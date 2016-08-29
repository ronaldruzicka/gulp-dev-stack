import 'svgxuse';
import HelloWorld from './module/hello-world';

const app = {};

app.start = () => app.helloworld = HelloWorld('Hello world');

window.app = app;
