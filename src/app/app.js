import 'svgxuse';
import HelloWorld from './components/hello-world';

const app = {};

app.start = () => app.helloworld = HelloWorld('Hello world');

window.app = app;
