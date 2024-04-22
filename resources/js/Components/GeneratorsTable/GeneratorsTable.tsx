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



interface GeneratorTableProps {
    generators: any;
}


const GeneratorTable = ({ generators }: GeneratorTableProps) => {
    console.log('generator', generators)

    const headers = ['Serial Number', 'Job Order', 'Rating', 'Result', 'Status','Date Created']
    const rows = Object.values(generators).map((generator: any) => {
        const diagnosis = generator.diagnosis[0]; // Assuming there's only one diagnosis per generator
        return{
            'serial_number' : generator.serial_number,
            'job_order' : generator.job_order,
            'rating' : diagnosis.kVa, // Assuming this should be included in the table
            'result': diagnosis.result,
            'createdAt': generator.created_at, // or diagnosis.created_at, depending on what you need
            'status': generator.status === 'pending' ? 'For Approval' : generator.status,
            'action': <a href={route('generator.show', generator.id)}>View</a>
        };
    });

    return (
    <>
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
                        <TableCell>{generator.action}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
                </Table>

    </div>

    </>)
}


export default GeneratorTable
