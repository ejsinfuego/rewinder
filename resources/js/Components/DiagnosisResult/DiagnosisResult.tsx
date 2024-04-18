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

const keys = [
    {'key': 'serial_number', 'title': 'Serial Number'},
    {'key': 'step1', 'title': 'Step 1 (Insulation Resistance Test)'},
    {'key': 'step2', 'title': 'Step 2 (Winding Resistance Test)'},
    {'key': 'step3', 'title': 'Step 3 (Phase Voltage Test)'},
    {'key': 'step4', 'title': 'Step 4 (Surge Test)'},
    {'key': 'exciter', 'title': 'Exciter'},
    {'key': 'rotor', 'title': 'Main Rotor'},
    {'key': 'stator', 'title': 'Main Stator'},
    {'key': 'jobOrder', 'title': 'Job Order'},
    {'key': 'kVa', 'title': 'Rating'},
    {'key': 'prediction', 'title': 'Estimate'},
    {'key': 'manpower', 'title': 'Manpower'},
    {'key': 'materials', 'title': 'Material Ready'},
    {'key': 'result', 'title': 'Diagnosis Result'},
]

const damagedOrNot = (step: string, description: string) => {
    const parts = step==='exciter'||step==='stator'||step==='rotor' ? true : false

    const steps = step==='step1'||step==='step2'||step==='step3'||step==='step4' ? true : false

    if(parts){
        return description === 'true' ? 'Damaged' : 'Not Damaged'
    }else if(steps){
        return description === 'true' ? 'Passed' : 'Failed'
    }else if(step === 'materials'){
        return description === 'true' ? 'Ready' : 'Not Ready'
    }else if(step === 'kVa'){
        return description+' kVA'
    }else if(step === 'prediction'){
        return description+' Days'
    }else{
        return description
    }
}

const DiagnosisResult: FC<DiagnosisResultProps> = (
    { diagnosisResult }
) => {
    console.log(diagnosisResult)
    return (
    <div>
        <Card className="w-96 rounded">
            <CardHeader>
            <CardTitle>Diagnosis Result</CardTitle>
            </CardHeader>
            <CardContent>
            <div>
          {diagnosisResult.map((diagnosis, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {
                    keys.find((key) => key.key === diagnosis.step)?.title
                  } : {

                    damagedOrNot(diagnosis.step, diagnosis.description)
                  }
                </p>
              </div>
            </div>
          ))}
        </div>

            </CardContent>
            <CardFooter>
                <Button className="rounded">Save</Button>
            </CardFooter>
        </Card>
    </div>

    )

}

export default DiagnosisResult;
