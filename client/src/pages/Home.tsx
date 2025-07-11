import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Github, Play, Search, Bot, TrendingUp, Users, Code, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            AI-Powered SEO Audits
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect your GitHub repos and let our AI analyze your code for SEO issues. Get instant fixes and improve your site's search rankings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/dashboard">
              <Button size="lg" className="glow-effect">
                <Github className="mr-2 h-4 w-4" />
                Connect GitHub
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>
          
          {/* Code Block Animation */}
          <Card className="p-6 text-left max-w-2xl mx-auto bg-card">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">SEO Fix Suggestion</span>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <pre className="text-sm text-green-400 overflow-x-auto">
              <span className="text-muted-foreground">// Before</span>
              <br />
              <span className="text-red-400">-  &lt;title&gt;Page&lt;/title&gt;</span>
              <br />
              <br />
              <span className="text-muted-foreground">// After</span>
              <br />
              <span className="text-green-400">+  &lt;title&gt;Best SEO Practices Guide | Company&lt;/title&gt;</span>
              <br />
              <span className="text-green-400">+  &lt;meta name="description" content="Learn..."&gt;</span>
            </pre>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-card/20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center">
              <Github className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Connect GitHub</h3>
              <p className="text-muted-foreground">Link your GitHub account and select repositories to audit</p>
            </Card>
            <Card className="p-6 text-center">
              <Search className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Run Audit</h3>
              <p className="text-muted-foreground">Our AI scans your code for SEO issues and best practices</p>
            </Card>
            <Card className="p-6 text-center">
              <Bot className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-muted-foreground">Get intelligent suggestions and automated fixes</p>
            </Card>
            <Card className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-muted-foreground">Monitor your SEO improvements over time</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">See It In Action</h2>
          <Card className="p-8 max-w-4xl mx-auto">
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
              <Play className="w-16 h-16 text-primary cursor-pointer hover:text-primary/80 transition-colors" />
            </div>
            <p className="text-muted-foreground mt-4">Watch how Crawlin.io analyzes your code and provides SEO fixes in minutes</p>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-card/20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">What Developers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "John Smith",
                role: "Senior Developer at TechCorp",
                avatar: "JS",
                quote: "Crawlin.io saved me hours of manual SEO auditing. The AI suggestions are spot-on and easy to implement."
              },
              {
                name: "Alice Davis",
                role: "Frontend Lead at StartupXYZ",
                avatar: "AD",
                quote: "The GitHub integration is seamless. We've improved our SEO scores by 40% in just two weeks."
              },
              {
                name: "Mike Rodriguez",
                role: "Full-Stack Developer",
                avatar: "MR",
                quote: "Finally, an SEO tool that understands code. The automated fixes are a game-changer for our workflow."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                    <span className="font-semibold">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.quote}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8">
              <h3 className="text-2xl font-semibold mb-4">Starter</h3>
              <div className="text-4xl font-bold mb-6">$9<span className="text-lg text-muted-foreground">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Up to 3 repositories</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> 50 audits/month</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Basic AI fixes</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Email support</li>
              </ul>
              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </Card>
            <Card className="p-8 border-2 border-primary relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                Most Popular
              </Badge>
              <h3 className="text-2xl font-semibold mb-4">Pro</h3>
              <div className="text-4xl font-bold mb-6">$29<span className="text-lg text-muted-foreground">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Up to 15 repositories</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> 200 audits/month</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Advanced AI fixes</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Priority support</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Custom reports</li>
              </ul>
              <Button className="w-full">
                Get Started
              </Button>
            </Card>
            <Card className="p-8">
              <h3 className="text-2xl font-semibold mb-4">Enterprise</h3>
              <div className="text-4xl font-bold mb-6">$99<span className="text-lg text-muted-foreground">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Unlimited repositories</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Unlimited audits</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Premium AI fixes</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> 24/7 support</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Team collaboration</li>
              </ul>
              <Button variant="outline" className="w-full">
                Contact Sales
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-4 bg-card/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">About Crawlin.io</h2>
              <p className="text-muted-foreground mb-6">
                We're a team of developers who understand the challenges of maintaining SEO best practices while building modern web applications. Our AI-powered platform bridges the gap between development and SEO optimization.
              </p>
              <p className="text-muted-foreground mb-8">
                Built by developers, for developers. We believe that SEO should be integrated into the development workflow, not added as an afterthought.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm">10,000+ developers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Code className="w-4 h-4 text-primary" />
                  <span className="text-sm">50,000+ repos audited</span>
                </div>
              </div>
            </div>
            <Card className="p-8 text-center">
              <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center mb-4">
                <Users className="w-16 h-16 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Our team working hard to make SEO simple</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
