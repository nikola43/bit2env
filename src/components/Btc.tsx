import {
    Button,
    Container,
    Flex,
    IconButton,
    Input,
    Text,
    VStack
} from "@chakra-ui/react"
import * as React from "react"
import { FaCopy } from "react-icons/fa"
import ecc from '@bitcoinerlab/secp256k1'
import BIP32Factory from 'bip32'

const bip32 = BIP32Factory(ecc)
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

interface BtcWallet {
    address: string
    privateKey: string
    mnemonic: string
}

export const Btc: React.FC = (props) => {
    const [wallet, setWallet] = React.useState<BtcWallet>()
    const [entropy, setEntropy] = React.useState<string>("")

    const onEntropyChange = (event: React.ChangeEvent<HTMLInputElement>) => setEntropy(event.target.value)

    // function for generate wallet
    const generateWallet = () => {
        const network = bitcoin.networks.bitcoin
        const path = `m/44'/0'/0'/0`
        const mnemonic = bip39.generateMnemonic()
        const seed = bip39.mnemonicToSeedSync(mnemonic)
        const root = bip32.fromSeed(seed, network)
        const account = root.derivePath(path)
        const node = account.derive(0).derive(0)
        const privateKey = node.toWIF()
        const address = bitcoin.payments.p2pkh({
            pubkey: node.publicKey,
            network: network,
        }).address

        setWallet({
            address: address,
            privateKey: privateKey,
            mnemonic: mnemonic
        })
    }

    function copyAddress() {
        navigator.clipboard.writeText(wallet?.address || "")
    }

    function copyPrivateKey() {
        navigator.clipboard.writeText(wallet?.privateKey.slice(2) || "")
    }

    function copyMnemonic() {
        navigator.clipboard.writeText(wallet?.mnemonic || "")
    }


    return (
        <VStack>
            <Container maxW='container.lg' color='white' >
                <Input mb={"1rem"} placeholder='Set seed (optional)' onChange={onEntropyChange} />
                <Button mb={"1rem"} colorScheme='blue' onClick={generateWallet}>Generate</Button>
                {wallet ?
                    <Flex maxW='container.lg' color='white' direction={"column"} align={"flex-start"}>
                        <Flex maxW='container.lg' color='white' direction={"row"} align={"baseline"}>
                            <Text mb={"1rem"}>Address: {wallet.address}</Text>
                            <IconButton
                                size="md"
                                fontSize="lg"
                                variant="ghost"
                                color="current"
                                marginLeft="2"
                                onClick={copyAddress}
                                icon={<FaCopy />}
                                aria-label={`Copy to clipboard`}
                                {...props}
                            />
                        </Flex>
                        <Flex maxW='container.lg' color='white' direction={"row"} align={"baseline"}>
                            <Text mb={"1rem"}>Private Key (WIF): {wallet.privateKey}</Text>
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
                        <Flex maxW='container.lg' color='white' direction={"row"} align={"baseline"}>
                            <Text mb={"1rem"}>Mnemonic: {wallet.mnemonic}</Text>
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
                    </Flex> :
                    null
                }
            </Container >

        </VStack >
    )
}