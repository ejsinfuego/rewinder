export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
        role: string;
    };
    generator: GeneratorResultPage;
    generators: any;
    message: string;
};

export interface GeneratorResultPage {
    generator: {
        name: string;
    };
}


export interface Generator {
    id: number;
    serial_number: string;
    job_order: string;
    rating: number;
    result: string;
    status: string;
    created_at: string;
    diagnosis: Diagnosis[];
}

export interface Diagnosis {
    result: string;
    created_at: string;
    kVa: number;
    step_1: string;
    step_2: string;
    step_3: string;
    step_4: string;
    rotor: string;
    stator: string;
    exciter: string;
    prediction: number;
}
