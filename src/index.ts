import express from "express"
import fsp from "fs/promises"

const app = express()
const port = 4000

type Form = {
  feel: "positive" | "negative"
  detail: string
}

const userResponse: Array<Form> = []

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/form.html', async (req, res) => {
  const formFile = await fsp.readFile("./static/form.html", "utf-8") // HTML 문자열
  res.send(formFile)
})


app.post("/form", async (req, res) => {
  console.log(req.body)
  userResponse.push({
    feel: req.body["feel"] ?? "undefined",
    detail: req.body["detail"] ?? "undefined"
  })
  res.redirect("/form.html")
})

app.get("/form", (req, res) => {
  // 빈 문자 정의
  let output = ""
  // 종류 설명
  output += "feel,detail\n"
  for (const res of userResponse) {
    output += `${res.feel},${res.detail}\n`
  }
  res.send(output)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})