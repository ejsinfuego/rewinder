import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";




interface AccessFormProps {
    generator: Generator
}


const AccessForm = ({ generator }: AccessFormProps) => {

    const { data, post, setData } = useForm({
        generator: generator.map(f => f.id)[0],
    })

    const submit = (e) => {
        e.preventDefault()
        setData('generator', generator.map(f => f.id)[0])

        post(route('requestAccess', data))
    }
    return (
        <div className="justify-center">
            <div className="flex justify-center">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">Oops. Looks like you don't have an access on {generator.map(f => f.serial_number)}. Ask for an access by clicking this button</h2>
            </div>
            <div className="flex w-full justify-center p-5">
                <Button onClick={submit}>Request Access</Button>
            </div>
        </div>
    )
}


export default AccessForm
