import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import StatusBadge from "@/components/StatusBadge";
import { mockProjects, mockUpdates, mockApprovals, mockUsers } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, DollarSign, User, Target, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categoryIcons: Record<string, string> = {
  Recycling: "♻️", Energy: "⚡", Water: "💧", Community: "🌱", Research: "🔬", Other: "📋",
};

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();

  const project = mockProjects.find((p) => p.id === id);
  const updates = mockUpdates.filter((u) => u.projectId === id);
  const approval = mockApprovals.find((a) => a.projectId === id);
  const owner = mockUsers.find((u) => u.id === project?.createdBy);

  if (!project) {
    return (
      <AppLayout>
        <div className="text-center py-16">
          <p className="text-muted-foreground">Project not found.</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/projects")}>Back to Projects</Button>
        </div>
      </AppLayout>
    );
  }

  const latestProgress = updates.length > 0 ? Math.max(...updates.map((u) => u.progressPercentage)) : 0;
  const isOwner = project.createdBy === user?.id;

  const handleStatusAction = (action: string) => {
    toast({ title: `Project ${action}`, description: `This action would ${action.toLowerCase()} the project in a real system.` });
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="text-muted-foreground">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{categoryIcons[project.category]}</span>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{project.category}</span>
              <StatusBadge status={project.status} />
            </div>
            <h1 className="text-3xl font-display font-bold">{project.title}</h1>
          </div>
          <div className="flex gap-2 shrink-0">
            {isOwner && project.status === "Draft" && (
              <Button onClick={() => handleStatusAction("Submitted")}>Submit for Approval</Button>
            )}
            {isAdmin && project.status === "Pending" && (
              <>
                <Button onClick={() => handleStatusAction("Approved")}>Approve</Button>
                <Button variant="destructive" onClick={() => handleStatusAction("Rejected")}>Reject</Button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-card">
              <CardHeader><CardTitle className="font-display text-lg">Description</CardTitle></CardHeader>
              <CardContent><p className="text-muted-foreground leading-relaxed">{project.description}</p></CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader><CardTitle className="font-display text-lg">Expected Impact</CardTitle></CardHeader>
              <CardContent>
                <div className="flex items-start gap-2">
                  <Target className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-muted-foreground">{project.expectedImpact}</p>
                </div>
              </CardContent>
            </Card>

            {["Approved", "In Progress", "Completed"].includes(project.status) && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="font-display text-lg">Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">Overall Progress</span>
                      <span className="font-semibold">{latestProgress}%</span>
                    </div>
                    <Progress value={latestProgress} className="h-2.5" />
                  </div>
                  <Separator />
                  {updates.length > 0 ? (
                    <div className="space-y-4">
                      {updates.map((update) => (
                        <div key={update.id} className="border-l-2 border-primary/30 pl-4">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                            <Clock className="h-3 w-3" />
                            {new Date(update.createdAt).toLocaleDateString()}
                            <span className="font-medium">• {update.progressPercentage}%</span>
                          </div>
                          <p className="text-sm">{update.description}</p>
                          {update.metricType && (
                            <p className="text-xs text-primary mt-1">{update.metricType}: {update.metricValue}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No progress updates yet.</p>
                  )}
                </CardContent>
              </Card>
            )}

            {approval && (
              <Card className="shadow-card">
                <CardHeader><CardTitle className="font-display text-lg">Approval Decision</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={approval.decision === "Approved" ? "Approved" : "Rejected"} />
                      <span className="text-sm text-muted-foreground">
                        by {mockUsers.find((u) => u.id === approval.adminId)?.fullName} on{" "}
                        {new Date(approval.decisionDate).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground italic">"{approval.comment}"</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <Card className="shadow-card">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Owner:</span>
                  <span className="font-medium">{owner?.fullName || "Unknown"}</span>
                </div>
                {project.startDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Start:</span>
                    <span>{new Date(project.startDate).toLocaleDateString()}</span>
                  </div>
                )}
                {project.endDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">End:</span>
                    <span>{new Date(project.endDate).toLocaleDateString()}</span>
                  </div>
                )}
                {project.budget && (
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Budget:</span>
                    <span className="font-medium">${project.budget.toLocaleString()}</span>
                  </div>
                )}
                <Separator />
                <div className="text-xs text-muted-foreground">
                  Created {new Date(project.createdAt).toLocaleDateString()}
                  {project.submittedAt && (
                    <> • Submitted {new Date(project.submittedAt).toLocaleDateString()}</>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProjectDetailPage;
