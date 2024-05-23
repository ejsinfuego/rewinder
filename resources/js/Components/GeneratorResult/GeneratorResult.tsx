import React, { useState } from "react";
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
import { useForm as submitForm, Link, usePage } from "@inertiajs/react";
import { router } from '@inertiajs/react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "../ui/sheet"
import { Label } from "../ui/label"
import dayjs from "dayjs"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/Components/ui/popover"
import { Generator } from "@/types";




interface GeneratorResultProps {
    generator: Generator;
    diagnosis: object;
    rewinding: {
        id: number,
        step: string,
        status: string,
        created_at: string,
        user: { id: number, name: string, email: string, result: string, created_at: string },
        comments: { id: number, comment: string, rewinding_id: number, user_id: number, created_at: string, user: {
            id: number,
            name: string,
            email: string,
            result: string,
            created_at: string
        } }[],
        procedure_id: number,
        description: string,
        image: string,
    }[];
}


const GeneratorResult = ({ generator, rewinding  }:
    GeneratorResultProps
) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    console.log('---rewinding', rewinding)
    const [comment, setComment] = useState<string>("");
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
        padding: '20px',
    }
    const formSchema = z.object({
        description: z.string().min(2, "Looks like your description is not enough"),
        file: z.any(),
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
                    const filteredItem = rewinding.filter(f => f.step === item.content).find(f => f.status);
                    if (filteredItem && filteredItem.status === 'pending') {
                        return current = item.index - 1;
                    } else {
                        return current = item.index;
                    }
                }
            })
            const filteredItem = rewinding.filter(f => f.step === steps[0].content).find(f => f.status);
            switch(current){
                case 0:

                    if(filteredItem){
                       if(filteredItem.status === 'pending'){
                           return 0;
                       }else{
                            return 1;
                        }
                    }
                    return 0;
                case 9:
                    return 9;
                default:
                    return current + 1;
            }


            // return current === 0 && current === null ? current : current + 1
        }

        const checkIfFinished = () => {
            const lastStep = rewinding.find(f => f.step === 'assemble')
            return updatesList.includes(steps[9].content) && lastStep?.status == 'approved'
        }

        const current = getCurrent()
        form.setValue('generator_id', generator.id)
        form.setValue('file', selectedFile)
        form.setValue('step', steps[current].content)

        const onSubmit = (values: z.infer<typeof formSchema>) => {
            form.getValues('file') != null ?
            router.visit('/generatorUpdate', {
                method: 'post',
                data: {...values, file: selectedFile},
                forceFormData: true,
                only: ['rewinding'],
                onFinish: () => {
                    message.success('Update has been submitted successfully');
                }
            })
            : form.setError('file', { message: 'Please insert image' })
        }

        const getPreviousStep = () => {
           return rewinding.filter(f => f.step === steps[current - 1]?.content).map(f => {
                return f.status
              })
            }
        console.log('---prev', getPreviousStep())
        //eslint-disable-next-line
        const role = (usePage().props.auth as any).role
    const items = steps.map((item) => {
        console.log('---list', getCurrent())
        console.log('---item', item.content)
        console.log('--checker', updatesList.includes(item.content))
        return {
            title: <h2 className="font-semibold">{item.title}</h2>,
            description: updatesList.includes(item.content) ?
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
                            <SheetContent className="w-[600px] sm:w-[540px] flex-col flex overflow-auto">
                                <SheetHeader>
                                    <SheetTitle className="text-lg">Update {item.title}</SheetTitle>
                                    <SheetDescription>
                                    {updatesList.includes(item.content) ?
                                        <Card>
                                            <CardContent>
                                                <CardHeader className="text-left -l-5">
                                                    This step has completed successfully on <b>{
                                                        dayjs(rewinding
                                                        .filter(f => f?.step === item?.content)
                                                        .find(f => f?.created_at)?.created_at).format('MMMM D, YYYY h:mm A')
                                                    }</b> by <b>{rewinding.filter(f => f.step === item.content).find(f => f.user)?.user.name}</b>
                                                </CardHeader>
                                                <CardDescription>
                                                    <div className="justify-start">
                                                    <Label className="text-center">Description
                                                    </Label>
                                                    <Textarea readOnly value={rewinding
                                                        .filter(f => f?.step === item?.content)
                                                        .find(f => f?.description)?.description} />
                                                    </div>
                                                    <div className="justify-center">
                                                    <Label className="text-center">Image
                                                    </Label>
                                                    <Popover>
                                                    <PopoverTrigger><img src={`/storage/${(rewinding
                                                            .filter(f => f.step === item?.content)
                                                            .find(f => f.image))?.image}`} alt="step" /></PopoverTrigger>
                                                        <PopoverContent sideOffset={-380}
                                                        align={"end"}
                                                        className="w-3/4"
                                                        ><img src={`/storage/${(rewinding
                                                            .filter(f => f.step === item?.content)
                                                            .find(f => f?.image))?.image}`} alt="step" /></PopoverContent>

                                                    </Popover>{role ==='admin' &&
                                                <div className="justify-center pt-10">
                                                {(rewinding.filter(f => f.step === item.content).find(f => f.status))?.status === 'pending' &&   <Button
                                                onClick={() => {
                                                router.visit('/approveProcedure/', {
                                                    method: 'post',
                                                    data: {
                                                        rewinding_id: rewinding.filter(f => f.step === item.content).find(f => f?.procedure_id)?.procedure_id},
                                                    forceFormData: true,
                                                    only: ['rewinding'],
                                                    })
                                            }} className="button mt-auto">Approve</Button>}
                                                </div>
                                                }
                                                    </div>

                                                </CardDescription>
                                            </CardContent>
                                        </Card>
                                        :
                                        <>
                                        {(getPreviousStep().includes('approved') || current >= 0) && role == 'rewinder' ?
                                        <Form {...form} >
                                            <form encType="multipart/form-data"  onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                                <FormField
                                                control={form.control}
                                                name="description"
                                                render={({ field }) => (
                                                    <FormItem>
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="type here..." {...field} />
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
                                                        <FormLabel aria-required>Picture</FormLabel>
                                                        <FormControl>
                                                            <Input type="file" onChange={handleFileChange}/>
                                                        </FormControl>
                                                        <FormDescription>
                                                            This is your photo for documentation.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                                />

                                                <Button className="button" >Submit</Button>
                                            </form>
                                        </Form>:
                                         <div className="text-warning">No updates yet or have the Supervisor needs to approve the previous step first.</div>
                                        }

                                        </>

                                        }

                                        <div className="justify-end py-2">
                                        <div className="text-start">Comments</div>
                                        <div className="text-start border border-gray-200 p-2">
                                            {rewinding.filter(f => f.step === item.content).map(f => (
                                                <div key={f.id} className="flex flex-col justify-between">
                                                    {f.comments.map(c => (
                                                        <div key={c.id} className="flex flex-col">
                                                            <span className="font-semibold">{c.user?.name}</span>
                                                            <span>{c.comment}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                        </div>
                                        </SheetDescription>
                                            </SheetHeader>
                                            {getPreviousStep().includes('approved') &&         <SheetFooter className="justify-end">
                                            <Textarea onChange={(e) => {
                                                setComment(e.target.value)

                                            }} className="mt-auto" />
                                            <Button
                                            onClick={() => {
                                                router.visit('/addComment', {
                                                    method: 'post',
                                                    data: {comment, rewinding_id: rewinding.filter(f => f?.step === item?.content).find(f => f?.procedure_id)?.procedure_id},
                                                    forceFormData: true,
                                                    only: ['rewinding'],
                                                    })
                                            }} className="button mt-auto">Comment</Button>
                                        </SheetFooter>}
                                        </SheetContent>
                                        </Sheet>
                </>)  : (current === item.index ?
                <Sheet >
                    <SheetTrigger >
                        <div className="text-yellow-500">On Going</div>
                    </SheetTrigger>
                    <SheetContent className="w-[600px] sm:w-[540px] flex-col flex overflow-auto">
                        <SheetHeader>
                            <SheetTitle className="text-lg">Update {item.title}</SheetTitle>
                            <SheetDescription>
                                <Form {...form} >
                                    <form encType="multipart/form-data"  onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                        <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="type here..." {...field} />
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
                                                <FormLabel aria-required>Picture</FormLabel>
                                                <FormControl>
                                                    <Input type="file" onChange={handleFileChange}/>
                                                </FormControl>
                                                <FormDescription>
                                                    This is your photo for documentation.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                        />

                                        <Button className="button" >Submit</Button>
                                    </form>
                                </Form>
                            </SheetDescription>
                        </SheetHeader>
                        <SheetFooter className="justify-end">
                            <Textarea onChange={(e) => {
                                setComment(e.target.value)

                            }} className="mt-auto" />
                            <Button
                            onClick={() => {
                                router.visit('/addComment', {
                                    method: 'post',
                                    data: {comment, rewinding_id: rewinding.filter(f => f?.step === item?.content).find(f => f?.procedure_id)?.procedure_id},
                                    forceFormData: true,
                                    only: ['rewinding'],
                                    })
                            }} className="button mt-auto">Comment</Button>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
                 : <div className="text-red-500">Not Completed</div>),
            index: item.index,
        }
    });

    return (
        <>
        <Card title="Generator Result" className="w-96 rounded pt-5 px-5">
            <CardTitle className="scroll-m-20 border-b pb-5 text-2xl text-center font-semibold tracking-tight first:mt-0">Generator {generator.serial_number}</CardTitle>
            <CardDescription className="text-center">
                <h5 className="text-base font-normal tracking-tight">Here you can see the updates of rewinding status </h5>
            </CardDescription>
            <div>
            <CardContent className="pt-2 -p-6">
                <Steps
                direction="vertical"
                size="default"
                className="-pb-2"
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
            {checkIfFinished()&& <CardFooter className="text-center">
            <Link href={`/rewinder/viewSummary/${generator.id}`}>
            <Button className="button">View Summary of Rewinding</Button>
            </Link>
            </CardFooter>}
            </CardContent>
            </div>

        </Card>

        </>

    );
}


export default GeneratorResult;
