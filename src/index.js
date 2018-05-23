import express from 'express'
import fs from 'fs'
const app = express()
const porta = process.env.PORT || 5400

app.use(express.static('public'))

app.post('/upload', (req, res)=>{
  setTimeout(()=>{
    let nFN = new Date().toJSON().split('T')[0].replace(/-|:/g, '_')
    +'.'+Math.ceil(Math.random()*10000)+'n.'+req.headers['content-type'].split('/')[1]
    const file = fs.createWriteStream(`./public/upload/${nFN}`)

    req.on('data', chunk => {
      file.write(chunk)
    })

    req.on('end', () =>{
      file.end()
      res.send({
        ok:true,
        url: `/upload/${nFN}`
      })
      nFN = null
    })
  }, 100)
})

app.listen(porta, (e) =>{

  if(e)
    console.log(e)

  else
    console.log(`Running on Port ${porta}`)

})

app.post('/admin/home', (req, res)=>{
  console.log(req.body)
})

export default app
