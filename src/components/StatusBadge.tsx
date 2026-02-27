import { ProjectStatus } from "@/data/types";
import { Badge } from "@/components/ui/badge";

const statusConfig: Record<ProjectStatus, { className: string }> = {
  Draft: { className: "bg-muted text-muted-foreground" },
  Pending: { className: "bg-warning/15 text-warning-foreground border-warning/30" },
  Approved: { className: "bg-info/15 text-info border-info/30" },
  Rejected: { className: "bg-destructive/15 text-destructive border-destructive/30" },
  "In Progress": { className: "bg-primary/15 text-primary border-primary/30" },
  Completed: { className: "bg-success/15 text-success border-success/30" },
  Archived: { className: "bg-muted text-muted-foreground" },
};

const StatusBadge = ({ status }: { status: ProjectStatus }) => {
  const config = statusConfig[status];
  return (
    <Badge variant="outline" className={`font-medium text-xs ${config.className}`}>
      {status}
    </Badge>
  );
};

export default StatusBadge;
