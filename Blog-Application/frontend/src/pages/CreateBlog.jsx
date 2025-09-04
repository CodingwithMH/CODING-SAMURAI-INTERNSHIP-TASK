import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"
import { Button } from "./ui/Button"
import { Badge } from "./ui/Badge"
import { UserContext } from "../contexts/UserContext"
import axios from "axios"
// import { getCurrentUser, logout } from "../lib/auth"

const CreateBlog = () => {
  const {user,logout}=useContext(UserContext);
  const navigate = useNavigate()
  const [isPreview, setIsPreview] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "Technology",
    excerpt: "",
    content: "",
    featured: false,
  })
useEffect(()=>{
},[])
//   useEffect(() => {
//     const currentUser = getCurrentUser()
//     if (!currentUser) {
//       navigate("/auth/login")
//       return
//     }
//     setUser(currentUser)
//     setFormData((prev) => ({ ...prev, author: currentUser.name }))
//   }, [navigate])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    if (!formData.title || !formData.content || !formData.excerpt) {
      alert("Please fill in all required fields")
      return
    }

    const posts = JSON.parse(localStorage.getItem("blogPosts") || "[]")

    posts.unshift(formData)
    try {
        const res = await axios.post("http://localhost:3000/api/post/create",formData, {
          withCredentials: true,
        });
        
        navigate("/")
      } catch (err) {
        console.log('Error While Creating Post', err)
      }
  }

  const handleLogout = async() => {
    const res=await logout()
    console.log('first', res.data)
  }

  if (!user) {
    return null
  }

  const categories = ["Technology", "Design", "Business", "Lifestyle", "Travel", "Food","Other"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-blue-900/30 to-indigo-900/50"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate("/")}
                  className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-300 transition-all duration-300"
                >
                  BlogSpace
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-white/80 text-sm">Welcome, {user.username}</span>
                <Button
                  onClick={handleLogout}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-400/30"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Create New Post
            </h1>
            <p className="text-white/70">Share your thoughts with the world</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">
              <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    Post Details
                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        onClick={() => setIsPreview(false)}
                        className={`text-xs px-3 py-1 ${
                          !isPreview
                            ? "bg-blue-500/30 text-blue-300 border-blue-400/30"
                            : "bg-white/10 text-white/70 border-white/20"
                        }`}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setIsPreview(true)}
                        className={`text-xs px-3 py-1 ${
                          isPreview
                            ? "bg-blue-500/30 text-blue-300 border-blue-400/30"
                            : "bg-white/10 text-white/70 border-white/20"
                        }`}
                      >
                        Preview
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm"
                        placeholder="Enter your post title..."
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">Author</label>
                        <input
                          type="text"
                          name="author"
                          value={formData.author}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm"
                          placeholder="Author name"
                        />
                      </div>

                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">Category</label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm"
                        >
                          {categories.map((category) => (
                            <option key={category} value={category} className="bg-slate-800">
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Excerpt *</label>
                      <textarea
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm resize-none"
                        placeholder="Brief description of your post..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Content *</label>
                      <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        rows={12}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm resize-none"
                        placeholder="Write your post content here..."
                        required
                      />
                    </div>

                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="featured"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-400 bg-white/10 border-white/20 rounded focus:ring-blue-400/50"
                      />
                      <label htmlFor="featured" className="text-white/80 text-sm">
                        Mark as featured post
                      </label>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        Publish Post
                      </Button>
                      <Button
                        type="button"
                        onClick={() => navigate("/")}
                        className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20 py-3 px-6 rounded-lg transition-all duration-300"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Preview Section */}
            <div className="space-y-6">
              <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white">Live Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  {isPreview ? (
                    <div className="space-y-4">
                      {formData.title && (
                        <h2 className="text-2xl font-bold text-white leading-tight">{formData.title}</h2>
                      )}

                      <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
                        {formData.author && <span>By {formData.author}</span>}
                        <span>•</span>
                        <span>
                          {new Date().toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        {formData.content && (
                          <>
                            <span>•</span>
                            <span>{Math.ceil(formData.content.split(" ").length / 200)} min read</span>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">{formData.category}</Badge>
                        {formData.featured && (
                          <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30">Featured</Badge>
                        )}
                      </div>

                      {formData.excerpt && <p className="text-white/80 leading-relaxed">{formData.excerpt}</p>}

                      {formData.content && (
                        <div className="prose prose-invert max-w-none">
                          <div className="text-white/90 leading-relaxed whitespace-pre-wrap">{formData.content}</div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-white/50">
                      <div className="text-4xl mb-4">📝</div>
                      <p>Click "Preview" to see how your post will look</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default CreateBlog
