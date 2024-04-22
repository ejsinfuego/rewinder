import React, { FC, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Textarea } from "../ui/textarea"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Button, message, Steps, theme } from 'antd';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { z } from "zod"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "../ui/sheet"

const steps = [
  {
    title: 'Data Gathering',
    content: 'data-gathering',
    index: 0,
  },
  {
    title: 'Stripping',
    content: 'stripping',
    index: 1,
  },
  {
    title: 'Slots Cleaning',
    content: 'slots-cleaning',
    index: 2,
  },
  {
    title: 'Coil Forming',
    content: 'coil-forming',
    index: 3,
  },
  {
    title: 'Coil Insertion',
    content: 'coil-insertion',
    index: 4,
  },
 {
    title: 'Connection',
    content: 'connection',
    index: 5,
 },
 {
    title: 'Tie/Bonding',
    content: 'tie-bonding',
    index: 6,
 },
 {
    title: 'Electrical Testing',
    content: 'electrical-testing',
    index: 7,
 },
 {
    title: 'Varnishing',
    content: 'varnishing',
    index: 8,
 },
 {
    title: 'Assemble',
    content: 'assemble',
    index: 9,
 }
];



interface GeneratorResultProps {
    generator: object;
    diagnosis: object;
}


const GeneratorResult: FC<GeneratorResultProps> = ({ generator, diagnosis }) => {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [currentInput, setCurrentInput] = useState(0);
    const [index, setIndex] = useState(0);

    const [stage, setStage] = useState('Data Gathering');
    console.log(generator)
    const contenStyle: React.CSSProperties = {
        display: 'flex',
        borderRadius: '10px',
        marginBottom: '50px',
        padding: '20px',
    }

    const items = steps.map((item) => ({ title: item.title, description: item.content, index: item.index }));

    const formSchema = z.object({
        description: z.string().min(2).max(50),
        file: z.nullable(z.string()),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          description: "",
          file: null,
        },
      })

      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }


    return (
        <>
        <Card title="Generator Result" className="w-96 rounded p-5">
            <CardTitle className="scroll-m-20 border-b pb-2 text-2xl text-center font-semibold tracking-tight first:mt-0">Generator {generator.serial_number}</CardTitle>
            <CardDescription className="text-center">
                <h5 className="text-base font-normal tracking-tight">Here you can see the updates of rewinding status </h5>
            </CardDescription>
            <div>
            <CardContent className="p-2">
                <Sheet >
                <SheetTrigger >
                <Steps
                direction="vertical"
                size="default"
                style={contenStyle}
                items={
                    items.map((item) => ({
                        title: item.title,
                        description: item.description,
                        index: item.index,
                    }))
                }
                onChange={(current) => {
                    setStage(steps[current].title);
                    setIndex(steps[current].index);
                    console.log(current);
                }}

                onClick={
                    () => {
                        index !== current && setStage(steps[current].title);
                    }
                }
                /></SheetTrigger>


                <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>Update {stage}</SheetTitle>
                    <SheetDescription>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    </SheetDescription>
                </SheetHeader>
                </SheetContent>
            </Sheet>
            </CardContent>
            </div>


        </Card>

        </>

    );
}


export default GeneratorResult;
