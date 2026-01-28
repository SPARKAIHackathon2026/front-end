import { Button } from "@/components/ui/button"
import { ArrowUpIcon } from "lucide-react"
import {Input} from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <Button variant="outline">Button</Button>
          <Button variant="outline" size="icon" aria-label="Submit">
              <ArrowUpIcon />
          </Button>
          <Input type="email" placeholder="Email" />
      </main>
    </div>
  );
}
