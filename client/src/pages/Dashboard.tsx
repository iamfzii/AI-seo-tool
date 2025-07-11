import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Play, Folder, Wand2, Download, ExternalLink } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [selectedRepos, setSelectedRepos] = useState<number[]>([]);
  const [auditResults, setAuditResults] = useState<any[]>([]);
  const [aiFixResults, setAiFixResults] = useState<any[]>([]);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: repositories, isLoading } = useQuery({
    queryKey: ['/api/repositories'],
  });

  const runAuditMutation = useMutation({
    mutationFn: async (repositoryIds: number[]) => {
      const response = await apiRequest('POST', '/api/audit', { repositoryIds });
      return response.json();
    },
    onSuccess: (data) => {
      setAuditResults(data);
      toast({
        title: "Audit Complete",
        description: `Found issues in ${data.length} repositories`,
      });
    },
    onError: (error) => {
      toast({
        title: "Audit Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const aiFixMutation = useMutation({
    mutationFn: async (auditId: number) => {
      const response = await apiRequest('POST', '/api/ai-fix', { auditId });
      return response.json();
    },
    onSuccess: (data) => {
      setAiFixResults(prev => [...prev, data]);
      toast({
        title: "AI Fixes Generated",
        description: "Review the suggested fixes below",
      });
    },
    onError: (error) => {
      toast({
        title: "AI Fix Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleRepoSelect = (repoId: number, checked: boolean) => {
    if (checked) {
      setSelectedRepos(prev => [...prev, repoId]);
    } else {
      setSelectedRepos(prev => prev.filter(id => id !== repoId));
    }
  };

  const handleRunAudit = () => {
    if (selectedRepos.length === 0) return;
    runAuditMutation.mutate(selectedRepos);
  };

  const handleGenerateAIFix = (auditId: number) => {
    aiFixMutation.mutate(auditId);
  };

  const handleDownloadAudit = async (audit: any) => {
    try {
      const response = await fetch(`/api/download/audit/${audit.id}`);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const repo = getRepositoryById(audit.repositoryId);
      a.download = `audit-${repo?.name || 'unknown'}-${audit.id}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "Could not download the audit report",
        variant: "destructive",
      });
    }
  };

  const handleDownloadFix = async (fixReport: any) => {
    try {
      const response = await fetch(`/api/download/fix/${fixReport.id}`);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const audit = auditResults.find(a => a.id === fixReport.auditId);
      const repo = audit ? getRepositoryById(audit.repositoryId) : null;
      a.download = `fix-${repo?.name || 'unknown'}-${fixReport.id}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "Could not download the fix report",
        variant: "destructive",
      });
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 dark:bg-red-600';
      case 'warning': return 'bg-yellow-500 dark:bg-yellow-600';
      default: return 'bg-gray-500 dark:bg-gray-600';
    }
  };

  const getRepositoryById = (id: number) => {
    return repositories?.find((repo: any) => repo.id === id);
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
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Select repositories to audit and get AI-powered SEO fixes</p>
      </div>

      {/* Repository Selection */}
      <Card className="mb-8 card-hover border-2 border-transparent hover:border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Folder className="w-5 h-5 text-primary" />
            Select Repositories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {repositories?.map((repo: any) => (
              <label key={repo.id} className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-primary/5 hover:border-primary/20 cursor-pointer transition-all duration-200">
                <Checkbox
                  checked={selectedRepos.includes(repo.id)}
                  onCheckedChange={(checked) => handleRepoSelect(repo.id, !!checked)}
                />
                <div className="flex-1">
                  <div className="font-medium">{repo.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {repo.language} • Updated {new Date(repo.lastUpdated).toLocaleDateString()}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audit Controls */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-sm text-muted-foreground">
          {selectedRepos.length} repositories selected
        </div>
        <Button
          onClick={handleRunAudit}
          disabled={selectedRepos.length === 0 || runAuditMutation.isPending}
          className="glow-effect"
        >
          {runAuditMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Running Audit...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Run Audit
            </>
          )}
        </Button>
      </div>

      {/* Audit Results */}
      {auditResults.length > 0 && (
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold">Audit Results</h2>
          <Accordion type="single" collapsible className="w-full">
            {auditResults.map((audit) => {
              const repo = getRepositoryById(audit.repositoryId);
              const issueCount = audit.issues?.length || 0;
              const criticalIssues = audit.issues?.filter((issue: any) => issue.severity === 'critical').length || 0;
              
              return (
                <AccordionItem key={audit.id} value={`audit-${audit.id}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center space-x-3">
                      <Folder className="w-4 h-4 text-primary" />
                      <span className="font-medium">{repo?.name}</span>
                      <Badge variant={criticalIssues > 0 ? "destructive" : "secondary"}>
                        {issueCount} issues
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4">
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">SEO Score: 
                              <span className={`font-semibold ml-1 ${
                                audit.score >= 90 ? 'text-green-400' : 
                                audit.score >= 70 ? 'text-yellow-400' : 'text-red-400'
                              }`}>
                                {audit.score}%
                              </span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Audit completed: {new Date(audit.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadAudit(audit)}
                              title="Download audit report"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleGenerateAIFix(audit.id)}
                              disabled={aiFixMutation.isPending}
                            >
                              {aiFixMutation.isPending ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Generating...
                                </>
                              ) : (
                                <>
                                  <Wand2 className="w-4 h-4 mr-2" />
                                  Generate AI Fixes
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Error</TableHead>
                            <TableHead>File</TableHead>
                            <TableHead>Line</TableHead>
                            <TableHead>Severity</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {audit.issues?.map((issue: any, index: number) => (
                            <TableRow key={index}>
                              <TableCell>{issue.error}</TableCell>
                              <TableCell className="text-muted-foreground">{issue.file}</TableCell>
                              <TableCell className="text-muted-foreground">{issue.line}</TableCell>
                              <TableCell>
                                <Badge className={getSeverityColor(issue.severity)}>
                                  {issue.severity}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      )}

      {/* AI Fix Results */}
      {aiFixResults.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">AI Fix Summary</h2>
          <Accordion type="single" collapsible className="w-full">
            {aiFixResults.map((fixReport) => {
              const audit = auditResults.find(a => a.id === fixReport.auditId);
              const repo = audit ? getRepositoryById(audit.repositoryId) : null;
              
              return (
                <AccordionItem key={fixReport.id} value={`fix-${fixReport.id}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-3">
                        <Wand2 className="w-4 h-4 text-green-400" />
                        <span className="font-medium">{repo?.name} fixes</span>
                        <Badge variant="secondary" className="bg-green-500">
                          {fixReport.fixes?.length || 0} fixes
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadFix(fixReport);
                          }}
                          title="Download fix report"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4 space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-muted-foreground">
                          Generated: {new Date(fixReport.appliedAt).toLocaleDateString()}
                        </p>
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          {fixReport.status || 'Generated'}
                        </Badge>
                      </div>
                      {fixReport.fixes?.map((fix: any, index: number) => (
                        <Card key={index} className="p-4 border-green-500/20">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-green-400 font-medium">{fix.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {fix.file}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{fix.description}</p>
                          <div className="bg-black p-3 rounded-lg border border-green-500/20">
                            <pre className="text-sm text-green-400 overflow-x-auto">
                              <code>{fix.code}</code>
                            </pre>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <p className="text-xs text-muted-foreground">Apply this fix to: {fix.file}</p>
                            <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Copy
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      )}
    </div>
  );
}
