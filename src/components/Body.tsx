import { Container, FormControl, FormLabel, Tab, TabList, TabPanel, TabPanels, Tabs, Textarea } from "@chakra-ui/react"
import { Btc } from "./Btc"
import { Evm } from "./Evm"

export const Body: React.FC = (props) => {


    return (

        <Container my="16" minW={["0", "0", "4xl", "4xl"]}>
            <Tabs mt="6"
                isFitted
                variant="enclosed">
                <TabList >
                    <Tab>EVM Wallet Generator</Tab>
                    <Tab>Btc Wallet Generator</Tab>
                    <Tab>Three</Tab>
                </TabList>

                <TabPanels mt="3">
                    <TabPanel>
                        <Evm />
                    </TabPanel>
                    <TabPanel>
                        <Btc />
                    </TabPanel>
                    <TabPanel>
                        <p>three!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>

    );

    /*
    return (
        <Container my="16" minW={["0", "0", "2xl", "2xl"]}>
            <Tabs mt="6"
                variant="enclosed">
                <TabList>
                    <Tab>EVM Wallet Generator</Tab>
                    <Tab>Btc Wallet Generator</Tab>
                    <Tab>Three</Tab>
                </TabList>

                <TabPanels mt="3">
                    <TabPanel>
                        <Evm />
                    </TabPanel>
                    <TabPanel>
                        <Btc />
                    </TabPanel>
                    <TabPanel>
                        <p>three!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    )
    */
}