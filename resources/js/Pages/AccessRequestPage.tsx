import React from "react";
import AccessForm from "@/Components/AccessForm/AccessForm";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";

export default function AccessRequestPage({ auth, generator, message }: PageProps) {
    console.log(message)
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
                message ? (
                    <div className="flex justify-center">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">{message}</h2>
                    </div>
                ):
                <AccessForm generator={generator} />
            }
        </div>
        </Authenticated>
    );
}
