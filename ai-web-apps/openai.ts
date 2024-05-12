import OpenAI from "openai";

const openClient = new OpenAI(process.env.OPENAI_KEY as any);

export default { openClient };