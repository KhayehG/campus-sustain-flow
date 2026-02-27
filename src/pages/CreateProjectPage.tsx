import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ProjectCategory } from "@/data/types";

const CreateProjectPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ProjectCategory>("Energy");
  const [description, setDescription] = useState("");
  const [expectedImpact, setExpectedImpact] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !expectedImpact) {
      toast({ title: "Error", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    if (description.length < 50) {
      toast({ title: "Error", description: "Description must be at least 50 characters.", variant: "destructive" });
      return;
    }
    toast({ title: "Project Created", description: "Your project has been saved as a draft." });
    navigate("/projects");
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-2xl">New Sustainability Project</CardTitle>
            <CardDescription>Create a project proposal. It will be saved as a draft until you submit for approval.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input id="title" placeholder="e.g., Campus Solar Panel Initiative" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={category} onValueChange={(v) => setCategory(v as ProjectCategory)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {(["Recycling", "Energy", "Water", "Community", "Research", "Other"] as ProjectCategory[]).map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description * <span className="text-xs text-muted-foreground">(min 50 chars)</span></Label>
                <Textarea id="description" rows={4} placeholder="Describe your sustainability project in detail..." value={description} onChange={(e) => setDescription(e.target.value)} />
                <p className="text-xs text-muted-foreground">{description.length}/50 minimum characters</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="impact">Expected Impact *</Label>
                <Textarea id="impact" rows={2} placeholder="What sustainability impact will this project have?" value={expectedImpact} onChange={(e) => setExpectedImpact(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start">Start Date</Label>
                  <Input id="start" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end">End Date</Label>
                  <Input id="end" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Estimated Budget (Optional)</Label>
                <Input id="budget" type="number" placeholder="0" value={budget} onChange={(e) => setBudget(e.target.value)} />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1">Save as Draft</Button>
                <Button type="button" variant="outline" onClick={() => navigate("/projects")}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default CreateProjectPage;
