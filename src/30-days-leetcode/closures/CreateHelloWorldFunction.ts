function createHelloWorld() {
    
    return function(...args : unknown[]): string {
        return "Hello World"
    };
};

const sayHello = createHelloWorld() 
sayHello() // Hello World