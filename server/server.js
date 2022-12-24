import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

//configuration
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

//init the express app

const app = express();

//setting up middlewares
app.use(cors()); //cross origin requests
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({ message: "Hello from AutoCode" });
});

//with get we cant get a lot of data from front end but post allows us to have a body/pay load

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0, // more value more rise
      max_tokens: 3000, //max no. of token in a completion longer it is the longer response it can give
      top_p: 1,
      frequency_penalty: 0.5, //not gonna repeat similar thing
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

//making sure server always listens
app.listen(5000, () =>
  console.log("Server is rununning on port http://localhost:5000/")
);
