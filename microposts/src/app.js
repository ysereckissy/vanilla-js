const greeting = name => console.log(`Hello ${name}`);
greeting('Yannick The best developer');
const h1 = document.getElementsByTagName('h1')[0];
console.log(h1);
h1.innerText = 'Yannick Sereckissy-NamboY';

if(module.hot) {
    module.hot.accept();
}