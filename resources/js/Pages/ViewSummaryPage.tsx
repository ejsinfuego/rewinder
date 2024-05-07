import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import ViewSummary from "@/Components/ViewSummary/ViewSummary";
import { ArrowLeft } from "lucide-react";
export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            role={auth.role}
            // eslint-disable-next-line react/react-in-jsx-scope
            header={

                <h2 className="font-semibold flex text-xl text-gray-800 leading-tight">

                    <Link href={`/diagnosisResult/${usePage().props.generator.id}/show`}><ArrowLeft width={18} className="pt-1 mr-2"></ArrowLeft></Link> Rewinding Sumary
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="flex justify-center mt-6 max-w-full border border-2">
                <ViewSummary />
            </div>
        </AuthenticatedLayout>
    );
}
