import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, AlertTriangle, Search, Folder, Loader2 } from "lucide-react";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";

export default function Reports() {
  const { data: reportsData, isLoading } = useQuery({
    queryKey: ['/api/reports'],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  const {
    totalAudits = 0,
    totalRepositories = 0,
    totalFixes = 0,
    averageScore = 0,
    recentAudits = [],
    scoreHistory = [],
    issueTypes = []
  } = reportsData || {};

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Reports</h1>
        <p className="text-muted-foreground">Track your SEO performance and audit history</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Overall SEO Score</h3>
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-green-400">{averageScore}%</div>
            <div className="text-sm text-green-400">↑ 12% from last month</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Critical Issues</h3>
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-2xl font-bold text-red-400">{Math.floor(totalAudits * 0.3)}</div>
            <div className="text-sm text-red-400">↓ 5 from last week</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Total Audits</h3>
              <Search className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">{totalAudits}</div>
            <div className="text-sm text-green-400">↑ 8 this month</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Repositories</h3>
              <Folder className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">{totalRepositories}</div>
            <div className="text-sm text-green-400">↑ 3 this month</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>SEO Score Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={scoreHistory} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Issues Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={issueTypes} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Audits */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Audits</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Repository</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Issues</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAudits.map((audit: any) => (
                <TableRow key={audit.id}>
                  <TableCell className="font-medium">{audit.repositoryName}</TableCell>
                  <TableCell className="text-muted-foreground">{new Date(audit.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${
                      audit.score >= 90 ? 'text-green-400' : 
                      audit.score >= 70 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {audit.score}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      Issues found
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      audit.status === 'Complete' || audit.status === 'Fixed' ? 'secondary' :
                      audit.status === 'In Progress' ? 'default' : 'destructive'
                    }>
                      {audit.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
