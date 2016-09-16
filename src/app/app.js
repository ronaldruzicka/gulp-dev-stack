import 'svgxuse';
import init from './init';
import factory from './factory';

// import FontObserver from './components/font-observer';
import HelloWorld from './components/hello-world';
import Module from './components/module';
import Alertifier from './components/alertifier';
import FontObserver from './components/font-observer';

window.app = {
    start(config) {
        FontObserver({
            heading: 'Amatic SC',
            text: 'Indie Flower'
        });
        init(HelloWorld, document.querySelector('body'), config.log);
        init(Module, document.querySelector('.container h1'));
        this.alertifiers = factory(Alertifier, document.querySelectorAll('.btn'));
    }
};
