import { Button } from "@/Components/ui/button"
import * as React from "react"
import { Input } from "@/Components/ui/input"
import Guest from "@/Layouts/GuestLayout"
import { Link, router } from "@inertiajs/react"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Separator } from "@/Components/ui/separator"
import { Search } from "lucide-react"

interface HomePageProps {
    results: Generator
}

export default function HomePage({ results }: HomePageProps) {
    const [search, setSearch] = React.useState<string>("")


    const checkIfNull = (search) => {
        if (search === null) {
            return false
        }
        return true
    }
    return(
        <Guest >
            <div className="flex justify-center">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">Search your Generator Here</h2>
            </div>
            <div className="flex w-full max-w-sm items-center space-x-2 py-2">
            <Input type="text" placeholder="serial number or job order"
             onChange={(e) => {

                setSearch(e.target.value)
                }}
             />
            <Link href={'/search/'+search} only={['results']} >
                <Button><Search ></Search>  </Button></Link>
            </div>
            { results && (
                <div className="flex justify-center">
            <ScrollArea className="h-72 w-full rounded-md border">
                <div className="p-4">
                    <h4 className="mb-4 text-sm font-medium leading-none">Result (Serial Number | Job Order)</h4>
                    {
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
                    }
                </div>
                </ScrollArea>
            </div>
            )

            }
        </Guest>
    )
}
