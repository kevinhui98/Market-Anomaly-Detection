"use client"
import { Box, FormGroup, Stack, FormControlLabel, Checkbox, Typography, Button, Divider } from "@mui/material";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import GitHubIcon from '@mui/icons-material/GitHub';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
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
  const [searchTerm, setSearchTerm] = useState("");
  const filteredFeatures = features.filter((feature) =>
    feature.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box className="grid items-center justify-items-center p-5 pb-10 max-h-full font-[family-name:var(--font-geist-sans)]">
      <Stack display="flex" direction="row" justifyContent="space-between" width={"100%"} px={15} mb={10} mt={5}>
        <Typography variant="h3">Anomaly Detection</Typography>
        <Box display="flex" justifyContent="center" alignItems="center">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Box>
      </Stack>
      <Stack direction="row" spacing={4} width={'100%'} mb={10}>
        <Box pl={15} >
          <Stack display={'flex'} flexDirection={'row'} gap={1}>
            <TextField
              label="Search Features"
              variant="outlined"
              fullWidth
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              className="bg-white border rounded"
            />
            <Button variant="contained" color="primary">Predict</Button>
          </Stack>
          <Stack height={'60vh'} overflow={'auto'} width={'30vw'} mt={2}>
            <FormGroup direction="row" className="flex flex-wrap gap-2"  >
              {filteredFeatures.map((feature, index) => (
                <FormControlLabel
                  key={index}
                  className="border rounded bg-gray-200 text-black"
                  onClick={() => console.log(`Clicked on ${feature.Name}`)}
                  control={<Checkbox className="bg-gray-200" />}
                  sx={{ mx: 0, mr: 1 }}
                  label={feature.Name}
                />
              ))}
            </FormGroup>
          </Stack>
        </Box>
        <Stack direction="column" gap={4} width={'50vw'} display={'flex'} justifyContent="flex-start">
          <Typography variant="h4">Model Prediction</Typography>
          <Box mt={2}>
            {/* Placeholder for the graph */}
            <Box className="bg-gray-900 flex items-center justify-center" height={"40vh"}>
              <span>Graph will be displayed here</span>
            </Box>
          </Box>
          <Box mt={2}>
            <Typography variant="h5">Model Accuracy</Typography>
            <Typography variant="body1">Accuracy details will be displayed here</Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="h5" >Model Explanation</Typography>
            <Typography variant="body1">Explanation of the model will be displayed here</Typography>
          </Box>
        </Stack>
      </Stack>
      <Divider orientation="horizontal" />
      <Box display="flex" justifyContent="flex-end" alignItems="flex-end" sx={{ float: 'right' }} width={"100%"} px={15}>
        <Button
          sx={{ right: 10, bottom: 0 }}
          variant="contained"
          color="primary"
          startIcon={<GitHubIcon />}
          href="https://github.com/kevinhui98/Market-Anomaly-Detection"
        > GitHub
        </Button>
      </Box>
    </Box>
  );
}
