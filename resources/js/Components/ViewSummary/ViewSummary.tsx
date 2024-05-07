import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../ui/card"
import dayjs from 'dayjs';


export default function ViewSummary() {
    const results = usePage().props.diagnoses;
    const generator = usePage().props.generator;
    console.log(results);
    const splitAndCapitalize = (str: string) => {
        return str.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    return (
        <div className="flex flex-col gap-2 justify-center">
        <div className="px-20 flex justify-center">
        <Card className="w-100 rounded text-gray-600">
            <CardHeader>
            <CardTitle className="text-center">Summary of {generator.serial_number}</CardTitle>
            </CardHeader>
            <CardContent>
            <div className=" justify-center">
            <h2 className="font-semibold text-5xl text-gray-600 text-center leading-tight">{
                generator.diagnosis[0].prediction
            }</h2>
            <h3 className="font-semibold text-lg text-center leading-tight">Estimated Days of Rewinding Duration</h3>
            </div>
            <div className="grid grid-cols-2 p-2 gap-3 m-2">
            <h2 className="flex font-normal text-m leading-tight">Rating: {generator.diagnosis[0].kVa} kVa</h2>
            <h2 className=" flex font-normal text-m leading-tight">Step 1: {generator.diagnosis[0].step1 == "true" ? 'Passed' : 'Failed' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Step 2: {generator.diagnosis[0].step2 == "true" ? 'Passed' : 'Failed' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Step 3: {generator.diagnosis[0].step2 == "true" ? 'Passed' : 'Failed' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Step 4: {generator.diagnosis[0].step2 == "true" ? 'Passed' : 'Failed' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Rotor: {generator.diagnosis[0].rotor == "true" ? 'Damaged' : 'Not Damaged' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Stator: {generator.diagnosis[0].stator == "true" ? 'Damaged' : 'Not Damaged' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Exciter: {generator.diagnosis[0].exciter == "true" ? 'Damaged' : 'Not Damaged' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Materials: {generator.diagnosis[0].materials ? 'Available' : 'Not Available'}</h2>
            <h2 className=" flex font-normal text-m leading-tight">Manpower: {generator.diagnosis[0].manpower}</h2>
            </div>
            </CardContent>
        </Card>
        </div>
        <div className="grid grid-cols-3 w-full gap-5 px-20">
            {results.map((result: any) => (<>
                <Card className="w-full rounded text-gray-600 text-wrap">
                                <CardHeader>
                                    <CardTitle>{splitAndCapitalize(result.step)}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col gap-3">
                                        <h2 className="flex font-normal text-m leading-tight"><b>Date Started:</b>&nbsp;{dayjs(result.created_at).format('MMMM DD, YYYY h:mm:ss A')}</h2>
                                        <article className="text-wrap">
                                        <h3 className="font-bold">Description</h3>
                                        <p>{result.description}</p>
                                        </article>
                                        <div className="flex w-auto font-normal text-m leading-tight p-3"><img src={`/storage/${result.image}`} alt="step" /></div>

                                    </div>
                                </CardContent>
                            </Card>
            </>
                ))}
        </div>
        </div>

    );
}
