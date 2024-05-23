import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Generator } from "@/types";




interface AccessFormProps {
    generator: {
    id: number;
    serial_number: string;
    job_order: string;
    rating: number;
    result: string;
    status: string;
    created_at: string;
    }[];
}


const AccessForm = ({ generator }: AccessFormProps) => {
    console.log(generator)
    const genId = generator[0].id
    console.log(genId)
    const { data, post, setData } = useForm({
        generator: genId,
    })

    const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setData('generator', genId)

        post(route('requestAccess', data))
    }
    return (
        <div className="justify-center">
            <div className="flex justify-center">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">Oops. Looks like you don&apos;t have an access on {generator[0].serial_number}. Ask for an access by clicking this button</h2>
            </div>
            <div className="flex w-full justify-center p-5">
                <Button onClick={submit}>Request Access</Button>
            </div>
        </div>
    )
}


export default AccessForm
