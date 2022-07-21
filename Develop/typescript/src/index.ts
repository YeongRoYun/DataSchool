class A{
    value: number = 1;
    method: () => void = () => {console.log(`${this.value}`)};
};

const a = new A();
a.method();