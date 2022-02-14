import { Contract, ethers} from 'ethers'
import DotsCanvasABI from './DotsCanvasABI.json'

const DOTS_CANVAS_CONTRACT = '0xa890F3e35CA0ed9D185Ded981AE1b3345192Bd10'
const NETWORK = 'https://l2.testnet.nahmii.io'

export const getDotsMetadata = async (contract, tokenID) => {
    const dotsURI = await getTokenURI(contract, tokenID)
    const response = await fetch(dotsURI)
    const dotsMetadata = await response.json()
    return dotsMetadata
}

export const getTokenURI = async (contract, tokenID) => {
    return await contract.tokenURI(tokenID)
}

export const totalNumberOfDots = async (contract) => {
    return await contract.totalSupply()
}

export const instantiateDotsCanvasContract = () => {
    const provider = readOnlyProvider(NETWORK)
    const contract = new Contract(DOTS_CANVAS_CONTRACT, DotsCanvasABI, provider)
    return contract
}

export const readOnlyProvider = (network) => {
    return new ethers.providers.JsonRpcProvider(network)
}