import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4 m-4">
      <div>
        <Button variant="elevated">
          i am a button
        </Button>
      </div>
      <div>
        <Input
          placeholder="i am an input"
        />
      </div>
      <div>
        <Progress
          value={50}
        />
      </div>
      <div>
        <Textarea
          placeholder="i am an input"
        />
      </div>
    </div>
  );
}
