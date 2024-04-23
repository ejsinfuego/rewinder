import React from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/Components/ui/table"
  import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/Components/ui/sheet"
import dayjs from "dayjs"
import { Button } from "@/Components/ui/button";
import { useForm, router } from '@inertiajs/react';
import { message } from "antd";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/Components/ui/pagination";



interface GeneratorTableProps {
    generators: {
        data: {
            id: number,
            serial_number: string,
            job_order: string,
            rating: number,
            result: string,
            status: string,
            created_at: string,
            diagnosis: { result: string, created_at: string, kVa: number,  step_1: string,
                step_2: string,
                step_3: string,
                step_4: string,
                rotor: string,
                stator: string,
                exciter: string,
                prediction: number,
             }[],
        }[]

    };
}


const GeneratorTable = ({ generators }: GeneratorTableProps) => {

    const headers = ['Serial Number', 'Job Order', 'Rating', 'Result', 'Status','Date Created']
    console.log(generators)
    const rows = Object.values(generators.data).map((generator: {
        id: number,
        serial_number: string,
        job_order: string,
        rating: number,
        result: string,
        status: string,
        created_at: string,
        diagnosis: { result: string, created_at: string, kVa: number,  step_1: string,
            step_2: string,
            step_3: string,
            step_4: string,
            rotor: string,
            stator: string,
            exciter: string,
            prediction: number,
         }[],

    }) => {
        const diagnosis = generator.diagnosis[0];

        return {
            'id': generator.id,
            'serial_number' : generator?.serial_number || '',
            'job_order' : generator?.job_order || '',
            'rating' : diagnosis?.kVa || 0,
            'result': diagnosis?.result || '',
            'createdAt': generator?.created_at || '',
            'status': generator?.status === 'pending' ? 'For Approval' : 'Approved',
            'action': <a href={route('generator.show', generator.id)}>View</a>,
            'step1': generator?.diagnosis[0]?.step_1 ? 'Passed' : 'Fail' || '',
            'step2': generator?.diagnosis[0]?.step_2 ? 'Passed' : 'Fail' || '',
            'step3': generator?.diagnosis[0]?.step_3 ? 'Passed' : 'Fail' || '',
            'step4': generator?.diagnosis[0]?.step_4 ? 'Passed' : 'Fail' || '',
            'rotor': generator?.diagnosis[0]?.rotor ? 'Passed' : 'Fail' || '',
            'stator': generator?.diagnosis[0]?.stator ? 'Passed' : 'Fail' || '',
            'exciter': generator?.diagnosis[0]?.exciter ? 'Passed' : 'Fail' || '',
            'prediction': generator?.diagnosis[0]?.prediction || '',
        };
    });


    const { data, setData, post } = useForm({
        approved: '',
    });

    const approve = (id: number) => {
            post(route('generator.approve', id), {
                onSuccess: () => {
                    return Promise.all([
                        message.success('Generator approved'),
                        router.visit(route('dashboard')),
                    ]);
                },
                onError: () => {
                    message.error('Failed to approve generator');
                }
            });
    }
    return (
    <div className="flex flex-col">
    <div className="flex justify-center mt-6 max-w-full rounded border border-2">
        <Table>
                <TableHeader>
                <TableRow>
                    {headers.map((header, index) => (
                        <TableCell key={index} className="font-medium">{header}</TableCell>)
                    )}
                </TableRow>
                </TableHeader>
                <TableBody>
                {rows.map((generator, index) => (
                    <TableRow key={index}>
                        <TableCell>{generator.serial_number}</TableCell>
                        <TableCell>{generator.job_order}</TableCell>
                        <TableCell>{generator.rating}</TableCell>
                        <TableCell>{generator.result}</TableCell>
                        <TableCell>{generator.status}</TableCell>
                        <TableCell>{generator.createdAt}</TableCell>
                        <TableCell>
                        <Sheet>
                        <SheetTrigger>
                        Show
                        </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Generator {generator.serial_number}</SheetTitle>
                                        <SheetDescription>
                                        </SheetDescription>
                                    </SheetHeader>
                                        <p>Rating: {generator.rating} kVa</p>
                                        <p>Result: {generator.result}</p>
                                        <p>Status: {generator.status}</p>
                                        <p>Date Created: {dayjs(generator.createdAt).format('MMMM DD, YYYY mm:ss A')}</p>
                                        <h5 className="font-bold text-lg">Diagnosis</h5>
                                        <p>Step 1(Insulation Resistance Test): {generator.step1}</p>
                                        <p>Step 2(Winding Resistance Test): {generator.step2}</p>
                                        <p>Step 3(Phase Voltage Test): {generator.step3}</p>
                                        <p>Step 4(Surge Test): {generator.step4}</p>
                                        <p>Rotor: {generator.rotor}</p>
                                        <p>Stator: {generator.stator}</p>
                                        <p>Exciter: {generator.exciter}</p>
                                        <p>Rewinding Duration Estimate: {generator.prediction}</p>
                                        <div className="flex justify-start pt-5">
                                        {generator.status === 'For Approval' ?
                                            <Button onClick={() => {
                                                approve(generator.id);
                                            }}>Approve</Button> : <Button onClick={ () => router.visit(route('generator.show', generator.id))}>View</Button>
                                        }
                                        </div>
                                </SheetContent>

                        </Sheet></TableCell>
                        <TableCell>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
                </Table>

    </div>
        <div className="flex justify-center">
                        {
                                generators.data.length > 0 && (
                                        <PaginationLink>
                                            Page {generators.current_page} of {generators.last_page}
                                        </PaginationLink>
                                )
                            }
        </div>
        <div className="flex flex-col">
                        <Pagination>
                        <PaginationContent>
                            {generators.links.length > 0 && (
                                generators.links.map((link, index) => (
                                    <PaginationItem key={index} className="cursor-pointer rounded">
                                        <PaginationLink
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.visit(link.url);
                                            }}
                                            size="icon"
                                            className={link.active ? 'bg-blue-500 text-white rounded' : 'rounded hover:bg-gray-200 hover:text-black px-2 responsive'}
                                        >
                                            {index === 0 ? '<' : index === generators.links.length - 1 ? '>' : link.label}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))
                            )}

                        </PaginationContent>
                        </Pagination>
        </div>
    </div>)
}


export default GeneratorTable
