const IncorrectPasswordMessage = "کلمه عبور باید شامل 1 رقم، 1 حرف، و حداقل 6 کاراکتر باشد";
const StrongPassword = true;

export class PasswordValidator {
    static validatePassword(input:string): string | null {
        if (StrongPassword) {
            return null;
        }
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(input) ? null : IncorrectPasswordMessage;
    }
};
