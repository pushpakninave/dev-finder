import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


function GlobalTabs() {
    return (
        <div className="container mx-auto flex justify-center">

            <Tabs defaultValue="account" className="mt-5">
                <TabsList className="bg-[#e4e2dd]">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                {/* <TabsContent value="account">Make changes to your account here.</TabsContent>
                <TabsContent value="password">Change your password here.</TabsContent> */}
            </Tabs>

        </div>
    )
}

export default GlobalTabs