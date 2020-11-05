import {Container, Flex, Spinner, VStack} from '@chakra-ui/core'
import React, { useEffect, useState } from 'react'
import NavBar from './components/navbar'
import Post from './components/post'
import db from './lib/firebase'

const App = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    //Hook to handle the real-time updating of posts

    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const _posts = []

        querySnapshot.forEach((doc) => {
          _posts.push({
            id: doc.id,
            ...doc.data()
          })
        })

        setPosts(_posts)
      })
  }, [])

  return (
    <>
      <NavBar />
      <Container maxW="md" centerContent p={8}>
        <VStack spacing={8} w="100%">
          {posts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </VStack>
      </Container>
    </>
  )
}

export default App;
