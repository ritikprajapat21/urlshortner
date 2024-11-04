import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, PlusIcon, Trash } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export default function Urls() {
  const urls = [
    {
      _id: "1",
      shortId: "1",
      url: "https://google.com",
      visitHistory: [{ timestamp: 34982740293 }],
    },
    {
      _id: "2",
      shortId: "2",
      url: "https://youtube.com",
      visitHistory: [{ timestamp: 34982740293 }],
    },
    {
      _id: "3",
      shortId: "3",
      url: "https://twitter.com",
      visitHistory: [{ timestamp: 34982740293 }],
    },
    {
      _id: "4",
      shortId: "4",
      url: "https://cal.com",
      visitHistory: [{ timestamp: 34982740293 }],
    },
    {
      _id: "5",
      shortId: "5",
      url: "https://hence.com",
      visitHistory: [{ timestamp: 34982740293 }],
    },
    {
      _id: "6",
      shortId: "6",
      url: "https://fdsklj.com",
      visitHistory: [{ timestamp: 34982740293 }],
    },
  ];

  return (
    <>
      <Dialog>
        <Outlet />
        <h2 className="font-5xl mx-auto w-11/12 mb-4 font-bold self-start">
          View analytics of the created short URLs
        </h2>
        <DialogTrigger asChild>
          <Link to="/urls/create" className="mx-auto w-11/12">
            <Button className="mb-4" variant="outline">
              <PlusIcon /> Create a new URL
            </Button>
          </Link>
        </DialogTrigger>
        {urls.length === 0 ? (
          <h2>No short urls found</h2>
        ) : (
          <Table className="w-11/12 mx-auto">
            <TableCaption>Analytics of the created short URLs</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Shortened URL</TableHead>
                <TableHead className="font-bold">Actual URL</TableHead>
                <TableHead className="font-bold">Total clicks</TableHead>
                <TableHead className="font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {urls.map((url) => {
                return (
                  <TableRow key={url._id}>
                    <TableCell>{url.shortId}</TableCell>
                    <TableCell>{url.url}</TableCell>
                    <TableCell>{url.visitHistory.length}</TableCell>
                    <TableCell className="flex gap-2 items-center">
                      <DialogTrigger asChild>
                        <Link to="/urls/edit">
                          <Button variant="outline">
                            <Pencil />
                            Edit
                          </Button>
                        </Link>
                      </DialogTrigger>
                      <DialogTrigger asChild>
                        <Link to="/urls/delete">
                          <Button variant="destructive">
                            <Trash />
                            Delete
                          </Button>
                        </Link>
                      </DialogTrigger>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Dialog>
    </>
  );
}
