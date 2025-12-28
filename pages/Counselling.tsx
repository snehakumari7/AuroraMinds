import { WellnessSidebar } from "@/components/wellness/WellnessSidebar";
import { WellnessHeader } from "@/components/wellness/WellnessHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { Select } from "@/components/ui/select";
import { DataApi } from "@/lib/api";

const Counselling = () => {
  return (
    <div className="flex min-h-screen bg-bg-gradient">
      <WellnessSidebar />
      <div className="flex-1 flex flex-col">
        <WellnessHeader />
        <div className="p-6">
          <div className="mb-4 flex flex-wrap gap-3">
            <select className="h-9 rounded-md border border-border/50 bg-white/70 px-2 text-sm">
              <option>All specialties</option>
              <option>Anxiety</option>
              <option>Depression</option>
              <option>Sleep</option>
              <option>Relationship</option>
            </select>
            <select className="h-9 rounded-md border border-border/50 bg-white/70 px-2 text-sm">
              <option>Any day</option>
              <option>Weekdays</option>
              <option>Weekends</option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-6">
          {useQuery({ queryKey: ['counsellors'], queryFn: DataApi.counsellors }).data?.map((c) => (
            <Card key={c.id} className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{c.name}</h3>
              <p className="text-sm text-muted-foreground">{c.specialty}</p>
              <p className="text-sm">Availability: {c.availability}</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mt-2" variant="secondary">View details</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{c.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Specialty: {c.specialty}</p>
                    <p className="text-sm">Availability: {c.availability}</p>
                    <Button className="mt-2 w-full">Book session</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </Card>
          ))}
          </div>
          {useQuery({ queryKey: ['counsellors'], queryFn: DataApi.counsellors }).isError && (
            <Card className="mt-6 p-4 bg-yellow-50 border-yellow-200">
              <div className="text-sm text-yellow-800">Unable to reach the server. Start the API with: <code>node server/index.js</code> or update <code>VITE_API_URL</code>. Showing nothing for now.</div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Counselling;


