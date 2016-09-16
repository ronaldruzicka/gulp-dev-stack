import FontFaceObserver from 'font-face-observer';

export default function fontObserver(fonts) {
    const font = fonts;
    // Optimization for Repeat Views
    if (sessionStorage.foutFontsLoaded) {
        document.documentElement.classList.add('fonts-loaded');
        return;
    }

    const heading = new FontFaceObserver(font.heading, {});
    const text = new FontFaceObserver(font.text, {});

    Promise.all([heading.check(), text.check()]).then(function() {
        document.documentElement.classList.add('fonts-loaded');
        // Optimization for Repeat Views
        sessionStorage.foutFontsLoaded = true;
        console.log('Font is available');
    }, function() {
        console.log('Font is not available');
    });
}
