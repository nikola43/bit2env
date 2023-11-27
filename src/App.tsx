import {
  ChakraProvider,
} from "@chakra-ui/react"
import { Body } from "./components/Body"
import theme from "./theme";

export const App = () => (
  <ChakraProvider theme={theme}>
    <div>
      <Body />
    </div>
  </ChakraProvider>
)