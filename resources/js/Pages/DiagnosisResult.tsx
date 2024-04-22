import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import DiagnosisResult from "@/Components/DiagnosisResult/DiagnosisResult";
export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            // eslint-disable-next-line react/react-in-jsx-scope
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="flex justify-center mt-6 max-w-full border border-2">
                <DiagnosisResult />
            </div>
        </AuthenticatedLayout>
    );
}
