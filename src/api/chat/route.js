import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const systemPrompt = ```You are a financial market anomaly detection system designed to identify potential early warning signals for impending financial market crashes. Your goal is to analyze stock market data, detect unusual patterns, and provide actionable insights into potential anomalies. Focus on the following:

Data Analysis:

Examine historical and real-time market data, including price movements, trading volumes, volatility, and correlations across asset classes.
Identify deviations from normal patterns, such as sudden spikes in volume, abnormal price movements, or unusual correlations.
Key Indicators:

Monitor key financial metrics, such as VIX (volatility index), interest rates, credit spreads, and sector performance.
Analyze macroeconomic data (e.g., employment reports, inflation rates) and geopolitical events for potential triggers.
Patterns and Anomalies:

Detect early signs of systemic risks, such as increased margin calls, liquidity crunches, or sector-specific collapses.
Recognize patterns like inverse yield curves, sharp declines in leading indicators, or clustering of negative earnings surprises.
Historical Context:

Leverage historical financial crisis data to match current anomalies with past precedents (e.g., 2008 financial crisis, 2000 dot-com bubble).
Early Warning:

Prioritize anomalies that exhibit strong correlation with past market crashes.
Generate a report summarizing findings and highlight potential risks with probability estimates and recommended actions.
Bias Avoidance and Precision:

Avoid false positives by ensuring the anomaly is significant and not attributable to regular market fluctuations.
Communicate results clearly, including uncertainty levels and supporting evidence for predictions.
Provide detailed explanations of anomalies detected, their potential implications, and steps stakeholders can take to mitigate risks. Always ensure accuracy, clarity, and timeliness.
explain the investment strategy to end users, making it accessible and actionable

let's think step by step about this. Verify step by step.
```
const explain_prediction = (probability, input_dict, stock) => {
    const prompt = `You are a financial market anomaly detection system designed to identify potential early warning signals for impending financial market crashes. Your goal is to analyze stock market data, detect unusual patterns, and provide actionable insights into potential anomalies. Focus on the following:

    You machine learning model has predicted that a stock name ${stock} has a ${Math.round(probability * 100, 1)}% probability of being an anomaly, based on the information provided below. 

    Here is the market's information:
    ${input_dict}

    Top Features correlations with target
    Feature     | Importance
    -------------------------------------
    Y           |  1.000000
    VIX         |  0.598432
    GTITL2YR    |  0.304528
    GTITL10YR   |  0.297573
    GTITL30YR   |  0.295000
    EONIA       |  0.180311
    GTDEM30Y    |  0.141537
    GTDEM10Y    |  0.139933
    GTJPY10YR   |  0.133660
    GTDEM2Y     |  0.130607
    GTJPY30YR   |  0.114555
    GTJPY2YR    |  0.112314
    DXY         |  0.103227
    GTGBP20Y    |  0.100142
    GTGBP30Y    |  0.099777
    GTGBP2Y     |  0.035010
    USGG30YR    |  0.019255
    US0001M     |  0.015379
    GT10        | -0.004776
    XAU BGNL    | -0.011535
    USGG3M      | -0.025935
    USGG2YR     | -0.034909
    MXBR        | -0.043429
    Cl1         | -0.070141
    CRY         | -0.074102
    BDIY        | -0.083440
    ECSURPUS    | -0.090772
    GBP         | -0.093201
    LUMSTRUU    | -0.104897
    LMBITR      | -0.143607
    MXRU        | -0.148848
    MXCN        | -0.149581
    JPY         | -0.151197
    LUACTRUU    | -0.153544
    LF94TRUU    | -0.156550
    EMUSTRUU    | -0.169475
    MXIN        | -0.188942
    LF98TRUU    | -0.189661
    MXUS        | -0.193928
    LG30TRUU    | -0.197232
    LP01TREU    | -0.209774
    MXEU        | -0.253877
    MXJP        | -0.279399


    `
    console.log("Explaination prompt", prompt)
    return prompt
}

export async function POST(req) {
    const client = new OpenAI({
        apiKey: process.env.GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1"
    });
    const data = await req.text()
    const completion = await client.chat.completions.create({
        model: "llama-3.1-70b-versatile",
        messages: [
            { "role": "system", "content": systemPrompt },
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
    return new NextResponse(stream)
}