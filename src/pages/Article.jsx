import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import articleContent from './article-content'
import Articles from "../components/Articles"
import NotFound from "./NotFound"
import CommentsList from '../components/CommentsList'
import AddCommentForm from '../components/AddCommentForm'

const Article = () => {
  const { name } = useParams() 
  const article = articleContent.find((article) => article.name === name )
  const otherArticle = articleContent.filter(article => article.name !== name)
  const [articleInfo, setArticleInfo] = useState({ comments: [] })

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://localhost:3000/api/articles/${name}`)      
      const body = await result.json()
      setArticleInfo(body)
    };
    fetchData();
  }, [name])
  return (
    <>
        {article ? (
            <>
            <h1 className='sm:text-4xl text-2xl font-bold my-6 text-gray-900'>This is {article.title} article</h1>
            {article.content.map((paragraph, index)=> (
                <p key={index} className='mx-auto leading-relaxed text-base mb-4 '>{paragraph}</p>
            ))}
            <CommentsList comments={articleInfo.comments} />
            <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
            <h1 className='sm:text-2xl text-xl font-bold my-4 text-gray-900'>Other Article</h1>
            <div className='flex flex-wrap -m-4'>
              <Articles articles={otherArticle} />
            </div>
            
            </>
            ) : (
            <NotFound />
            )
        }
        
    </>
  )
}

export default Article