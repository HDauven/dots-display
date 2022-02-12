import { Contract, ethers} from 'ethers'
import DotsCanvasABI from './DotsCanvasABI.json'

const DOTS_CANVAS_CONTRACT = ''
const NETWORK = 'https://l2.testnet.nahmii.io'

export const instantiateDotsCanvasContract = () => {
    const provider = readOnlyProvider(NETWORK)
    const contract = new Contract(DOTS_CANVAS_CONTRACT, DotsCanvasABI, provider)
    return contract
}

export const readOnlyProvider = (network) => {
    return new ethers.providers.JsonRpcProvider(network)
}