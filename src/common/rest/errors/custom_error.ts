export class CustomError extends Error {
    name:any
    message:any
    constructor(name: string, message: string) {
        super(name);
        Object.setPrototypeOf(this, CustomError.prototype);
        this.name = name;
        this.message = message;
    }

    echo() {
        return {name: this.name, message: this.message};
    }
}
