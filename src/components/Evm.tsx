import {
    Button,
    Center,
    Flex,
    FormControl, FormLabel,
    IconButton,
    Input,
    Text
} from "@chakra-ui/react"
import { ethers } from 'ethers'
import * as React from "react"
import { FaCopy } from "react-icons/fa"
//import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'


export const Evm: React.FC = (props) => {
    const [wallet, setWallet] = React.useState<ethers.Wallet>()
    const [entropy, setEntropy] = React.useState<string>("")

    const onEntropyChange = (event: React.ChangeEvent<HTMLInputElement>) => setEntropy(event.target.value)

    // function for generate wallet
    const generateWallet = () => {
        setWallet(ethers.Wallet.createRandom({ entropy: entropy, extraEntropy: ethers.utils.randomBytes(32) }))
        setEntropy("")
    }

    function copyAddress() {
        navigator.clipboard.writeText(wallet?.address || "")
    }

    function copyPrivateKey() {
        navigator.clipboard.writeText(wallet?.privateKey.slice(2) || "")
    }

    function copyMnemonic() {
        navigator.clipboard.writeText(wallet?.mnemonic.phrase || "")
    }


    return (
        <>
            <FormControl>
                <FormLabel>Enter seed</FormLabel>
                <Input mb={"1rem"} value={entropy} placeholder='Set seed (optional)' onChange={onEntropyChange} />
            </FormControl>

            <Center>
                <Button mb={"1rem"} colorScheme='blue' onClick={generateWallet}>Generate</Button>
            </Center>

            {wallet ?
                <Flex align={"flex-start"} direction={"column"}>
                    <Flex direction={"row"} align={"baseline"}>
                        <Text fontSize={['sm', 'md', 'lg']}>Address: {wallet.address}</Text>
                        <IconButton
                            size="md"
                            fontSize="lg"
                            color="current"
                            marginLeft="2"
                            onClick={copyAddress}
                            icon={<FaCopy />}
                            aria-label={`Copy to clipboard`}
                            {...props}
                        />
                    </Flex>
                    <Flex direction={"row"} align={"baseline"}>
                        <Text fontSize={['sm', 'md', 'lg']}>Private Key: {wallet.privateKey.slice(2)}</Text>
                        <IconButton
                            size="md"
                            fontSize="lg"
                            variant="ghost"
                            color="current"
                            marginLeft="2"
                            onClick={copyPrivateKey}
                            icon={<FaCopy />}
                            aria-label={`Copy to clipboard`}
                            {...props}
                        />
                    </Flex>
                    <Flex direction={"row"} align={"baseline"}>
                        <Text fontSize={['sm', 'md', 'lg']}>Mnemonic: {wallet.mnemonic.phrase}</Text>
                        <IconButton
                            size="md"
                            fontSize="lg"
                            variant="ghost"
                            color="current"
                            marginLeft="2"
                            onClick={copyMnemonic}
                            icon={<FaCopy />}
                            aria-label={`Copy to clipboard`}
                            {...props}
                        />
                    </Flex>
                </Flex>
                :
                null}
        </>
    )
}