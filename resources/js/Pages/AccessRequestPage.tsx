import React from "react";
import AccessForm from "@/Components/AccessForm/AccessForm";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";

export default function AccessRequestPage({ auth, generator }: PageProps) {
    const convertedGEn = JSON.stringify(generator)
    const lastConvert = JSON.parse(convertedGEn)
    return (
        <Authenticated
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Access Request
                </h2>
            }
            user={auth.user}
            role={auth.role}
        >
        <div className="flex justify-center mt-6 max-w-full border border-2">
            {
                <AccessForm generator={lastConvert} /> // Wrap the generator prop in an array
            }
        </div>
        </Authenticated>
    );
}
