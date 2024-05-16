import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import GeneratorTable from "@/Components/GeneratorsTable/GeneratorsTable";

export default function Dashboard({ auth, generators }: PageProps) {
    return (
        <>
        <AuthenticatedLayout
            user={auth.user}
            role={auth.role}
            // eslint-disable-next-line react/react-in-jsx-scope
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="flex justify-center pt-3">
              <h1 className="font-semibold text-xl text-gray-800 leading-tight">List of Generators</h1>
                </div>
            <div className="flex justify-center mt-6 max-w-full border border-2">
                <GeneratorTable user={auth.user} generators={generators} />
            </div>
        </AuthenticatedLayout>
        </>

    );
}
