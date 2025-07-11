import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Eye, Calendar, Filter, Loader2 } from "lucide-react";

export default function History() {
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [repoFilter, setRepoFilter] = useState("all");

  const { data: repositories, isLoading: reposLoading } = useQuery({
    queryKey: ['/api/repositories'],
  });

  const { data: historyData, isLoading: historyLoading } = useQuery({
    queryKey: ['/api/history'],
  });

  const isLoading = reposLoading || historyLoading;

  const filteredHistory = (historyData || []).filter((item: any) => {
    const matchesSearch = item.repositoryName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === "all" || item.action.toLowerCase() === actionFilter;
    const matchesRepo = repoFilter === "all" || item.repositoryName === repoFilter;
    
    return matchesSearch && matchesAction && matchesRepo;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Complete':
      case 'Applied':
        return <Badge variant="secondary">{status}</Badge>;
      case 'Failed':
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'Audit':
        return <Badge variant="default">Audit</Badge>;
      case 'Fix':
        return <Badge className="bg-green-600 hover:bg-green-700">Fix</Badge>;
      default:
        return <Badge variant="outline">{action}</Badge>;
    }
  };

  const getIssuesColor = (issues: string) => {
    if (issues.includes('critical')) return 'text-red-400';
    if (issues.includes('warning')) return 'text-yellow-400';
    if (issues.includes('fixes generated')) return 'text-green-400';
    return 'text-green-400';
  };

  const handleDownload = async (item: any) => {
    try {
      const endpoint = item.type === 'fix' ? 
        `/api/download/fix/${item.fixId}` : 
        `/api/download/audit/${item.auditId}`;
      
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = item.type === 'fix' ? 
        `fix-${item.repositoryName}-${item.fixId}.md` : 
        `audit-${item.repositoryName}-${item.auditId}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleView = (item: any) => {
    const details = item.type === 'fix' 
      ? `Viewing fix for ${item.repositoryName}\nFixes: ${item.fixes}\nStatus: ${item.status}\nDate: ${new Date(item.date).toLocaleDateString()}`
      : `Viewing audit for ${item.repositoryName}\nScore: ${item.score}%\nIssues: ${item.issuesCount}\nStatus: ${item.status}\nDate: ${new Date(item.date).toLocaleDateString()}`;
    
    alert(details);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Audit History</h1>
        <p className="text-muted-foreground">Complete log of all audit and fix activities</p>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <Input
                placeholder="Search repositories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Action Type</label>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="audit">Audit</SelectItem>
                  <SelectItem value="fix">Fix</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Repository</label>
              <Select value={repoFilter} onValueChange={setRepoFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Repositories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Repositories</SelectItem>
                  {repositories?.map((repo: any) => (
                    <SelectItem key={repo.id} value={repo.name}>
                      {repo.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Date Range</label>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Last 30 days
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <Button variant="ghost" size="sm">
              <Filter className="w-4 h-4 mr-1" />
              Advanced Filters
            </Button>
            <Button size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* History Table */}
      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Repository</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Issues Found</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-sm text-muted-foreground">{new Date(item.date).toLocaleDateString()}</TableCell>
                  <TableCell>{getActionBadge(item.action)}</TableCell>
                  <TableCell className="font-medium">{item.repositoryName}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className={getIssuesColor(item.type === 'fix' ? 'fixes generated' : 'issues found')}>
                    {item.type === 'fix' ? `${item.fixes} fixes generated` : `${item.issuesCount} issues found`}
                  </TableCell>
                  <TableCell className="font-medium">{item.type === 'audit' ? `${item.score}%` : 'N/A'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDownload(item)}
                        title={`Download ${item.type} report`}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleView(item)}
                        title="View audit details"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Showing 1-{filteredHistory.length} of {filteredHistory.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="default" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
