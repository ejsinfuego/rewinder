import { Button } from "@/Components/ui/button"
import * as React from "react"
import { Input } from "@/Components/ui/input"
import Guest from "@/Layouts/GuestLayout"
import { Link } from "@inertiajs/react"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Separator } from "@/Components/ui/separator"
import { Search } from "lucide-react"
import { Generator } from "@/types"
import { router } from '@inertiajs/react'
interface HomePageProps {
    results: Generator[]; // Update the type to be an array of Generator interfaces
}

export default function HomePage({ results }: HomePageProps) {
    const [search, setSearch] = React.useState<string>(" ")
    console.log(results)
    return(
        <Guest >
            <div className="flex justify-center rounded">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">Search your Generator Here</h2>
            </div>
            <div className="flex w-full max-w-sm items-center space-x-2 py-2">
            <Input type="text" className="rounded" placeholder="serial number or job order"
             onChange={(e) => {
                router.visit(`/search/${e.target.value || '&&'}`,{
                    preserveState: true,
                    only: ['results']
                })
                setSearch(e.target.value)
                }}
             />
            <Link href={'/search/'+search || 'GEN'} only={['results']} >
                <Button className="rounded">
                    <Search>
                    </Search>
                </Button>
            </Link>
            </div>
            <div className="flex justify-center">
            <ScrollArea className="h-72 w-full rounded border">
                <div className="p-4 rounded">
                    <h4 className="mb-4 text-sm font-medium leading-none">Result (Serial Number | Job Order)</h4>
                    {results && results?.length > 0 ? (
                        results.map((result) => (
                            <>
                            <Link href={'/diagnosisResult/'+result.id+'/show'}>
                            <div key={result.id} className="flex items-center justify-between py-2">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="font-semibold">{result.serial_number} | {result.job_order}</div>
                                    </div>
                                </div>
                            </div>
                            <Separator />
                            </Link>
                            </>

                        ))
                    ):
                    <div className="flex justify-center">
                    <h4 className="text-gray-500">No results found</h4>
                </div>}
                </div>
        </ScrollArea>
        </div>
          <div className="flex justify-center text-gray-500 py-3">
            <Link className="font-semibold" href={'/login'}>Login</Link> {' | '}
            <Link className="font-semibold" href={'/register'}>{' '}Register</Link>
            </div>
        </Guest>
    )
}
