import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import GeneratorResult from "@/Components/GeneratorResult/GeneratorResult";


// interface Rewinding {
//     rewinding: {
//         id: number,
//         step: string,
//         status: string,
//         created_at: string,
//         user: { id: number, name: string, email: string, result: string, created_at: string },
//         comments: { id: number, comment: string, rewinding_id: number, user_id: number, created_at: string, user: {
//             id: number,
//             name: string,
//             email: string,
//             result: string,
//             created_at: string
//         } }[],
//         procedure_id: number,
//         description: string,
//         image: string,
//     }[];
// }
export default function GeneratorResultPage({ auth,
    generator, diagnosis, rewinding }: PageProps,) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.role}
            // eslint-disable-next-line react/react-in-jsx-scope
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Result
                </h2>
            }
        >
            <Head title="Result" />
            <div className="flex justify-center mt-6 max-w-full border border-2">
            <GeneratorResult generator={generator} rewinding={rewinding} diagnosis={diagnosis} />
            </div>
            <div className="flex justify-center mt-6">

            </div>
        </AuthenticatedLayout>
    );
}
