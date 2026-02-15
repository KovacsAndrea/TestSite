export class Validators {

    static required(value: string): string {
        if (value.trim().length === 0) {
            return "Acest câmp este obligatoriu!";
        }
        return "";
    }

    static minLength(value: string, length: number): string  {
        if (value.trim().length < length) {
            return `Minim ${length} caractere necesare.`;
        }
        return "";
    }

    static email(value: string): string  {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(value)) {
            return "Format email invalid.";
        }
        return "";
    }

    static strong(value: string): string  {

        if (value.length < 8) {
            return "Parola trebuie să aibă minim 8 caractere.";
        }

        if (!/[A-Z]/.test(value)) {
            return "Parola trebuie să conțină cel puțin o literă mare.";
        }

        if (!/[a-z]/.test(value)) {
            return "Parola trebuie să conțină cel puțin o literă mică.";
        }

        if (!/[0-9]/.test(value)) {
            return "Parola trebuie să conțină cel puțin o cifră.";
        }

        if (!/[!@#$%^&*(),.?\":{}|<>_\-\\\/]/.test(value)) {
            return "Parola trebuie să conțină cel puțin un caracter special.";
        }

        return "";
    }
}
