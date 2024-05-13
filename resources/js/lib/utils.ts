import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


interface Damage {
    rotor: string;
    stator: string;
    exciter: string;
}

interface forRewind {
    step_1: string;
    step_2: string;
    step_3: string;
    step_4: string;
}

interface mainFormula {
    damage: number;
    rating: number;
    materials: number;
    manpower: number;
}

export const isForRewind = ({ step_1, step_2, step_3, step_4}: forRewind) => {
    const threeSteps = step_1 === 'true' && step_2 === 'true' && step_3 === 'true'; // determines if first 3 steps passed or failed
    const fourthStep = step_4 === 'true'; // determines if step 3 passed or failed

    return (threeSteps && fourthStep) ? 'recon' : (fourthStep ? 'recon' : 'rewind'); //if all the 4 steps passed, return recond else check if 4th step returns true, return recon; if false, return rewind.
};

export const damage = ({damage } : {damage: Damage}) => {
    //false means not damaged and failed
    //true = passed / damaged
    const exciterOnly = damage.exciter === 'true' && damage.rotor === 'false' && damage.stator === 'false';

    const statorOnly = damage.rotor === 'false' && damage.stator === 'true' && damage.exciter === 'false';

    const rotorOnly = damage.rotor === 'true' && damage.stator === 'false' && damage.exciter === 'false';

    const statorExciter = damage.rotor === 'false' && damage.stator === 'true' && damage.exciter === 'true';

    const rotorStator = damage.rotor === 'true' && damage.stator === 'true' && damage.exciter === 'false';

    const rotorStatorExciter = damage.rotor === 'true' && damage.stator === 'true' && damage.exciter === 'true';

    const rotorExciter = damage.rotor === 'true' && damage.stator === 'false' && damage.exciter === 'true';

    switch (true) {
        case exciterOnly:
            return -7.909;
        case rotorExciter:
            return -1.618;
        case rotorOnly:
            return -2.21;
        case statorExciter:
            return -1.986;
        case rotorStator:
            return +0.522;
        case statorOnly:
            return -3.53;
        case rotorStatorExciter:
            return 0
        default:
            return 0;
    }
};

export const mainFormula = (damage: number, rating: number, materials: number, manpower: number): number => {
    const damageValue: number = parseFloat(damage.toString());
    //this is the main formula from the mathematical model
    if (damageValue === 0) {
        //if the damagevalue is 0, return 1 which considered one day
        //eslint-disable-next-line
        var result = 13.931 + 1.53 * rating - 1.508 * manpower - 7.175 * materials;
        result < 0 ? result = 0 : result;
        const rounded = Math.round(result);
        //always round up to the nearest whole number
        return (result < rounded) ? rounded : rounded + 1;
    } else {
        //eslint-disable-next-line
        var result = 13.931 + damageValue * 1 + 1.53 * rating - 1.508 * manpower - 7.175 * materials;
        result < 0 ? result = 0 : result;
        const rounded = Math.round(result);
        return (result < rounded) ? rounded : rounded + 1;
    }
};

//this is the function to generate job_order
export const jobOrderGenerator = () => {
    const jo = 'JE' + new Date().toISOString().slice(0, 19).replace(/[-T:/]/g, '');
    return jo;
};
