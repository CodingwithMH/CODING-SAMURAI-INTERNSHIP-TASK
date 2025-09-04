import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader } from "./ui/Card"
import { Button } from "./ui/Button"
import { Badge } from "./ui/Badge"
import { CalendarDays, Clock, User, LogOut, Star, TrendingUp, Sparkles } from "lucide-react"
import axios from "axios"
import { UserContext } from "../contexts/UserContext"
import { PostsContext } from "../contexts/PostsContext"

const mockPosts = [
  {
    id: "1",
    title: "Getting Started with Modern Web Development",
    excerpt: "Explore the latest trends and best practices in web development, from React to Next.js and beyond.",
    content: "Full content here...",
    author: "Sarah Chen",
    publishedAt: "2024-01-15",
    readTime: 8,
    category: "Development",
    featured: true,
  },
  {
    id: "2",
    title: "The Art of Minimalist Design",
    excerpt: "Discover how less can be more when it comes to creating beautiful, functional user interfaces.",
    content: "Full content here...",
    author: "Marcus Johnson",
    publishedAt: "2024-01-12",
    readTime: 6,
    category: "Design",
    featured: false,
  },
  {
    id: "3",
    title: "Building Scalable Applications",
    excerpt: "Learn the principles and patterns that help create applications that grow with your business.",
    content: "Full content here...",
    author: "Elena Rodriguez",
    publishedAt: "2024-01-10",
    readTime: 12,
    category: "Architecture",
    featured: true,
  },
  {
    id: "4",
    title: "The Future of AI in Development",
    excerpt: "How artificial intelligence is transforming the way we write code and build applications.",
    content: "Full content here...",
    author: "David Kim",
    publishedAt: "2024-01-08",
    readTime: 10,
    category: "Technology",
    featured: false,
  },
]

export default function BlogPage() {
    const {logout,user}=useContext(UserContext)
    const {posts,loading}=useContext(PostsContext)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const navigate = useNavigate()

  const handleLogout =async () => {
    logout();
  }

  const handleWriteStory = () => {
    if (user) {
      navigate("/create")
    } else {
      navigate("/sign-in")
    }
  }

  const categories = ["All", ...Array.from(new Set(posts.map((post) => post.category)))]
  const filteredPosts = selectedCategory === "All" ? posts : posts.filter((post) => post.category === selectedCategory)

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100/50">
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-600 to-indigo-600 bg-clip-text text-transparent">
                  BlogSpace
                </h1>
              </div>
              <p className="text-slate-600 text-lg font-medium">
                Discover stories, thinking, and expertise from writers on any topic
              </p>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Welcome back,</p>
                    <p className="font-semibold text-slate-900">{user.username}</p>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-slate-600 to-indigo-600 hover:from-slate-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    onClick={handleWriteStory}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Write a Story
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="border-slate-200 text-slate-700 hover:bg-slate-50 bg-transparent backdrop-blur-sm"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/sign-in")}
                    className="border-slate-200 text-slate-700 hover:bg-slate-50 backdrop-blur-sm"
                  >
                    Sign In
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-slate-600 to-indigo-600 hover:from-slate-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    onClick={handleWriteStory}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Write a Story
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap gap-3 mb-12 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-4 w-full">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-slate-900">Explore by Category</h2>
          </div>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-gradient-to-r from-slate-600 to-indigo-600 hover:from-slate-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {featuredPosts.length > 0 && (
          <section className="mb-16 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-slate-600 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Featured Stories</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <Card
                  key={post._id}
                  className="group hover:shadow-2xl transition-all duration-500 border-slate-200/50 bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1"
                  onClick={() => navigate(`/post/${post.id}`)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-0 backdrop-blur-sm">
                        {post.category}
                      </Badge>
                      <Badge className="bg-gradient-to-r from-indigo-600 to-slate-600 text-white border-0 shadow-md">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:bg-gradient-to-r group-hover:from-slate-600 group-hover:to-indigo-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600 text-lg leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200/30">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-indigo-600 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-slate-900">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                          <CalendarDays className="w-4 h-4" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-indigo-600 font-medium">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        <section className="animate-fade-in-up">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-400 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">
              {featuredPosts.length > 0 ? "More Stories" : "Latest Stories"}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <Card
                key={post._id}
                id={post._id}
                className="group hover:shadow-xl transition-all duration-500 border-slate-200/50 bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1"
                onClick={() => navigate(`/post/${post.id}`)}
                style={{ animationDelay: `${(index + featuredPosts.length) * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-0 backdrop-blur-sm">
                      {post.category}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:bg-gradient-to-r group-hover:from-slate-600 group-hover:to-indigo-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600 leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200/30">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-gradient-to-br from-slate-600 to-indigo-600 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-white" />
                      </div>
                      <span className="font-medium text-slate-900 text-sm">{post.author}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <CalendarDays className="w-4 h-4" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-600 text-xl font-medium">No posts found in this category.</p>
            <p className="text-slate-500 mt-2">Try selecting a different category or check back later.</p>
          </div>
        )}
      </main>
    </div>
  )
}
