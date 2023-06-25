'use client'

import {useState} from 'react'
import { useSession } from 'next-auth/react' //allow us to know which current user has logged in
import { useRouter } from 'next/navigation'
import Form from '@components/Form';
const CreatePrompt = () => {
    const router = useRouter();
    const {data: session} = useSession();
    const [submitting, setSubmitting]=useState(false); //are we currently submitting the form?
    const [post,setPost]=useState({ 
        prompt: '',
        tag: '',
    });
    const createPrompt = async (e)=>{
        e.preventDefault();//prevents the default action of the browser which isreloading the application
        setSubmitting(true);
        try{
            //we are sending all the below data in the frontend to the below API endpoint though POST method.
            const response = await fetch('/api/prompt/new',
            {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag:post.tag
                })
            })
            if(response.ok){
                router.push('/');
            }
        }catch(error){
            console.log(error)
        }finally{ //which is going to happen either way( try or catch, finally will happen)
            setSubmitting(false)
        }
    }
    return (
    <Form 
        type='Create'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt;

