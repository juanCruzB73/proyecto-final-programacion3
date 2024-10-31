export const useValidations = () => {
    const containLetters = (input:string):boolean=>{
        return /[a-zA-Z]/.test(input) 
    }
    const isEmpty=(input:string):boolean=>{	
        return input.length === 0;
    }
    const isTime = (input: string): boolean => {
        // Matches HH:MM or HH:MM:SS format
        const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;
        return timePattern.test(input);
    };
    return{containLetters,isEmpty,isTime}
}