import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import "./Newstory.css"
const Newstory = () => {
    const [title,settitle] = useState("")
    const [content,setcontent] = useState("")
    const [name,setname] = useState("Aausaf alam")
    let token = (JSON.parse(localStorage.getItem("token")) != undefined)?JSON.parse(localStorage.getItem("token")): "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmUzZDc3ODI4YmQzNTU1MTk4OGM5OTQiLCJpYXQiOjE2NTkwOTkyNzIsImV4cCI6MTY1OTE4NTY3Mn0.XXA2yuX6hpELj24QezTG3FmIfUp1tKyJKqD5aXOM"
 
    
    const posts = () => {
         axios.post("http://localhost:8080/createPost",{
            title:title,
            content:content,
         },{
         headers:{
            'Content-Type' : 'application/json',
           token:token
         }}
         ).then((res)=>{
            console.log(res.data)
            if(res.data)
            {
               alert(res.data.message)
               settitle("")
               setcontent("")
            }
         }).catch((err)=>{
            console.log(err)
         })
    }

  return (
    <div className='newstory'>
    <div className="headernewstory">
      <img style={{marginLeft:"2vh"}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANMAAAA0CAYAAAAQRg3jAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAhdEVYdENyZWF0aW9uIFRpbWUAMjAyMjowNzoyOSAwOTozNDoyOS0F6ccAAASASURBVHhe7dzNK3xfHAfww2LkuRApwmQh8hAKSVmYIlFClIWsxEK2YukPmCyEksbCw2QhYkM2JCXPpVl4SDPKggWRp7i/Oed+5sv3OzNmxpzp3l+9X3W/5/OZufeuvL/nzu2eG6Y4MQAIWjiNABAkhAlAEoQJQBKECUAShAlAEoQJQBKECUAShAlAEoQJQBKECUAShAlAEoQJQBKECUAShAlAEoQJQBKECXTp/v6ejY+Ps5aWFpadnc3CwsL+bHl5eayzs5PNzs7S3r9zfn5OlSR8cSCAXnx8fCgDAwOKwWDgi1Z9bqmpqYrZbKajfbPZbMrg4KCSnJwsjm9oaFCmp6fp2+AgTKAb29vbSm5urltg/NlMJpNit9vpTJ69v78rVVVVHo9fXl6mvf7W2trqd9gQJtCFlZUVj3/kgWxZWVnK6ekpndFdd3e3x+P45ryUVK6vr2lP1cbGhvguISGBPvkZwgSa29nZUZy/hdz+wH+zGY1G5fb2ls78hc8unvb/vvX09NDeqr6+vj/fbW1t0afe4QYEaM45Y/D/1KkLzsXFBevt7aXui/MyjirvZmZmxI0Pl/X1daoY29/fp8o7hAk0NTw8zI6OjqiTw2q1soWFBeoYe3l5YUtLS9R5x4M0NTVFHWNXV1dUMXZ2dkaVdwgTaObz85OZzWbq5BoZGaGKscXFRfb6+krdzywWixgfHh7Y09OTqLnj42OqvEOYQDPz8/Ps7u6OOrk2NzfZycmJqHd3d8Xoj8PDQxGkm5sb+kTFLx99QZhAM2tra1SFhus3j91uF6O/HA6HW8j9mdkQJtDM3t4eVaFxcHAgRh6OQPDwfb8RwT0/P1PlHcIEmrHZbFSFxuXlpRh/MzM9Pj5Sp8LMBLr29vZGVWi4ZpdAZya+/78zEcIEumYwGKgKjaioKDGmpaWJ0V98/8jISOpUERERVHmHMIFmcnJyqAoNV4jS09PF6C9+XExMDHUqhAl0raSkhKrQKCoqEmOgMxMPX3x8PHWqf2cqTxAm0IzJZKIqNGpqasT4m5kpKSmJOhVmJtC1trY2lpiYSJ1cpaWlrLy8XNSVlZVi9EdZWRmLi4tjKSkp9InKaDRS5R3CBJoJDw9n/f391Mn1/bz19fV+XaZxrodkeaCio6NFzRUUFFDlHcIEmhoaGmKFhYXUydHc3Mw6OjqoUy/R+CzoC58lm5qaqGMsIyODKiaWzvuCMIHmJiYmxCwlA78cGxsbo+6LP7/P2tvbWWxsLHVfv7m44uJiqn6gLmsC0Nbq6mrQCwR9rbTt6uryeBzfMjMz3Za9Y6Ut/G8F8w6I2tpaxeFw0Jk84++AqKio8Hi81Wqlvf7G3wFhsVio+xnCBLoS6NuJ+Gw0OjpKR/vG307El6Pz2YYfX11drUxOTtK3wQnj/zhPCqAr/Lm6ubk5sUyDrzHi77jj78zjjyDl5+eLW991dXWssbGRjggcf9BW5lMYCBOAJLibByAJwgQgCcIEIAnCBCAJwgQgCcIEIAnCBCAJwgQgCcIEIAnCBCAFY/8B+hMBHYmz46oAAAAASUVORK5CYII=" alt="" />
      <p>
Draft in {name}</p>
<button onClick={()=>{
        posts()
     }}>Publish</button>
   <img className='tripledot' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFYAAAA8CAYAAAD8OU3LAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAJtSURBVHhe7ZqxsiFBFIbPbiQlQ0YoJBVKpR6BFxDyCkpGKCQkQ4SMEBEyRAjJ7P379lS5d+/eYvXZrWr/V6VmuudMUV9Nn3Omy4/rG0Kc89MeiWMoVgmKVYJilaBYJShWCYpVgmKVoFglKFYJilWCYpWgWCVeZnfreDzKcDiU9Xotp9NJotGoxONxyefzEgqFbJQ7XkLsbreTZrMpiURCUqmUhMNhuVwuMpvNZLPZSLFYlFgsZqMdAbE+cz6fr9Vq9drv9+3MR0ajkbmOOJd4n2PH47FZ9rlczs58JJvNmid5MBjYGTd4LxbLPZPJ2NHXID1st1s7coP3YlGokFO/A9eRa13ytFgstclkYkfvoAJjaaEC34KnB/MoHL7zlNhWqyW9Xk+63a45B5Bar9eNQFTixWJh5jHudDrmWKvVzJzPPCU2kAaCcyy9twprzgFaHXD79CLm89PsG0+JRdIPCM6Rr24b7qA/TCaT5ggQczvWAqkHvwUvAt+B64hDvDNs2/XXoA/E55bD4WD6xtVqZWfemU6nZt51z/gV+K5KpfLbb/gTiEM87nOBty8I5XL5Op/P7eg+EI/7XOB1u/XoHoDLPQOvxe73e9Of3vtBvCu83YRpNBpG1qPg9bZUKtnRE5iE8AIExSkonCiw2Hy5t7g9ykv927DdbstyuTQtIProdDothULBXnXLy/2NE2+GSBFY8pFIxM665+XE/iu87gr+JxSrBMUqQbFKUKwSFKsExSpBsUpQrBIUqwTFKkGxSlCsEhSrBMUqQbFKUKwSFKsExSpBsUpQrBIUqwTFKkGxSlCsEhSrBMWqIPILf0URy9eop9kAAAAASUVORK5CYII=" alt="" />
   <div className="img">
      <img src="https://cdn-images-1.medium.com/fit/c/32/32/0*QR6a33MHNjGS-Uc2" alt="" />
   </div>
    </div>
   <div className="box">
    <input type="text" value={title} onChange={(e)=>{
        settitle(e.target.value)
    }} placeholder="Title"/>
    <br />
    <textarea name="" id="" cols="30" rows="10" value={content} onChange={(e)=>{
        setcontent(e.target.value)
    }}  placeholder="Tell your story..."></textarea>
    

   </div>
    </div>

  )
}

export default Newstory