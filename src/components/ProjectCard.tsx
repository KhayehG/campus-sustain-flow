import { Project } from "@/data/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import StatusBadge from "./StatusBadge";
import { Calendar, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const categoryIcons: Record<string, string> = {
  Recycling: "♻️",
  Energy: "⚡",
  Water: "💧",
  Community: "🌱",
  Research: "🔬",
  Other: "📋",
};

const ProjectCard = ({ project }: { project: Project }) => (
  <Link to={`/projects/${project.id}`}>
    <Card className="shadow-card hover:shadow-elevated transition-all hover:-translate-y-0.5 cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{categoryIcons[project.category] || "📋"}</span>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {project.category}
            </span>
          </div>
          <StatusBadge status={project.status} />
        </div>
        <h3 className="font-display font-semibold text-lg mt-2 group-hover:text-primary transition-colors leading-tight">
          {project.title}
        </h3>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{project.description}</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {project.startDate && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(project.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
            </span>
          )}
          {project.budget && (
            <span className="flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              {project.budget.toLocaleString()}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  </Link>
);

export default ProjectCard;
