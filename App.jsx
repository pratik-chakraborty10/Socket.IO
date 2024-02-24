import React, { useEffect, useMemo } from 'react'
import {Socket, io} from 'socket.io-client'
import { Button, Container, TextField, Typography } from '@mui/material'
import { useState } from 'react'

const App=()=> {
  const socket=useMemo(()=>io("http://localhost:8000"),[])//url of backend server

  const[message,setmessage]=useState(" ")
  const[room,setroom]=useState(" ")
  const[socketID,setsocketID]=useState(" ")
  const[messages,setallmessages]=useState([])

  console.log(messages)

  const handleSubmit=(e)=>{
    e.preventDefault();
    socket.emit("message",{message,room})
    setmessage("")

  }

  useEffect(()=>{
    socket.on("connect",()=>{
      setsocketID(socket.id)
      console.log("connected",socket.id)

    })

    socket.on("receive-message",(data)=>{
      console.log(data)
      setallmessages((messages)=>{[...messages,data]})
    })

    return ()=>{
      socket.disconnect()
    }
  },[])

  socket.on("welcome",(s)=>{
     console.log(s)
  })
  return (
   <Container maxWidth="sm">
   
    <Typography variant='h1' component="div" gutterBottom>
      welcome to socket.io
    </Typography>

    <Typography variant='h2' component="div" gutterBottom>
    {socketID}
    /</Typography>


    <form onSubmit={handleSubmit}>
      <TextField 
      value={message} 
      onChange={(e)=>setmessage(e.target.value)} 
      id='outlined-basic'
      label="Message"
      variant='outlined'

      />

<TextField 
      value={room} 
      onChange={(e)=>setroom(e.target.value)} 
      id='outlined-basic'
      label="Room"
      variant='outlined'

      />


      <Button type='submit' variant='contained' color='primary'>send</Button>
    </form>
   </Container>
  )
}

export default App
