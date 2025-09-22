function createHelloWorld() {
    
    return function(...args : unknown[]): string {
        return "Hello World"
    };
};

const sayHello = createHelloWorld()
console.log(sayHello("Ali"))