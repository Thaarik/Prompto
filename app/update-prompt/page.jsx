'use client'

import {useState,useEffect} from 'react'
import { useRouter,useSearchParams } from 'next/navigation'
import Form from '@components/Form';
const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id')
    const [submitting, setSubmitting]=useState(false); //are we currently submitting the form?
    const [post,setPost]=useState({ 
        prompt: '',
        tag: '',
    });
    useEffect(()=>{
        const getPromptDetails = async ()=>{
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }
        if(promptId) getPromptDetails() //only if promptId exists
    },[promptId])// to get the id from the params in the route, we use useSearchParams
    //exchange the create-prompt function to update-prompt function
    const updatePrompt = async (e)=>{
        e.preventDefault();//prevents the default action of the browser which isreloading the application
        setSubmitting(true);
        if(!promptId){
            return alert('Prompt ID not found')
        }
        try{
            //we are sending all the below data in the frontend to the below API endpoint though POST method.
            const response = await fetch(`/api/prompt/${promptId}`,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
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
        type='Edit'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt;

