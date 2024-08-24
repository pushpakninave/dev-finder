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
import { createRoomAction, editRoomAction, getRoomInfoById } from "@/lib/actions";
import { useParams, useRouter } from "next/navigation";
import { debounce } from 'lodash';
import { Room } from "@/db/schema";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(1).max(250),
    githubRepo: z.string().min(1).max(150),
    tags: z.string().min(1).max(50),
})

export function CreateRoomForm() {

    const router = useRouter();
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            githubRepo: "",
            tags: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await createRoomAction(values);
        toast({
            variant: "success",
            title: "Room Created",
        })
        router.push(`/browse`);
    }

    const debouncedOnSubmit = debounce(onSubmit, 300);

    return (
        <div className="container mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(debouncedOnSubmit)} className="space-y-8">
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
                        name="tags"
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

export function EditRoomForm({ roomInfo }: { roomInfo: Room }) {

    const params = useParams();
    const router = useRouter();
    console.log("edit page room info =>", roomInfo);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: roomInfo.name,
            description: roomInfo.description ?? "",
            githubRepo: roomInfo.githubRepo ?? "",
            tags: roomInfo.tags
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await editRoomAction({ id: params.roomId as string, ...values });
        router.push(`/`);
    }

    const debouncedOnSubmit = debounce(onSubmit, 300);

    return (
        <div className="container mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(debouncedOnSubmit)} className="space-y-8">
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
                        name="tags"
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

