'use client'

import {useState, useEffect} from 'react'
import { useSearchParams } from 'next/navigation'
import Profile from '@components/Profile'
const ProfilePage = ({params}) => {
    const [posts, setPosts] = useState([]);
    const searchParams = useSearchParams();
    const username = searchParams.get('name');

    useEffect(()=>{
        const fetchPosts = async ()=>{
            const response = await fetch(`/api/users/${params?.id}/posts`)
            const data =await response.json()
            console.log(data)
            setPosts(data)
        }
        if(params?.id){
            fetchPosts()
        }
    },[params._id])
  return (
    <Profile
      name={username}
      desc={`Welcome to ${username} profile page`}
      data={posts}
      
    />
  )
}

export default ProfilePage
