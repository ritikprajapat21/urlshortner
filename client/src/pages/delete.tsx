import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Delete() {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Delete this short url</DialogTitle>
        <DialogDescription>
          This can't be undone. This will permanently delete the short url.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline">Cancel</Button>
        <Button variant="destructive" type="submit">
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
