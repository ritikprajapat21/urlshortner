import { ArrowRight } from "lucide-react";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <h1 className="text-3xl font-extrabold">
        Build stronger digital connections
      </h1>
      <p className="my-6 text-2xl text-balance text-center leading-8">
        Use our URL shortener to engage your audience and connect them to the
        right information. Create, edit and track your links easily.
      </p>
      <Link to="/signup" className="mb-4">
        <Button
          variant="outline"
          className="flex items-center gap-2 hover:transition-all hover:duration-300 hover:gap-4"
        >
          Sign up for free <ArrowRight />
        </Button>
      </Link>
      <Card className="w-11/12 p-6 rounded-3xl">
        <CardTitle className="text-3xl font-bold">Shorten a link</CardTitle>
        <CardDescription className="text-lg">
          No credit card required
        </CardDescription>
        <CardContent className="pt-6">
          <h1 className="text-xl font-bold">Paste your long link here</h1>
          <Input
            placeholder="https://example.com/my-long-url"
            className="mb-4"
          />
          <Button className="font-bold font-xl">
            <span>Get your short link </span>
            <ArrowRight className="h-12 w-12" />
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

export default App;
