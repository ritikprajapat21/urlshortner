import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Create() {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create a short link</DialogTitle>
      </DialogHeader>
      <form>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col gap-2 space-y-1.5">
            <Label htmlFor="name">Full url</Label>
            <Input id="name" type="url" placeholder="https://example.com" />
          </div>
        </div>
      </form>
      <DialogFooter className="flex justify-between">
        <Button className="w-full">Create a short link</Button>
      </DialogFooter>
    </DialogContent>
  );
}
