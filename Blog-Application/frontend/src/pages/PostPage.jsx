import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Heart, Share2, Calendar, Clock, User } from "lucide-react"
import {Button} from "./ui/Button"
import { Badge } from "./ui/Badge"
import { PostsContext } from "../contexts/PostsContext"

const PostPage = () => {
    const {posts} = useContext(PostsContext)
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(0)

  useEffect(() => {
    setPost(posts.find((post)=>post._id==id))
  }, [id])
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Button
              onClick={() => navigate("/")}
              className="mb-8 bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-white/90"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
              <div className="text-center text-slate-600">
                <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
                <p>The blog post you're looking for doesn't exist.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button
          variant="outline"
            onClick={() => navigate("/")}
            className="mb-8 bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-white/90 border-0 shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>

          {/* Main Post Content */}
          <article className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
            {/* Post Header */}
            <div className="p-8 pb-6 border-b border-slate-200/50">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  {post.category}
                </Badge>
                {post.featured && (
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">Featured</Badge>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight text-balance">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-slate-600 mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {formatDate(post.createdAt)}
                  </span>
                </div>
              </div>

              {post.excerpt && <p className="text-xl text-slate-600 leading-relaxed text-pretty">{post.excerpt}</p>}
            </div>

            {/* Post Content */}
            <div className="p-8">
              <div className="prose prose-lg prose-slate max-w-none">
                <div className="text-slate-700 leading-relaxed whitespace-pre-wrap text-pretty">{post.content}</div>
              </div>
            </div>
          </article>

          {/* Related Posts Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Continue Reading</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Button
                onClick={() => navigate("/")}
                className="h-auto p-6 bg-white/80 backdrop-blur-sm text-left hover:bg-white/90 border-0 shadow-lg"
              >
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Explore More Posts</h3>
                  <p className="text-slate-600 text-sm">Discover more interesting articles and insights on our blog.</p>
                </div>
              </Button>

              <Button
                onClick={() => navigate("/create")}
                className="h-auto p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-left hover:from-indigo-600 hover:to-purple-700 border-0 shadow-lg text-white"
              >
                <div>
                  <h3 className="font-semibold mb-2">Write Your Own</h3>
                  <p className="text-indigo-100 text-sm">Share your thoughts and create your own blog post.</p>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostPage
