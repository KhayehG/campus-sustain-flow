import AppLayout from "@/components/AppLayout";
import StatusBadge from "@/components/StatusBadge";
import { mockProjects, mockUsers } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { CheckCircle2, XCircle, Clock, Eye } from "lucide-react";
import StatsCard from "@/components/StatsCard";

const AdminPage = () => {
  const { toast } = useToast();
  const pendingProjects = mockProjects.filter((p) => p.status === "Pending");
  const allProjects = mockProjects;

  const handleAction = (projectTitle: string, action: string) => {
    toast({ title: `Project ${action}`, description: `"${projectTitle}" has been ${action.toLowerCase()}.` });
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold">Approvals</h1>
          <p className="text-muted-foreground mt-1">Review and manage project submissions</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatsCard title="Pending Review" value={pendingProjects.length} icon={<Clock className="h-5 w-5" />} />
          <StatsCard title="Total Approved" value={allProjects.filter((p) => ["Approved", "In Progress", "Completed"].includes(p.status)).length} icon={<CheckCircle2 className="h-5 w-5" />} />
          <StatsCard title="Rejected" value={allProjects.filter((p) => p.status === "Rejected").length} icon={<XCircle className="h-5 w-5" />} />
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-lg">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingProjects.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No projects pending approval.</p>
            ) : (
              <div className="space-y-4">
                {pendingProjects.map((project) => {
                  const owner = mockUsers.find((u) => u.id === project.createdBy);
                  return (
                    <div key={project.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <StatusBadge status={project.status} />
                          <span className="text-xs text-muted-foreground">{project.category}</span>
                        </div>
                        <h3 className="font-semibold truncate">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">by {owner?.fullName} • {new Date(project.submittedAt || project.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4 shrink-0">
                        <Link to={`/projects/${project.id}`}>
                          <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                        </Link>
                        <Button size="sm" onClick={() => handleAction(project.title, "Approved")}>
                          <CheckCircle2 className="h-4 w-4 mr-1" /> Approve
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleAction(project.title, "Rejected")}>
                          <XCircle className="h-4 w-4 mr-1" /> Reject
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-lg">All Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {allProjects.map((project) => {
                const owner = mockUsers.find((u) => u.id === project.createdBy);
                return (
                  <Link key={project.id} to={`/projects/${project.id}`} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <StatusBadge status={project.status} />
                      <div className="min-w-0">
                        <p className="font-medium truncate">{project.title}</p>
                        <p className="text-xs text-muted-foreground">{owner?.fullName} • {project.category}</p>
                      </div>
                    </div>
                    <Eye className="h-4 w-4 text-muted-foreground shrink-0" />
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AdminPage;
