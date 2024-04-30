import React from "react";
import AccessForm from "@/Components/AccessForm/AccessForm";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
interface AccessRequestPageProps {
    generator: Generator;
}

export default function AccessRequestPage({ auth, generator }: PageProps) {
    return (
        <Authenticated
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Access Request
                </h2>
            }
            user={auth.user}
        >
        <div className="flex justify-center mt-6 max-w-full border border-2">
            <AccessForm generator={generator} />
        </div>
        </Authenticated>
    );
}
