export const validateEmail = (email: string): boolean => {
    if (email.match('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')) {
        return true
    } return false
}

export const validatePassword = (pass: string): boolean => {
    if (pass.match('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')) {
        return true
    } return false
}