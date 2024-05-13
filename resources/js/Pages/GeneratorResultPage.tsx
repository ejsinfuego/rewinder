import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import GeneratorResult from "@/Components/GeneratorResult/GeneratorResult";

export default function GeneratorResultPage({ auth,
    generator, rewinding, diagnosis }: PageProps) {
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
