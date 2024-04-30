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
import { message, Steps, theme } from 'antd';
import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import { Button } from "../ui/button";
import { z } from "zod"
import { useForm as submitForm } from "@inertiajs/react";
import { router } from '@inertiajs/react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "../ui/sheet"
import { Label } from "../ui/label"
import dayjs from "dayjs"
import { get } from "http";




interface GeneratorResultProps {
    generator: object;
    diagnosis: object;
    rewinding: object;
}


const GeneratorResult: FC<GeneratorResultProps> = ({ generator, rewinding }) => {
    const { token } = theme.useToken();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

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


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length) {
            setSelectedFile(e.target.files[0]);
            }
        };
    const contenStyle: React.CSSProperties = {
        display: 'flex',
        borderRadius: '10px',
        marginBottom: '50px',
        padding: '20px',
    }
    const formSchema = z.object({
        description: z.string().min(2).max(50),
        file: z.any().optional().nullable(),
        generator_id: z.number(),
        step: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          description: "",
          file: null,
          generator_id: 0,
          step: "",
        },
      })

        const updatesList = rewinding.map(f => f.step)

        const getCurrent = () => {
            // eslint-disable-next-line
            var current = 0;
            steps.map((item) => {
                if (updatesList.includes(item.content)) {
                    current = item.index
                }
            })
            return current === 0 ? 0 : current + 1
        }

        const current = getCurrent()
        form.setValue('generator_id', generator.id)
        form.setValue('file', selectedFile)
        form.setValue('step', steps[current].content)

        const onSubmit = (values: z.infer<typeof formSchema>) => {
            router.visit('/generatorUpdate', {
                method: 'post',
                data: {...values, file: selectedFile},
                forceFormData: true,
                only: ['rewinding'],
                onFinish: () => {
                    message.success('Update has been submitted successfully');
                }
            })
        }

    const items = steps.map((item) => {
        return {
            title: <h2 className="font-semibold">{item.title}</h2>,
            description: !item.content.includes(updatesList.content) ?
            (item.index <= getCurrent() &&
            <>
                <Sheet >
                    <SheetTrigger >
                        {updatesList.includes(item.content) ?
                            <div className="text-green-500">Completed</div>
                            :
                            <div className="text-yellow-500">On Going</div>
                        }
                    </SheetTrigger>
                    <SheetContent className="w-[600px] sm:w-[540px]">
                        <SheetHeader>
                            <SheetTitle className="text-lg">Update {item.title}</SheetTitle>
                            <SheetDescription>
                                {updatesList.includes(item.content) ?
                                <Card>
                                    <CardContent>
                                        <CardHeader className="text-left p-5">
                                             This step has completed successfully on {
                                                dayjs(rewinding
                                                .filter(f => f.step === item.content)
                                                .find(f => f.created_at).created_at).format('MMMM D, YYYY h:mm A')
                                             }
                                        </CardHeader>
                                        <CardDescription>
                                            <div className="justify-start">
                                            <Label className="text-center">Description
                                            </Label>
                                            <Textarea type="text" readOnly value={rewinding
                                                .filter(f => f.step === item.content)
                                                .find(f => f.description).description} />
                                            </div>
                                            <div className="justify-center">
                                            <Label className="text-center">Image
                                            </Label>
                                                <img src={`/storage/${(rewinding
                                                    .filter(f => f.step === item.content)
                                                    .find(f => f.image)).image}`} alt="step" />
                                            </div>
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                                :
                                <Form {...form} >
                                    <form encType="multipart/form-data"  onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                                You can describe what are the challenges, outcome, or anything important that need to know by client.
                                            </FormDescription>
                                            <FormMessage />
                                            </FormItem>

                                        )}
                                        />
                                        <FormField
                                        control={form.control}
                                        name="file"
                                        render={() => (
                                            <FormItem>
                                                <FormLabel>Picture</FormLabel>
                                                <FormControl>
                                                    <Input type="file" onChange={handleFileChange}/>
                                                </FormControl>
                                                <FormDescription>
                                                    This is your public display name.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                        />

                                        <Button className="button" >Submit</Button>
                                    </form>
                                </Form>}
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
                </>)  : <div className="text-red-500">Not Completed</div>,
            index: item.index,
        }
    });

    return (
        <>
        <Card title="Generator Result" className="w-96 rounded p-5">
            <CardTitle className="scroll-m-20 border-b pb-2 text-2xl text-center font-semibold tracking-tight first:mt-0">Generator {generator.serial_number}</CardTitle>
            <CardDescription className="text-center">
                <h5 className="text-base font-normal tracking-tight">Here you can see the updates of rewinding status </h5>
            </CardDescription>
            <div>
            <CardContent className="p-2">
                <Steps
                direction="vertical"
                size="default"
                status="process"
                current={getCurrent()}
                style={contenStyle}
                items={
                    items.map((item) => ({
                        title: item.title,
                        description: item.description,
                        index: item.index,
                    }))
                }
                />

            </CardContent>
            </div>


        </Card>

        </>

    );
}


export default GeneratorResult;
