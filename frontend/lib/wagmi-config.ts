import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { getConfig, type NetworkConfig } from './config'

// Get current network configuration with fallback
let config: NetworkConfig
try {
  config = getConfig()
} catch (error) {
  console.warn('Failed to load config, using fallback:', error)
  // Fallback configuration for Celo Sepolia
  config = {
    network: 'celo-sepolia' as const,
    chainId: 11142220,
    chainName: 'Celo Sepolia',
    rpcUrl: 'https://forno.celo-sepolia.celo-testnet.org',
    contracts: {
      vaultFactory: '0x6ABf558Ffa44399f9FAB764914AFef7375e323cA' as `0x${string}`,
      auraOracle: '0x9A7bDcD1298cAA42D11361fd69f5aD4EfaB8dDeA' as `0x${string}`,
      treasury: '0x56D68aCbc130FFF1499CE7C5a4E29Bf38703950b' as `0x${string}`,
    },
  }
}

// Define Celo Sepolia testnet chain
const celoSepoliaChain = {
  id: 11142220,
  name: 'Celo Sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'CELO',
    symbol: 'CELO',
  },
  rpcUrls: {
    default: {
      http: ['https://forno.celo-sepolia.celo-testnet.org'],
    },
    public: {
      http: ['https://forno.celo-sepolia.celo-testnet.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Celo Sepolia Blockscout',
      url: 'https://celo-sepolia.blockscout.com',
    },
  },
} as const

const selectedChain = celoSepoliaChain

// Create wagmi configuration with RainbowKit
export const wagmiConfig = getDefaultConfig({
  appName: 'AuraFi',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'default-project-id',
  chains: [selectedChain],
})

// Export current chain for use in components
export const currentChain = selectedChain

// Helper to check if user is on correct network
export function isCorrectNetwork(chainId?: number): boolean {
  return chainId === selectedChain.id
}

// Helper to get network info
export function getNetworkInfo() {
  return {
    chainId: selectedChain.id,
    name: selectedChain.name,
    currency: selectedChain.nativeCurrency.symbol,
    rpcUrl: config.rpcUrl,
    isFork: false,
  }
}