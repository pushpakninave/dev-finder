"use client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { debounce } from 'lodash';
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const formSchema = z.object({
    search: z.string().min(0).max(50),
})

export default function SearchBar() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const path = usePathname();
    const { replace } = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: searchParams.get("query") ?? "",
        },
    })

    /* 
        I need to find a solution for this as it is not a good practice to have 2 seperate functions to search. 
        Although both functions have a different way to search results. 
    */
    function onSubmit(values: z.infer<typeof formSchema>) {
        if (values.search) {
            router.push(`/?query=${values.search}`);
        } else {
            router.push("/");
        }
    }

    const handleSearch = debounce((inputSearchQuery: string) => {
        const urlSearchParam = new URLSearchParams(searchParams);
        if (inputSearchQuery) {
            urlSearchParam.set('query', inputSearchQuery);
        } else {
            urlSearchParam.delete('query')
        }
        replace(`${path}?${urlSearchParam}`)

    }, 300)

    const debouncedOnSubmit = debounce(onSubmit, 300);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(debouncedOnSubmit)} className="grid grid-cols-3 md:grid-cols-9 gap-3 mx-1 md:mx-40 mb-5">
                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem className="col-span-2 md:col-span-8 h-10">
                            <FormControl>
                                <Input
                                    className="bg-slate-300 dark:bg-slate-700"
                                    placeholder="Search rooms using tags like java, javascript, c++..."
                                    defaultValue={searchParams.get('query')?.toString()}
                                    onChange={(e) => {
                                        const value: string = e.target.value;
                                        field.onChange(
                                            handleSearch(value)
                                        );
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="bg-slate-700 dark:bg-neutral-100 col-span-1 h-10 hidden md:grid" type="submit">Search</Button>
                <Button className="bg-slate-700 dark:bg-neutral-100 col-span-1 h-10 md:hidden grid" type="submit"> <SearchIcon /> </Button>
            </form>
        </Form>
    )
}
