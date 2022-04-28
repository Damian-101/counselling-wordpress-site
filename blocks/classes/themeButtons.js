class themeButtons {
    constructor(className, buttonName) {
        this.className = className
        this.buttonName = buttonName
    }

    getClassName = () => {
        return this.className
    }
    getButtonName = () => {
        return this.buttonName
    }
}

export default themeButtons