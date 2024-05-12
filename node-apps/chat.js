import express from "express";
import axios from "axios";
import OpenAI from "openai";
import bodyParser from "body-parser";

const openai = new OpenAI();

const app = express();
const port = 8080;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

let messages = []; // Initialize messages array

app.post("/", async (req, res) => {
  let message = {
    role: "user",
    content: req.body.content ? req.body.content : undefined,
  };
  console.log(req.body);
  if (message.content !== undefined) {
    messages.push(message);

    const completion = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-4-turbo",
    });

    if (completion.choices[0].message) {
      let receivedMsg = completion.choices[0].message;
      messages.push(receivedMsg);
      console.log(receivedMsg);
      res.send(receivedMsg.content);
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
