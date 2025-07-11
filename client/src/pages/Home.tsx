import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Github, Play, Search, Bot, TrendingUp, Users, Code, CheckCircle, Zap, Target, BarChart3, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Announcement Bar */}
      <div className="bg-blue-600 text-white py-3 px-4">
        <div className="container mx-auto text-center">
          <span className="text-sm">
            🚀 We raised another $225M to build the future of AI Agents
          </span>
          <Button variant="ghost" size="sm" className="ml-2 text-white hover:text-blue-100">
            Read more
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Optimize Your Website with the Best SEO Tools
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Optimize the performance of your website and business by using SEO tools that are easy to apply
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                  Get Started Free
                </Button>
                <Button size="lg" variant="ghost" className="text-white border-white hover:bg-white/10">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Video
                </Button>
              </div>
              <p className="text-blue-100">
                Want instant access? <span className="text-white font-semibold cursor-pointer hover:underline">Request Demo</span>
              </p>
            </div>
            
            {/* Hero Image/Dashboard Preview */}
            <div className="relative">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Search className="w-5 h-5 text-blue-300" />
                      <span className="text-white font-medium">Keyword Explorer</span>
                    </div>
                    <Badge className="bg-green-500 text-white">Active</Badge>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-sm text-blue-100 mb-2">The Rise of AI: Replacing Humanity?</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-200">Article Title</span>
                        <span className="text-white">✓</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-200">Article meta</span>
                        <span className="text-white">✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Various software functions can make your work easier</h2>
          </div>
          
          {/* Feature Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-8 border-b">
              <button className="pb-4 px-2 border-b-2 border-blue-600 text-blue-600 font-semibold">SEO</button>
              <button className="pb-4 px-2 text-gray-500 hover:text-gray-700">Advertising</button>
              <button className="pb-4 px-2 text-gray-500 hover:text-gray-700">Social Media</button>
              <button className="pb-4 px-2 text-gray-500 hover:text-gray-700">Market Research</button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 border-l-4 border-l-blue-600">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <span className="text-blue-600 font-bold">01</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Grow organic traffic</h3>
                  <p className="text-gray-600 mb-4">
                    Improve your writing performance and increase the number of people who see your work without using bots or other illegal tools.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Keyword Explorer</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">AI Writing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Search Topics</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-purple-600">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <span className="text-purple-600 font-bold">02</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Make it easier with AI</h3>
                  <p className="text-gray-600 mb-4">
                    Leverage artificial intelligence to automate your SEO tasks and get better results with less effort.
                  </p>
                  <Card className="bg-gray-50 p-4">
                    <div className="text-sm text-gray-600 mb-2">Total Search Volume</div>
                    <div className="text-2xl font-bold text-blue-600">2182</div>
                    <div className="text-sm text-green-500">+203 last Month</div>
                  </Card>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-green-600">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <span className="text-green-600 font-bold">03</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Search related topics</h3>
                  <p className="text-gray-600">
                    Discover trending topics and keywords that your audience is searching for to create better content.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Cool Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-600">COOL FEATURES</Badge>
              <h2 className="text-4xl font-bold mb-6">
                Some superior features really help you in increasing traffic
              </h2>
              <p className="text-gray-600 mb-8">
                Optimize the performance of your website and business by using SEO tools that are easy to apply and get extraordinary benefits.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Title Suggestion</h3>
                    <p className="text-gray-600 text-sm">Get AI-powered title suggestions that rank better</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Topic Discovery</h3>
                    <p className="text-gray-600 text-sm">Unleash hundreds of laser-targeted clustered topics</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Search className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Search Keyword</h3>
                    <p className="text-gray-600 text-sm">Beyond mere numbers for months of content creation</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="text-right mb-2">
                  <Badge className="bg-blue-100 text-blue-600">Most Views On</Badge>
                </div>
                <div className="text-2xl font-bold">12,000</div>
                <div className="text-sm text-gray-500">Views Growth</div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center justify-center h-24 bg-green-50 rounded-lg mb-2">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <div className="text-sm font-medium">No Plagiarism Detected</div>
              </Card>
              
              <Card className="p-4 col-span-2">
                <h3 className="font-semibold mb-2">Plagiarism Detector</h3>
                <p className="text-sm text-gray-600">Beyond mere numbers for months of content creation.</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-600">PRICING PLAN</Badge>
            <h2 className="text-4xl font-bold mb-4">
              Enjoy all our features by subscribing regularly
            </h2>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">100% Safe for transaction</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Money back guarantee</span>
              </div>
            </div>
            
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-lg p-1 flex">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Monthly</button>
                <button className="px-4 py-2 text-gray-600">Yearly</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <Card className="p-8 relative">
              <h3 className="text-xl font-semibold mb-4">Basic</h3>
              <p className="text-gray-600 text-sm mb-6">
                For a professional person who is starting a business, and on a large scale, this a package
              </p>
              <div className="text-3xl font-bold mb-6">
                $28<span className="text-lg text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Basic SEO tools</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Unlock other features</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Limited keyword</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Basic research</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">General support</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Choose Plan
              </Button>
            </Card>

            {/* Pro Plan */}
            <Card className="p-8 relative border-2 border-blue-600 bg-gradient-to-b from-blue-50 to-white">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                Best plan
              </Badge>
              <h3 className="text-xl font-semibold mb-4">Pro</h3>
              <p className="text-gray-600 text-sm mb-6">
                For a professional person who is running a business, and on a large scale, this a package
              </p>
              <div className="text-3xl font-bold mb-6">
                $70<span className="text-lg text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Advanced SEO tools</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Unlock all features</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Unlimited keyword</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Advanced research</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Premium support</span>
                </li>
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Choose Plan
              </Button>
            </Card>

            {/* Enterprise Plan */}
            <Card className="p-8 relative">
              <h3 className="text-xl font-semibold mb-4">Enterprise</h3>
              <p className="text-gray-600 text-sm mb-6">
                For a professional person of business, and on a large scale, this a package
              </p>
              <div className="text-3xl font-bold mb-6">
                $28<span className="text-lg text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">General SEO tools</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Unlock other features</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Unlimited keyword</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">General research</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Medium support</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Choose Plan
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to optimize your website?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who trust Crawlin.io for their SEO optimization needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Github className="mr-2 h-5 w-5" />
              Connect GitHub
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