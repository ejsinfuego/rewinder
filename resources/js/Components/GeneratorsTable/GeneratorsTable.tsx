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
import { useForm, router, Link, usePage } from '@inertiajs/react';
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
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/Components/ui/popover"



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
            user: { id: number, name: string, email: string, result: string, created_at: string }[],
            generator_users: { generator_id: number, user_id: number, id: number, status: string, created_at: string }[],
            diagnosis: { result: string, created_at: string, kVa: number,  step_1: string,
                step_2: string,
                step_3: string,
                step_4: string,
                rotor: string,
                stator: string,
                exciter: string,
                prediction: number,
                materials: string,
                manpower: number,
             }[],
        }[]

    };
    user: object;
}


const GeneratorTable = ({ generators, user }: GeneratorTableProps) => {

    const role = usePage().props.role;

    const headers = ['Serial Number', 'Job Order', 'Rating', 'Result', 'Status','Date Created']

    const rows = Object.values(generators.data).map((generator: {
        id: number,
        serial_number: string,
        job_order: string,
        rating: number,
        result: string,
        status: string,
        created_at: string,
        user: { id: number, name: string, email: string, result: string, created_at: string }[],
        generator_users: { generator_id: number, user_id: number, id: number, status: string, created_at: string }[],
        diagnosis: { result: string, created_at: string, kVa: number,  step_1: string,
            step_2: string,
            step_3: string,
            step_4: string,
            rotor: string,
            stator: string,
            exciter: string,
            prediction: number,
            materials: string,
            manpower: number,
         }[],

    }) => {
        const diagnosis = generator.diagnosis[0];
        console.log(generator)
        const userRequest = generator?.generator_users?.map((users) => {
           const user = generator?.user?.find((user) => user.id === users.user_id);

           return {
                'id': users.id,
                'name': user?.name || '',
                'email': user?.email || '',
                'status': users.status,
                'createdAt': dayjs(users.created_at).format('MMMM DD, YYYY H:mm:ss A') || '',
           }
        });

        return {
            'id': generator.id,
            'serial_number' : generator?.serial_number || '',
            'job_order' : generator?.job_order || '',
            'rating' : diagnosis?.kVa || 0,
            'result': diagnosis?.result || '',
            'createdAt': dayjs(generator?.created_at).format('MMMM DD, YYYY H:mm:ss A') || '',
            'status': generator?.status === 'pending' ? 'For Approval' : 'Approved',
            'materials': diagnosis?.materials || '',
            'manpower': diagnosis?.manpower || '',
            'action': <a href={route('generator.show', generator.id)}>View</a>,
            'step1': diagnosis?.step_1 ? 'Passed' : 'Fail' || '',
            'step2': diagnosis?.step_2 ? 'Passed' : 'Fail' || '',
            'step3': diagnosis?.step_3 ? 'Passed' : 'Fail' || '',
            'step4': diagnosis?.step_4 ? 'Passed' : 'Fail' || '',
            'rotor': diagnosis?.rotor ? 'Damaged' : 'Not Damaged' || '',
            'stator': diagnosis?.stator ? 'Damaged' : 'Not Damaged' || '',
            'exciter': diagnosis?.exciter ? 'Damaged' : 'Not Damaged' || '',
            'prediction': diagnosis?.prediction || '',
            'users': userRequest || '',

        };
    });

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
                                    <div className=" justify-center">
                                        <h2 className="font-semibold text-5xl text-gray-600 text-center leading-tight">{
                                            generator.prediction
                                        }</h2>
                                        <h3 className="font-semibold text-lg text-center leading-tight">Estimated Days of Rewinding Duration</h3>
                                    </div>
                                    <div className="grid grid-cols-2 p-2 gap-3 m-2">
            <h2 className="flex font-normal text-m leading-tight">Rating: {generator.rating} kVa</h2>
            <h2 className=" flex font-normal text-m leading-tight">Serial Number: {generator.serial_number}</h2>
            <h2 className=" flex font-normal text-m leading-tight">Step 1: {generator.step1}</h2>
            <h2 className=" flex font-normal text-m leading-tight">Step 2: {generator.step2 }</h2>
            <h2 className=" flex font-normal text-m leading-tight">Step 3: {generator.step2}</h2>
            <h2 className=" flex font-normal text-m leading-tight">Step 4: {generator.step2}</h2>
            <h2 className=" flex font-normal text-m leading-tight">Rotor: {generator.rotor}</h2>
            <h2 className=" flex font-normal text-m leading-tight">Stator: {generator.stator}</h2>
            <h2 className=" flex font-normal text-m leading-tight">Exciter: {generator.exciter}</h2>
            <h2 className=" flex font-normal text-m leading-tight">Materials: {generator.materials === "true" ? "Available" : "Not Available"}</h2>
            <h2 className=" flex font-normal text-m leading-tight">Manpower: {generator.manpower}</h2>
            </div>
                                        <div className="flex justify-start pt-5">

                                        {role === 'admin' ? <>{generator.status === 'For Approval' ?
                                        <Link href={'approve/'+generator.id}  only={['generators']} as="button" preserveState
                                        onFinish={() => {
                                            message.success('Generator has been approved');
                                        }}
                                        >
                                            <Button className="rounded-lg" variant="default" size="lg">Approve</Button>
                                        </Link> : <Button onClick={ () => router.visit(route('generator.show', generator.id))}>View</Button>
                                        }
</>: <Button onClick={ () =>
    generator.status === 'For Approval' ? message.loading('Generator is still for approval') : router.visit(route('generator.show', generator.id))
}>{generator.status === 'For Approval' ? 'Still for Aproval': 'View'}</Button>                                   }

                                        </div>
                                        {role === 'admin' && (<>
                                            <div className="justify-centerp pt-2">
                                                <h1 className="text-lg">User Access</h1>
                                            </div>
                                            <div className="flex flex-col">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableCell>Name</TableCell>
                                                            <TableCell>Date Created</TableCell>
                                                        <TableCell>Status</TableCell>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {generator.users.map((user, index) => (

                                                            <TableRow key={index}>
                                                                <TableCell>{user.name}</TableCell>
                                                                <TableCell>{user.createdAt}</TableCell>
                                                                <Popover>
                                                                <PopoverTrigger key={index}>
                                                                <TableCell>{user.status}</TableCell>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-full">
                                                                <Button >
                                                                <Link href={'/grantAccess/'+user.id}  only={['generators']} as="button" preserveState
                                                                onFinish={() => {
                                                                    message.success('Access has been approved');
                                                                }}
                                                                >Approve</Link>
                                                                </Button>
                                                                </PopoverContent>
                                                                </Popover>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </>)
                                        }
                                </SheetContent>
                        </Sheet>
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
                                            onClick={
                                                () => router.visit(link.url)
                                            }
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
