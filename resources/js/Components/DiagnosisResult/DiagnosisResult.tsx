import React, { FC } from 'react';
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card"

interface DiagnosisResultProps {
    //eslint-disable-next-line
    diagnosisResult: any;
}


const DiagnosisResult: FC<DiagnosisResultProps> = (
    { diagnosisResult }

) => {
    const mappedData = diagnosisResult.reduce((acc, curr) => {
        acc[curr.step] = curr.description;
        return acc;
    }, {});

    return (
    <div className="py-2">
        <Card className="w-full rounded text-gray-600">
            <CardHeader>
            <CardTitle>Diagnosis Result</CardTitle>
            </CardHeader>
            <CardContent>
            <div className=" justify-center">
            <h2 className="font-semibold text-5xl text-gray-600 text-center leading-tight">{
                mappedData.prediction
            }</h2>
            <h3 className="font-semibold text-lg text-center leading-tight">Estimated Days of Rewinding Duration</h3>
            </div>
            <div className="grid grid-cols-2 p-2 gap-3 m-2">
            <h2 className="flex font-normal text-m leading-tight">Rating: {mappedData.kVa} kVa</h2>
            <h2 className=" flex font-normal text-m leading-tight">Serial Number: {mappedData.serialNumber}</h2>
            <h2 className=" flex font-normal text-m leading-tight">Test 1 - IR Test: {mappedData.step1 == "true" ? 'Passed' : 'Failed' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Test 2 - Winding Resistance Test: {mappedData.step2 == "true" ? 'Passed' : 'Failed' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Test 3 -Phase Voltage Test: {mappedData.step2 == "true" ? 'Passed' : 'Failed' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Test 4 - Surge Test: {mappedData.step2 == "true" ? 'Passed' : 'Failed' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Rotor: {mappedData.rotor == "true" ? 'Damaged' : 'Not Damaged' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Stator: {mappedData.stator == "true" ? 'Damaged' : 'Not Damaged' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Exciter: {mappedData.exciter == "true" ? 'Damaged' : 'Not Damaged' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Materials: {mappedData.materials == "true" ? 'Available': 'Not Available'}</h2>
            <h2 className=" flex font-normal text-m leading-tight">Manpower: {mappedData.manpower}</h2>
            </div>
            </CardContent>
        </Card>

    </div>

    )

}

export default DiagnosisResult;
