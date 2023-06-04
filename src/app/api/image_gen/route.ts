import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = body.word;
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    const image_url = response.data.data[0].url;
    // const image_url =
    //   "https://oaidalleapiprodscus.blob.core.windows.net/private/org-o6hwG5KjFD2I29hdj7xAdyGn/user-iX2rPHXNRsGlrgFw787uqkFS/img-sNuU8fi8wlpcRZnHIVdMbnZF.png?st=2023-06-04T08%3A40%3A11Z&se=2023-06-04T10%3A40%3A11Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-03T20%3A55%3A24Z&ske=2023-06-04T20%3A55%3A24Z&sks=b&skv=2021-08-06&sig=A4mVA3065DF34MMzwgooFLkPNeKjWFGd5xJfvWIjU50%3D";
    return NextResponse.json({
      messsage: "Success",
      data: image_url,
    });
  } catch (err) {
    return NextResponse.json({
      messsage: "Failed",
      data: err,
    });
  }
}
