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
    usePage: () => { props: { generator: Generator, auth: {
        user: User;
        role: string;
    } } };
    generator: Generator;
    rewinding: {
        id: number,
        step: string,
        status: string,
        created_at: string,
        user: { id: number, name: string, email: string, result: string, created_at: string },
        comments: { id: number, comment: string, rewinding_id: number, user_id: number, created_at: string, user: {
            id: number,
            name: string,
            email: string,
            result: string,
            created_at: string
        } }[],
        procedure_id: number,
        description: string,
        image: string,
    }[];
    generators: {
            current_page: string,
            next_page: string,
            last_page: string,
            links: {
                url: string,
                label: number,
                active: boolean
            }[],
            data: {
                id: number,
                serial_number: string,
                job_order: string,
                rating: number,
                result: string,
                status: string,
                created_at: string,
                user: { id: number, name: string, email: string, result: string, created_at: string }[],
                generator_users: { generator_id: number, user_id: number, id: number, status: string, created_at: string }[],
                diagnosis: { result: string, created_at: string, kVa: number,  step_1: string,
                    step_2: string,
                    step_3: string,
                    step_4: string,
                    rotor: string,
                    stator: string,
                    exciter: string,
                    prediction: number,
                    materials: string,
                    manpower: number,
                 }[],
            }[]
    }// Update the type to be an array of Generator interfaces
    diagnosis: {
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
    }[];
    message: {usePage(): {props: {flash: string}}};
};

export interface GeneratorResultPage {


}

export interface Rewinding {
    rewinding: {
        id: number,
        step: string,
        status: string,
        created_at: string,
        user: { id: number, name: string, email: string, result: string, created_at: string },
        comments: { id: number, comment: string, rewinding_id: number, user_id: number, created_at: string, user: {
            id: number,
            name: string,
            email: string,
            result: string,
            created_at: string
        } }[],
        procedure_id: number,
        description: string,
        image: string,
    }[];
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
    manpower: number;
    materials: string;
}

export interface Diagnoses {
    data: Diagnosis[];
}
