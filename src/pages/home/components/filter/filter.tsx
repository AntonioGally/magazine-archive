// Libs
import { useSelector } from "react-redux"
// Components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// Icons
import { ListFilter } from "lucide-react"
// Types
import { RootState } from "@/store"
// Scripts
import useSearch from "./hooks/use-search"
import { setAbstract, setAuthor, setTitle } from "@/store/slices/filterSlice"

const Filter = () => {
    const { abstract, author } = useSelector((state: RootState) => state.filter.filters)
    const { handleSearch } = useSearch();

    const isFilterActive = abstract || author;

    return (
        <div className="flex flex-col max-w-[550px] w-full mt-6">
            <Label className="mb-1">Pesquisar por título</Label>
            <div className="flex flex-col md:flex-row md:items-center">
                <Input autoFocus type="text" onChange={(e) => handleSearch(e.target.value, setTitle)} />
                <div className="flex mt-2 md:mt-0 items-center">
                    <Popover>

                        <PopoverTrigger asChild>
                            <Button className="md:ml-3" variant={isFilterActive ? "default" : 'secondary'}><ListFilter />Filters</Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-80">
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label htmlFor="width">Abstract</Label>
                                        <Input
                                            defaultValue={abstract}
                                            onChange={(e) => handleSearch(e.target.value, setAbstract)}
                                            className="col-span-2 h-8"
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label htmlFor="maxWidth">Author</Label>
                                        <Input
                                            defaultValue={author}
                                            onChange={(e) => handleSearch(e.target.value, setAuthor)}
                                            className="col-span-2 h-8"
                                        />
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    )
}

export default Filter;