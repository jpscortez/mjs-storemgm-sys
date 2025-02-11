
import Page from "@/components/Page"
import { Button } from "@/components/ui/button"
import { PackageOpen, Plus } from "lucide-react"
import MyCard from "@/components/Card"

export default function TestPage() {
    return (
        <Page>
            <MyCard.Root>
                <MyCard.Header>
                    <MyCard.Title icon={PackageOpen} title="Título teste" />
                    <MyCard.Actions>
                        <Button variant="filled" size="icon" className="rounded-full font-bold">
                            <Plus />
                        </Button>
                    </MyCard.Actions>
                </MyCard.Header>
                <MyCard.Content>
                    <div className="w-full bg-red-500">Content</div>
                </MyCard.Content>
            </MyCard.Root>
        </Page>
    )
}