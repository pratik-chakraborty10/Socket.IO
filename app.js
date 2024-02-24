import express from "express";
import { Server } from "socket.io";
import {createServer} from "http";
import cors from 'cors';

const port=8000
const app=express();
const server=createServer(app)

const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true,
    }
});//create circuit io instance

app.use(
    cors({
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true,

}));//middleware for resolve cross origin policy

io.on("connection",(socket)=>{
    console.log("user connected",socket.id);

    socket.on("message",(room,message)=>{
        console.log({room,message})
        // io.emit("receive-message",data);
        //socket.broadcast.emit("receive-message",data)
        io.to(room).emit("receive-message",message);
    })
    //console.log("ID: ",socket.id)
    // socket.emit("welcome",`Welcome to the server.`)//message going to all sockets
    // socket.broadcast.emit("welcome",`${socket.id} joined the server`)//message going to all sockets except who is broadcasting
    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id)
    })


})

app.get("/",(req,res)=>{
    res.send("hello world")
})


server.listen(port,()=>{
    console.log(`server listening on ${port}`)
})