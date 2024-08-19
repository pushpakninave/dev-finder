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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { createRoomAction } from "@/lib/actions";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(1).max(250),
    githubRepo: z.string().min(1).max(50),
    Language: z.string().min(1).max(50),
})

function CreateRoomForm() {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            githubRepo: "",
            Language: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await createRoomAction(values);
        router.push(`/`);
    }

    return (
        <div className="container mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Dev Finder Is Awesome" />
                                </FormControl>
                                <FormDescription>This is your public room name.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Im working on a side project, come join me"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Please describe what you are be coding on
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="githubRepo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Github Repo</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="https://github.com/pushpakninave/dev-finder"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Please put a link to the project you are working on
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="Language"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tags</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="typescript, nextjs, tailwind" />
                                </FormControl>
                                <FormDescription>
                                    List your programming languages, frameworks, libraries so people
                                    can find you content
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default CreateRoomForm