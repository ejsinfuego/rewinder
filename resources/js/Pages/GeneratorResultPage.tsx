import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import GeneratorResult from "@/Components/GeneratorResult/GeneratorResult";

export default function GeneratorResultPage({ auth,
    generator={
        generator: {
            name: 'Generator Name'
        }
    },
    diagnosis={
        diagnosis: {
            name: 'Diagnosis Name'
    }
 }}: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            // eslint-disable-next-line react/react-in-jsx-scope
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Result
                </h2>
            }
        >
            <Head title="Result" />
            <div className="flex justify-center mt-6 max-w-full border border-2">
            <GeneratorResult generator={generator} diagnosis={diagnosis} />
            </div>
            <div className="flex justify-center mt-6">

            </div>
        </AuthenticatedLayout>
    );
}
