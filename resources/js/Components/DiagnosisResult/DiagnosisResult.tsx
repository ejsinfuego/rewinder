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
    const diagnosis = {
        prediction: diagnosisResult.find((item) => item.step === "prediction")?.description,
        kVa: diagnosisResult.find((item) => item.step === "kVa")?.description,
        serialNumber: diagnosisResult.find((item) => item.step === "serialNumber")?.description,
        step1: diagnosisResult.find((item) => item.step === "step1")?.description,
        step2: diagnosisResult.find((item) => item.step === "step2")?.description,
        step3: diagnosisResult.find((item) => item.step === "step3")?.description,
        step4: diagnosisResult.find((item) => item.step === "step4")?.description,
        rotor: diagnosisResult.find((item) => item.step === "rotor")?.description,
        stator: diagnosisResult.find((item) => item.step === "stator")?.description,
        exciter: diagnosisResult.find((item) => item.step === "exciter")?.description,
        materials: diagnosisResult.find((item) => item.step === "materials")?.description,
        manpower: diagnosisResult.find((item) => item.step === "manpower")?.description,
    }

    return (
    <div className="py-2">
        <Card className="w-full rounded text-gray-600">
            <CardHeader>
            <CardTitle>Diagnosis Result</CardTitle>
            </CardHeader>
            <CardContent>
            <div className=" justify-center">
            <h2 className="font-semibold text-5xl text-gray-600 text-center leading-tight">{
                diagnosis?.prediction
            }</h2>
            <h3 className="font-semibold text-lg text-center leading-tight">Estimated Days of Rewinding Duration</h3>
            </div>
            <div className="grid grid-cols-2 p-2 gap-3 m-2">
            <h2 className="flex font-normal text-m leading-tight">Rating: {diagnosis?.kVa} kVa</h2>
            <h2 className=" flex font-normal text-m leading-tight">Serial Number: {diagnosis?.serialNumber}</h2>
            <h2 className=" flex font-normal text-m leading-tight">Test 1 - IR Test: {diagnosis?.step1 == 'true' ? 'Passed' : 'Failed' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Test 2 - Winding Resistance Test: {diagnosis?.step2 == "true" ? 'Passed' : 'Failed' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Test 3 -Phase Voltage Test: {diagnosis.step3 == "true" ? 'Passed' : 'Failed' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Test 4 - Surge Test: {diagnosis.step4 == "true" ? 'Passed' : 'Failed' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Rotor: {diagnosis.rotor == "true" ? 'Damaged' : 'Not Damaged' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Stator: {diagnosis.stator == "true" ? 'Damaged' : 'Not Damaged' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Exciter: {diagnosis.exciter == "true" ? 'Damaged' : 'Not Damaged' }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Materials: {diagnosis.materials == "true" ? 'Available': 'Not Available'}</h2>
            <h2 className=" flex font-normal text-m leading-tight">Manpower: {diagnosis.manpower}</h2>
            </div>
            </CardContent>
        </Card>

    </div>

    )

}

export default DiagnosisResult;
