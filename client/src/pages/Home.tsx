import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Github, Play, Search, Bot, TrendingUp, Users, Code, CheckCircle, Zap, Target, BarChart3, Shield, GitBranch, Wand2, Eye, FileText, Gauge, AlertTriangle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden hero-section py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                AI-Powered SEO Auditing
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Optimize Your Code for{" "}
                <span className="gradient-text">Better SEO</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Connect your GitHub repositories and get AI-powered SEO recommendations 
                to improve your website's search engine visibility.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="glow-effect" onClick={() => window.location.href = '/api/login'}>
                  <Github className="mr-2 h-5 w-5" />
                  Connect GitHub
                </Button>
                <Button size="lg" variant="outline">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free for open source</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>
            
            {/* Code Animation */}
            <div className="relative">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-primary/20">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <Badge variant="secondary">SEO Fix</Badge>
                  </div>
                  <div className="bg-black p-4 rounded-lg font-mono text-sm">
                    <div className="text-red-400">- &lt;title&gt;My Site&lt;/title&gt;</div>
                    <div className="text-green-400">+ &lt;title&gt;My Site - Professional Web Development&lt;/title&gt;</div>
                    <div className="text-green-400 mt-2">+ &lt;meta name="description" content="..."&gt;</div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">AI-generated fix</span>
                    <Badge className="bg-green-500">Applied</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Features
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Everything you need for SEO success</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive SEO auditing and optimization tools designed specifically for developers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="feature-card blue card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <GitBranch className="w-6 h-6 text-primary feature-icon" />
                </div>
                <CardTitle>GitHub Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Seamlessly connect your GitHub repositories and audit your code directly from your workflow.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card purple card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Wand2 className="w-6 h-6 text-purple-600 feature-icon" />
                </div>
                <CardTitle>AI-Powered Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get intelligent SEO recommendations powered by advanced AI that understands your code structure.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card green card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-green-600 feature-icon" />
                </div>
                <CardTitle>Comprehensive Audits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Detailed analysis of meta tags, titles, structured data, and other critical SEO elements.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card blue card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-blue-600 feature-icon" />
                </div>
                <CardTitle>Real-time Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Monitor your SEO performance over time with detailed reports and trend analysis.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card purple card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-orange-600 feature-icon" />
                </div>
                <CardTitle>Automated Fixes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get ready-to-apply code suggestions that fix SEO issues automatically.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card green card-hover">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-emerald-600 feature-icon" />
                </div>
                <CardTitle>Best Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Learn SEO best practices with detailed explanations and implementation guides.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              How It Works
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Simple 4-step process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started with SEO optimization in minutes, not hours
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Github className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Connect GitHub</h3>
              <p className="text-muted-foreground">
                Link your GitHub account and select repositories to audit
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gauge className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Run Audit</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your code for SEO issues and opportunities
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Review Issues</h3>
              <p className="text-muted-foreground">
                Get detailed reports with prioritized issues and recommendations
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wand2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">4. Apply Fixes</h3>
              <p className="text-muted-foreground">
                Implement AI-generated fixes to improve your SEO score
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Pricing
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Choose your plan</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free and scale as your projects grow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <div className="text-3xl font-bold">$0<span className="text-lg text-muted-foreground">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>5 repositories</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Basic SEO audits</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Community support</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Get Started</Button>
              </CardContent>
            </Card>

            <Card className="card-hover border-2 border-primary relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                Most Popular
              </Badge>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <div className="text-3xl font-bold">$29<span className="text-lg text-muted-foreground">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Unlimited repositories</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Advanced AI analysis</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Custom integrations</span>
                  </li>
                </ul>
                <Button className="w-full glow-effect">Start Free Trial</Button>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <div className="text-3xl font-bold">Custom</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Dedicated support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Custom deployment</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>SLA guarantee</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                About Crawlin.io
              </Badge>
              <h2 className="text-4xl font-bold mb-6">
                Built by developers, for developers
              </h2>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                We understand the challenges of maintaining SEO best practices while focusing on code quality. 
                That's why we created Crawlin.io - to automate SEO optimization so you can focus on what you do best.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <span>Trusted by 10,000+ developers worldwide</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Code className="w-4 h-4 text-primary" />
                  </div>
                  <span>Integrated with popular frameworks and tools</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <span>Enterprise-grade security and privacy</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Developer working on code"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 tech-gradient text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to optimize your SEO?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who trust Crawlin.io for their SEO optimization needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100" onClick={() => window.location.href = '/api/login'}>
              <Github className="mr-2 h-5 w-5" />
              Get Started Free
            </Button>
            <Button size="lg" variant="ghost" className="text-white border-white hover:bg-white/10">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}