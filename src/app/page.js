"use client"
import { Box, FormGroup, Stack, FormControlLabel, Checkbox } from "@mui/material";
import Image from "next/image";
// pick a stock then allow pick logistic regression, neural network or other model to predict the stock price
// then show the graph of the stock price and the predicted stock price
// then show the accuracy of the model
// then show an explanation of the model
export default function Home() {
  const features = [
    { "Name": "Gold Spot   $/Oz", "Currency": "XAU", "Bloomberg Ticker": "XAU BGNL" },
    { "Name": "Bloomberg ECO US Surprise Index", "Currency": "USD", "Bloomberg Ticker": "ECSURPUS" },
    { "Name": "Baltic Dry Index", "Currency": "USD", "Bloomberg Ticker": "BDIY" },
    { "Name": "TR/CC CRB ER Index", "Currency": "USD", "Bloomberg Ticker": "CRY" },
    { "Name": "DOLLAR INDEX SPOT", "Currency": "USD", "Bloomberg Ticker": "DXY" },
    { "Name": "Japanese Yen Spot", "Currency": "JPY", "Bloomberg Ticker": "JPY" },
    { "Name": "British Pound Spot", "Currency": "GBP", "Bloomberg Ticker": "GBP" },
    { "Name": "Generic 1st 'CL' Future", "Currency": "USD", "Bloomberg Ticker": "Cl1" },
    { "Name": "Cboe Volatility Index", "Currency": "USD", "Bloomberg Ticker": "VIX" },
    { "Name": "US Generic Govt 30 Yr", "Currency": "USD", "Bloomberg Ticker": "USGG30YR" },
    { "Name": "US TREASURY N/B", "Currency": "USD", "Bloomberg Ticker": "GT10" },
    { "Name": "US Generic Govt 2 Yr", "Currency": "USD", "Bloomberg Ticker": "USGG2YR" },
    { "Name": "US Generic Govt 3 Mth", "Currency": "USD", "Bloomberg Ticker": "USGG3M" },
    { "Name": "ICE LIBOR USD 1 Month", "Currency": "USD", "Bloomberg Ticker": "US0001M" },
    { "Name": "BUNDESREPUB. DEUTSCHLAND", "Currency": "EUR", "Bloomberg Ticker": "GTDEM30Y" },
    { "Name": "BUNDESREPUB. DEUTSCHLAND", "Currency": "EUR", "Bloomberg Ticker": "GTDEM10Y" },
    { "Name": "BUNDESSCHATZANWEISUNGEN", "Currency": "EUR", "Bloomberg Ticker": "GTDEM2Y" },
    { "Name": "EMMI EURO OverNight Index Aver", "Currency": "EUR", "Bloomberg Ticker": "EONIA" },
    { "Name": "BUONI POLIENNALI DEL TES 30 year", "Currency": "EUR", "Bloomberg Ticker": "GTITL30YR" },
    { "Name": "BUONI POLIENNALI DEL TES 10 year", "Currency": "EUR", "Bloomberg Ticker": "GTITL10YR" },
    { "Name": "BUONI POLIENNALI DEL TES 2 year", "Currency": "EUR", "Bloomberg Ticker": "GTITL2YR" },
    { "Name": "JAPAN (30 YEAR ISSUE)", "Currency": "JPY", "Bloomberg Ticker": "GTJPY30YR" },
    { "Name": "JAPAN (10 YEAR ISSUE)", "Currency": "JPY", "Bloomberg Ticker": "GTJPY10YR" },
    { "Name": "JAPAN (2 YEAR ISSUE)", "Currency": "JPY", "Bloomberg Ticker": "GTJPY2YR" },
    { "Name": "UK TSY 0 5/8% 2050", "Currency": "GBP", "Bloomberg Ticker": "GTGBP30Y" },
    { "Name": "UK TSY 1 1/4% 2041", "Currency": "GBP", "Bloomberg Ticker": "GTGBP20Y" },
    { "Name": "UK TSY 0 1/8% 2023", "Currency": "GBP", "Bloomberg Ticker": "GTGBP2Y" },
    { "Name": "U.S. MBS", "Currency": "USD", "Bloomberg Ticker": "LUMSTRUU" },
    { "Name": "Municipal Bond Index", "Currency": "USD", "Bloomberg Ticker": "LMBITR" },
    { "Name": "Corporate", "Currency": "USD", "Bloomberg Ticker": "LUACTRUU" },
    { "Name": "US Corporate High Yield", "Currency": "USD", "Bloomberg Ticker": "LF98TRUU" },
    { "Name": "Global High Yield", "Currency": "USD", "Bloomberg Ticker": "LG30TRUU" },
    { "Name": "Pan-European High Yield", "Currency": "EUR", "Bloomberg Ticker": "LP01TREU" },
    { "Name": "EM USD Aggregate", "Currency": "USD", "Bloomberg Ticker": "EMUSTRUU" },
    { "Name": "Global Inflation-Linked", "Currency": "USD", "Bloomberg Ticker": "LF94TRUU" },
    { "Name": "MSCI USA", "Currency": "USD", "Bloomberg Ticker": "MXUS" },
    { "Name": "MSCI EUROPE", "Currency": "EUR", "Bloomberg Ticker": "MXEU" },
    { "Name": "MSCI JAPAN", "Currency": "JPY", "Bloomberg Ticker": "MXJP" },
    { "Name": "MSCI BRAZIL", "Currency": "USD", "Bloomberg Ticker": "MXBR" },
    { "Name": "MSCI RUSSIA", "Currency": "USD", "Bloomberg Ticker": "MXRU" },
    { "Name": "MSCI INDIA", "Currency": "INR", "Bloomberg Ticker": "MXIN" },
    { "Name": "MSCI CHINA", "Currency": "HKD", "Bloomberg Ticker": "MXCN" }
  ]
  return (
    <div className="grid items-center justify-items-center p-5 pb-10 max-h-full font-[family-name:var(--font-geist-sans)]">
      <nav className="row-start-1 flex items-center justify-between w-full py-5 pb-10" >
        <h1>
          Anomaly Detection
        </h1>
      </nav>
      <Stack direction="col" spacing={4} gap={10} width={'100%'}>
        <Stack height={'600px'} overflow={'auto'} pl={10}>
          <FormGroup direction="row" overflow={'auto'} className="flex flex-wrap gap-4">
            {features.map((feature, index) => (
              <FormControlLabel
                key={index}
                className="p-2 m-2 gap-5 border rounded hover:bg-gray-200 hover:text-black"
                onClick={() => console.log(`Clicked on ${feature.Name}`)}
                control={<Checkbox className="bg-gray-200" />}
                label={feature.Name}
              />
            ))}
          </FormGroup>
        </Stack>
        <Stack direction="column" gap={4} width={'60%'}>
          <h2 className="text-xl font-bold">Model Prediction</h2>
          <Box className="mt-4">
            {/* Placeholder for the graph */}
            <Box className="h-64 bg-gray-100 flex items-center justify-center">
              <span>Graph will be displayed here</span>
            </Box>
          </Box>
          <Box className="mt-4">
            <h3 className="text-lg font-semibold">Model Accuracy</h3>
            <p>Accuracy details will be displayed here</p>
          </Box>
          <Box className="mt-4">
            <h3 className="text-lg font-semibold">Model Explanation</h3>
            <p>Explanation of the model will be displayed here</p>
          </Box>
        </Stack>
      </Stack>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div >
  );
}
