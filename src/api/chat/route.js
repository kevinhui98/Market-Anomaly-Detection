import { NextResponse } from "next/server";
import { OpenAI } from "openai";

export async function POST(req) {
    const client = new OpenAI({
        apiKey: process.env.GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1"
    });
    const data = await req.text()
    const completion = await client.chat.completions.create({
        model: "llama-3.1-70b-versatile",
        messages: [
            { "role": "system", "content": "You are an expert at providing answers about stocks. Please answer my question provided." },
            { "role": "user", "content": data }
        ],
        stream: true,
    })
    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();
            try {
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content
                    if (content) {
                        const text = encoder.encode(content);
                        controller.enqueue(text);
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                controller.close();
            }
        }
    });
    return new Response(stream, {
        headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "no-store"
        }
    });
}