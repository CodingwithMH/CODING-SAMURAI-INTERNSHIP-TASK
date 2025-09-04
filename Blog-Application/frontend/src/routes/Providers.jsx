import React from 'react'
import {createBrowserRouter
 } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/Signup'
import Home from '../pages/Home'
import CreateBlog from '../pages/CreateBlog'
import PostPage from '../pages/PostPage'
const routes=createBrowserRouter([{
    path:'/',
    element: <Home/>
},
{
    path:'sign-in',
    element: <SignIn/>
},
{
    path:'sign-up',
    element: <SignUp/>
},
{
    path:'create',
    element: <CreateBlog/>
},
{
    path:'post/:id',
    element: <PostPage/>
},
])

export default routes
