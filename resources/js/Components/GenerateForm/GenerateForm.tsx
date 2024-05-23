import React, { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Loader2 } from 'lucide-react';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form"
import TextInput from "../TextInput"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { ArrowLeftIcon } from "lucide-react";
import { useForm as submitForm } from '@inertiajs/react';
import { isForRewind, mainFormula, jobOrderGenerator, damage } from "@/lib/utils";
import DiagnosisResult from "../DiagnosisResult/DiagnosisResult";

interface GenerateFormProps {}

const GenerateForm: FC<GenerateFormProps> = () => {
    const [hide] = useState(false)
    const [loading, setLoading] = useState(false)
    const [rewind, setRewind] = useState(false)
    const [diagnosis, setDiagnosis] = useState("")
    const [results, setResults] = useState(
        [] as { step: string, description: string }[]
    )
    const [diagnosisLoad, setDiagnosisLoad] = useState(false)
    // const [approver, approverChange] = useState("")
    const [numberError, setNumberError] = useState("")
    const { post, setData } = submitForm({
        serialNumber: "",
        kVa: 0,
        step1: "",
        step2: "",
        step3: "",
        step4: "",
        rotor: "",
        stator: "",
        exciter: "",
        manpower: 0,
        materials: "",
        prediction: "",
        // approver: 0,
    })


    const formSchema = z.object({
        serialNumber: z.string().nonempty({ message: 'Serial Number is required'}),
        kVa: z.number(),
        step1: z.string().nonempty({ message: 'Step 1 is required, Please choose an option'}),
        step2: z.string().nonempty({ message: 'Step 2 is required, Please choose an option'}),
        step3: z.string().nonempty({ message: 'Step 3 is required, Please choose an option'}),
        step4: z.string().nonempty({ message: 'Step 4 is required, Please choose an option'}),
        prediction: z.number(),
        jobOrder: z.string(),
        result: z.string(),
        rotor: z.string(),
        stator: z.string(),
        exciter: z.string(),
        manpower: z.number(),
        materials: z.string(),
        // approver: z.string(),

    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        serialNumber: "",
            kVa: 0,
            step1: "",
            step2: "",
            step3: "",
            step4: "",
            rotor: "",
            stator: "",
            exciter: "",
            manpower: 0,
            materials: "",
            prediction: 0,
            jobOrder: "",
            // approver: approver,
        },
    })

    const fourthSteps = document.getElementById("fourthSteps")
    const damages = document.getElementById("damages")

    useEffect(() => {


    if(hide){
        fourthSteps?.setAttribute("hidden", "true")
        damages?.removeAttribute("hidden")
    }else{
        damages?.setAttribute("hidden", "true")
        fourthSteps?.removeAttribute("hidden")
    }
    }, [hide])
    const convertToNumber = (value: string) => {
        //regex that checks
        const regex = /^[0-9]*$/
        if(!regex.test(value)){
            setNumberError("Only numbers are allowed")
        }else{
            setNumberError("")
            return parseInt(value, 10)
        }
    }

    const forRewind = () => {
        const result = isForRewind({ step_1: form.getValues("step1"), step_2: form.getValues("step2"), step_3: form.getValues("step3"), step_4: form.getValues("step4") })
       form.setValue("result", result)
       return result
    }

    const getPrediction = () => {
        const damagedParts = damage({ damage: form.getValues()})
        const rating = parseInt(form.getValues('kVa').toString().charAt(0), 10)
        const jobOrder = jobOrderGenerator()
        const materials = form.getValues('materials') === "true" ? 1 : 0
        const mainFormulaValue = mainFormula(damagedParts, rating, materials, form.getValues('manpower'))
        form.setValue("jobOrder", jobOrder)
        form.setValue("prediction", mainFormulaValue)
    }

    function onSubmit(values: z.infer<typeof formSchema>) {


        console.log(values)
    }



    const handleSubmit = () => {
        getPrediction()
        if(form.getValues("result") === 'rewind'){
        const values = form.getValues()
        const res = values
        //convert the object into flat array
        const result = res ? Object.entries(res).map(([key, value]) => ({ step: key, description: value.toString() })) : []
        setResults(result)
        handleDiagnosisLoad()
        }else{
            console.log('recon')
            saveData()
        }

    }

    const handleReconOrRewindChange = () => {
        (forRewind() === 'rewind') ? setRewind(true) : setRewind(false)
        setDiagnosis(forRewind())
    }

    const handleLoad = () => {
        setLoading(true)
        setDiagnosis("") // Fix: Change null to an empty string
        setTimeout(() => {
            setLoading(false)
            handleReconOrRewindChange()
        }, 1000)
    }

    const handleDiagnosisLoad = () => {
        setDiagnosis("") // Fix: Pass an empty argument to setDiagnosis function
        setDiagnosisLoad(true)
        setTimeout(() => {
            setDiagnosisLoad(false)
        }, 1000)
    }

    const saveData = () => {
        // form.setValue('approver', approver)
        const data = {
            ...form.getValues(),
            prediction: form.getValues('prediction').toString() // Convert prediction to a string
        }
        setData(data)
        post(route('testFormula'))
    }



    const [showSubmit, setShowSubmit] = useState(false)

    useEffect(() => {

        const steps = form.getValues("step1") !== "" && form.getValues("step2") !== "" && form.getValues("step3") !== "" && form.getValues("step4") !== ""
        if(steps){
            setShowSubmit(true)
        }else{
            setShowSubmit(false)
        }
    }, [form.getValues("step1"), form.getValues("step2"), form.getValues("step3"), form.getValues("step4")])

    return (
    <>
    {results.length > 0 ?
    <>
    {diagnosisLoad ? <>
        <div className="items-center">
            <Loader2 className="mx-auto animate-spin text-primary text-center" size={50} />
            <p className="text-center py-2 font-light">Loading...</p>
        </div>
        </> :
        <>
        <div className="flex flex-col">

        <DiagnosisResult diagnosisResult={results as { step: string, description: string }[]}/>
        {/*disable choices for approval  */}
        {/* <div className="mt-4">
                    <InputLabel htmlFor="role" value="User Type" />
                    <Select onValueChange={(e) => {
                        approverChange(e)
                        form.setValue('approver', e)
                    }}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Approver" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    (admins as AdminType[]).map((ad) => (
                                        <SelectItem key={ad.id} value={ad.id}>{ad.name}</SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div> */}
        <Button onClick={saveData} className="rounded">Save</Button>
        </div>

        <div className="flex justify-center">

        </div>
        </>
    }

    </>
    :
    <>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-5 border border-gray-300 p-10 rounded-xl w-2/4">
      <h2 className="text-2xl font-semibold font text-center">Generator Form</h2>
      <div className="flex flex-col justify-center">
        <div className="flex justify-center mb-5">
        <FormField
          control={form.control}
          name="serialNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex flex-col">Serial Number</FormLabel>
              <FormControl>
                <TextInput className="p-2 flex min-w-[300px] rounded" placeholder="Serial Number here..." {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        </div>
        <div className="flex justify-center  mb-5">
        <FormField
          control={form.control}
          name="kVa"
          render={({ field }) => (
            <FormItem >
              <FormLabel className="flex flex-col">Rating</FormLabel>
              <FormDescription className="text-xs">Enter the Rating (10-1000 kVA)</FormDescription>
              <FormControl>
                <Input required className="p-2 flex min-w-[300px] rounded" placeholder="type here" {...field} onChange={
                    (e) => {
                        if(e.target.value === ""){
                            form.setValue("kVa", 0)
                        }else{
                            form.setValue("kVa", convertToNumber(e.target.value) as number)
                        }
                    }
                } />
              </FormControl>
              <div className="flex text-red-500 text-xs">{numberError}</div>
              <FormMessage />
            </FormItem>
          )}
        />

        </div>

        {diagnosis &&
        <>
        <div className="flex justify-center mb-5">
        <h4 className="text-center py-2 font-medium">
        {diagnosis === 'rewind' ? 'Rewinding' : 'Recondition' }</h4>
        </div>
        </>
        }
        {loading ? <>
        <div className="flex flex-col items-center justify-center mb-5">
            <div className="items-center">
            <Loader2 className="mx-auto animate-spin text-primary text-center" />
            <p className="text-center py-2">Loading...</p></div>

        </div>
        </>
        :
        <>

        {
            !rewind ? <>
            <div id="fourthSteps">
                <div className="flex justify-center mb-5">
            <FormField
            control={form.control}
            name="step1"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="flex flex-col">Step 1 ( Insulation Resistance Test)</FormLabel>
                <FormControl className="p-2 flex min-w-[300px] rounded-sm">
                <RadioGroup onValueChange={
                        (e) =>
                            form.setValue("step1", e)
                } {...field}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="r1" />
                        <Label htmlFor="r1">Passed</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="r2" />
                        <Label htmlFor="r2">Failed</Label>
                    </div>
                    </RadioGroup>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            </div>
            <div className="flex justify-center mb-5">
            <FormField
            control={form.control}
            name="step2"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="flex flex-col">Step 2 (Winding Resistance Test)</FormLabel>
                <FormControl className="p-2 flex min-w-[300px] rounded-sm">
                <RadioGroup onValueChange={
                        (e) =>
                            form.setValue("step2", e)
                } {...field}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="r1" />
                        <Label htmlFor="r1">Passed</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="r2" />
                        <Label htmlFor="r2">Failed</Label>
                    </div>
                    </RadioGroup>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            </div>
            <div className="flex justify-center mb-5">
            <FormField
            control={form.control}
            name="step3"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="flex flex-col">Step 3 (Phase Voltage Test)</FormLabel>
                <FormControl className="p-2 flex min-w-[300px] rounded-sm">
                <RadioGroup onValueChange={
                        (e) =>
                            form.setValue("step3", e)
                } {...field}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="r1" />
                        <Label htmlFor="r1">Passed</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="r2" />
                        <Label htmlFor="r2">Failed</Label>
                    </div>
                    </RadioGroup>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            </div>
            <div className="flex justify-center mb-5">
            <FormField
            control={form.control}
            name="step4"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="flex flex-col">Step 4 (Surge Test)</FormLabel>
                <FormControl className="p-2 flex min-w-[300px] rounded-sm">
                <RadioGroup onValueChange={
                        (e) =>{
                            form.setValue("step4", e)
                            handleLoad()
                        }
                } {...field}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="r1" />
                        <Label htmlFor="r1">Passed</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="r2" />
                        <Label htmlFor="r2">Failed</Label>
                    </div>
                    </RadioGroup>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            </div>
            </div>

            </> :
            <>
            <div id="damages">
            <div className="flex items-center justify-center">
                <ArrowLeftIcon onClick={()=> {
                    form.setValue("step1", "")
                    form.setValue("step2", "")
                    form.setValue("step3", "")
                    form.setValue("step4", "")
                    setRewind(false)
                }} className="mr-2 cursor-pointer rounded hover:bg-gray-400 hover:text-white" size={15} />
                <h5 className="text-center py-2">Are the following damaged?</h5>
            </div>
            <div className="flex justify-center mb-5">
            <FormField
            control={form.control}
            name="rotor"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="flex flex-col">Main Rotor</FormLabel>
                <FormControl className="p-2 flex min-w-[300px] rounded-sm">
                <RadioGroup onValueChange={
                        (e) =>
                            form.setValue("rotor", e)
                } {...field}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="r1" />
                        <Label htmlFor="r1">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="r2" />
                        <Label htmlFor="r2">No</Label>
                    </div>
                    </RadioGroup>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            </div>
            <div className="flex justify-center mb-5">
            <FormField
            control={form.control}
            name="exciter"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="flex flex-col">Exciter</FormLabel>
                <FormControl className="p-2 flex min-w-[300px] rounded-sm">
                <RadioGroup onValueChange={
                        (e) =>
                            form.setValue("exciter", e)
                } {...field}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="r1" />
                        <Label htmlFor="r1">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="r2" />
                        <Label htmlFor="r2">No</Label>
                    </div>
                    </RadioGroup>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            </div>
            <div className="flex justify-center mb-5">
            <FormField
            control={form.control}
            name="stator"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="flex flex-col">Main Stator</FormLabel>
                <FormControl className="p-2 flex min-w-[300px] rounded-sm">
                <RadioGroup onValueChange={
                        (e) =>
                            form.setValue("stator", e)
                } {...field}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="r1" />
                        <Label htmlFor="r1">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="r2" />
                        <Label htmlFor="r2">No</Label>
                    </div>
                    </RadioGroup>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            </div>
            <div className="flex justify-center mb-5">
            <FormField
            control={form.control}
            name="materials"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="flex flex-col">Materials Ready?</FormLabel>
                <FormControl className="p-2 flex min-w-[300px] rounded-sm">
                <RadioGroup onValueChange={
                        (e) =>
                            form.setValue("materials", e)
                } {...field}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="r1" />
                        <Label htmlFor="r1">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="r2" />
                        <Label htmlFor="r2">No</Label>
                    </div>
                    </RadioGroup>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            </div>
            <div className="flex justify-center mb-5">
            <FormField
            control={form.control}
            name="manpower"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="flex flex-col">Man Power</FormLabel>
                <FormDescription className="text-xs">(ex. 1 or 2 or 3)</FormDescription>
                <FormControl>
                    <Input required type="text" className="p-2 flex min-w-[300px] rounded" placeholder="type here" {...field} onChange={
                        (e) => {
                            if(e.target.value === ""){
                                form.setValue("manpower", 0)
                            }else{
                                form.setValue("manpower", convertToNumber(e.target.value) as number)
                            }

                        }
                    } />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            </div>

        </div>
            </>
        }


        {showSubmit && <div className="flex justify-center">
        <Button className="rounded border border-gray-100" variant="default" onClick={handleSubmit}>Submit</Button>
        </div>}
        </>
        }
        </div>
      </form>
    </Form>
    </>
    }

    </>

    );
};

export default GenerateForm;
