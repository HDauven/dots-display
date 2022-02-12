import { Contract, ethers} from 'ethers'
import DotsCanvasABI from './DotsCanvasABI.json'

const DOTS_CONTRACT = ''
const DOTS_CANVAS_CONTRACT = ''

export const readOnlyProvider = (network) => {
    return new ethers.providers.JsonRpcProvider(network)
}