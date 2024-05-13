import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import GeneratorForm from "@/Components/GenerateForm/GenerateForm";
export default function GeneratorResultPage({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.role}
            // eslint-disable-next-line react/react-in-jsx-scope
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add Generator
                </h2>
            }
        >
            <Head title="Result" />
            <div className="flex justify-center mt-6 max-w-full border border-2">
            <GeneratorForm />
            </div>
            <div className="flex justify-center mt-6">

            </div>
        </AuthenticatedLayout>
    );
}
