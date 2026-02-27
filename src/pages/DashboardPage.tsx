import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import StatsCard from "@/components/StatsCard";
import ProjectCard from "@/components/ProjectCard";
import { mockProjects } from "@/data/mockData";
import { FolderKanban, Clock, CheckCircle2, Leaf, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const CATEGORY_COLORS = [
  "hsl(152, 45%, 28%)", "hsl(38, 75%, 55%)", "hsl(205, 65%, 48%)",
  "hsl(0, 72%, 51%)", "hsl(280, 55%, 50%)", "hsl(150, 10%, 45%)",
];

const DashboardPage = () => {
  const { user, isAdmin } = useAuth();
  const userProjects = isAdmin ? mockProjects : mockProjects.filter((p) => p.createdBy === user?.id);
  const allProjects = isAdmin ? mockProjects : userProjects;

  const stats = {
    total: allProjects.length,
    pending: allProjects.filter((p) => p.status === "Pending").length,
    approved: allProjects.filter((p) => ["Approved", "In Progress"].includes(p.status)).length,
    completed: allProjects.filter((p) => p.status === "Completed").length,
  };

  const categoryData = Object.entries(
    allProjects.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  const statusData = Object.entries(
    allProjects.reduce((acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold">
            {isAdmin ? "Admin Dashboard" : "My Dashboard"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isAdmin
              ? "Overview of all sustainability projects on campus"
              : "Track your sustainability project submissions"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Projects" value={stats.total} icon={<FolderKanban className="h-5 w-5" />} />
          <StatsCard title="Pending Approval" value={stats.pending} icon={<Clock className="h-5 w-5" />} description={isAdmin ? "Needs your review" : undefined} />
          <StatsCard title="Active" value={stats.approved} icon={<TrendingUp className="h-5 w-5" />} />
          <StatsCard title="Completed" value={stats.completed} icon={<CheckCircle2 className="h-5 w-5" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg font-display">Projects by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(80, 15%, 88%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg font-display">Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, value }) => `${name}: ${value}`}>
                    {statusData.map((_, i) => (
                      <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-display font-semibold mb-4">
            {isAdmin ? "Recent Projects" : "My Projects"}
          </h2>
          {allProjects.length === 0 ? (
            <Card className="shadow-card">
              <CardContent className="py-12 text-center">
                <Leaf className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">No projects yet. Create your first sustainability project!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allProjects.slice(0, 6).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
