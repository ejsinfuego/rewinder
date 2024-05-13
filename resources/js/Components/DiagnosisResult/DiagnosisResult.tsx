import React, { FC } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../ui/card"

interface DiagnosisResultProps {
    //eslint-disable-next-line
    diagnosisResult:{
        step: string,
        description: string,
    }[];
}


const DiagnosisResult: FC<DiagnosisResultProps> = (
    { diagnosisResult }

) => {
    const toObject = JSON.parse(JSON.stringify(diagnosisResult));

    const tryMap = toObject.map((item: { step: string, description: string }) => {
        return {
            prediction: item.step == "prediction" ? item.description : "",
            kVa: item.step == "kVa" ? item.description : "",
            serialNumber: item.step == "serialNumber" ? item.description : "",
            step1: item.step == "step1" ? item.description : "",
            step2: item.step == "step2" ? item.description : "",
            step3: item.step == "step3" ? item.description : "",
            step4: item.step == "step4" ? item.description : "",
            rotor: item.step == "rotor" ? item.description : "",
            stator: item.step == "stator" ? item.description : "",
            exciter: item.step == "exciter" ? item.description : "",
            materials: item.step == "materials" ? item.description : "",
            manpower: item.step == "manpower" ? item.description : "",

        };
    });

    return (
    <div className="py-2">
        <Card className="w-full rounded text-gray-600">
            <CardHeader>
            <CardTitle>Diagnosis Result</CardTitle>
            </CardHeader>
            <CardContent>
            <div className=" justify-center">
            <h2 className="font-semibold text-5xl text-gray-600 text-center leading-tight">{
                tryMap.prediction
            }</h2>
            <h3 className="font-semibold text-lg text-center leading-tight">Estimated Days of Rewinding Duration</h3>
            </div>
            <div className="grid grid-cols-2 p-2 gap-3 m-2">
            <h2 className="flex font-normal text-m leading-tight">Rating: {tryMap.kVa} kVa</h2>
            <h2 className=" flex font-normal text-m leading-tight">Serial Number: {tryMap.serialNumber}</h2>
            <h2 className=" flex font-normal text-m leading-tight">Test 1 - IR Test: {tryMap.step1 == "true" ? 'Passed' : 'Failed' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Test 2 - Winding Resistance Test: {tryMap.step2 == "true" ? 'Passed' : 'Failed' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Test 3 -Phase Voltage Test: {tryMap.step2 == "true" ? 'Passed' : 'Failed' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Test 4 - Surge Test: {tryMap.step2 == "true" ? 'Passed' : 'Failed' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Rotor: {tryMap.rotor == "true" ? 'Damaged' : 'Not Damaged' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Stator: {tryMap.stator == "true" ? 'Damaged' : 'Not Damaged' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Exciter: {tryMap.exciter == "true" ? 'Damaged' : 'Not Damaged' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Materials: {tryMap.materials == "true" ? 'Available': 'Not Available'}</h2>
            <h2 className=" flex font-normal text-m leading-tight">Manpower: {tryMap.manpower}</h2>
            </div>
            </CardContent>
        </Card>

    </div>

    )

}

export default DiagnosisResult;
