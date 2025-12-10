import '@nomicfoundation/hardhat-toolbox';
import 'dotenv/config';
import '@openzeppelin/hardhat-upgrades';
import { HardhatUserConfig } from 'hardhat/types';

// Load environment variables
const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || "";

// RPC URLs
const OPTIMISM_RPC_URL = process.env.OPTIMISM_RPC_URL || "";
const ARBITRUM_RPC_URL = process.env.ARBITRUM_RPC_URL || "";
const BASE_RPC_URL = process.env.BASE_RPC_URL || "";
const LINEA_RPC_URL = process.env.LINEA_RPC_URL || "https://rpc.linea.build";
const FANTOM_RPC_URL = process.env.FANTOM_RPC_URL || "";
const METIS_RPC_URL = process.env.METIS_RPC_URL || "https://andromeda.metis.io/?owner=1088";
const BSC_RPC_URL = process.env.BSC_RPC_URL || "";
const AVALANCHE_RPC_URL = process.env.AVALANCHE_RPC_URL || "https://api.avax.network/ext/bc/C/rpc";
const ETHEREUM_RPC_URL = process.env.ETHEREUM_RPC_URL || "";
const MODE_RPC_URL = process.env.MODE_RPC_URL || "https://mainnet.mode.network";
const HORIZEN_RPC_URL = process.env.HORIZEN_RPC_URL || "https://eon-rpc.horizenlabs.io/ethv1";
const MANTLE_RPC_URL = process.env.MANTLE_RPC_URL || "https://rpc.mantle.xyz/";
const FRAXTAL_RPC_URL = process.env.FRAXTAL_RPC_URL || "https://rpc.frax.com/";
const SCROLL_RPC_URL = process.env.SCROLL_RPC_URL || "https://rpc.scroll.io";

// Block Explorer API Keys
const OPTIMISM_ETHERSCAN_API_KEY = process.env.OPTIMISM_ETHERSCAN_API_KEY || "";
const ARBITRUM_ETHERSCAN_API_KEY = process.env.ARBITRUM_ETHERSCAN_API_KEY || "";
const BASE_ETHERSCAN_API_KEY = process.env.BASE_ETHERSCAN_API_KEY || "";
const LINEA_ETHERSCAN_API_KEY = process.env.LINEA_ETHERSCAN_API_KEY || "";
const FANTOM_ETHERSCAN_API_KEY = process.env.FANTOM_ETHERSCAN_API_KEY || "";
const BSC_ETHERSCAN_API_KEY = process.env.BSC_ETHERSCAN_API_KEY || "";
const AVALANCHE_ETHERSCAN_API_KEY = process.env.AVALANCHE_ETHERSCAN_API_KEY || "";
const ETHEREUM_ETHERSCAN_API_KEY = process.env.ETHEREUM_ETHERSCAN_API_KEY || "";
const FRAXTAL_ETHERSCAN_API_KEY = process.env.FRAXTAL_ETHERSCAN_API_KEY || "";
const SCROLL_ETHERSCAN_API_KEY = process.env.SCROLL_ETHERSCAN_API_KEY || "";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.24",
        settings: {
          optimizer: { enabled: true, runs: 10000 },
        },
      },
      {
        version: "0.8.23",
        settings: {
          optimizer: { enabled: true, runs: 200 },
        },
      },
      {
        version: "0.8.19",
        settings: {
          optimizer: { enabled: true, runs: 200 },
        },
      },
      {
        version: "0.8.17",
        settings: {
          optimizer: { enabled: true, runs: 200 },
        },
      },
      {
        version: "0.8.11",
        settings: {
          optimizer: { enabled: true, runs: 200 },
        },
      },
      {
        version: '0.7.5',
        settings: {
          optimizer: { enabled: true, runs: 200 },
        },
      },
      {
        version: '0.6.12',
        settings: {
          optimizer: { enabled: true, runs: 200 },
        },
      },
      {
        version: '0.6.6',
        settings: {
          optimizer: { enabled: true, runs: 200 },
        },
      }
    ],
  },
  networks: {
    optimism: {
      url: OPTIMISM_RPC_URL,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
    arbitrum: {
      url: ARBITRUM_RPC_URL,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
    base: {
      url: BASE_RPC_URL,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
    linea: {
      url: LINEA_RPC_URL,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
    fantom: {
      url: FANTOM_RPC_URL,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
    metis: {
      url: METIS_RPC_URL,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
    bsc: {
      url: BSC_RPC_URL,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
      gasPrice: 3000000000
    },
    avalanche: {
      url: AVALANCHE_RPC_URL,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
    ethereum: {
      url: ETHEREUM_RPC_URL,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
    mode: {
      url: MODE_RPC_URL,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
    horizen: {
      url: HORIZEN_RPC_URL,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
    mantle: {
      url: MANTLE_RPC_URL,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
    fraxtal: {
      url: FRAXTAL_RPC_URL,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
    scroll: {
      url: SCROLL_RPC_URL,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    }
  },
  etherscan: {
    apiKey: {
      optimisticEthereum: OPTIMISM_ETHERSCAN_API_KEY,
      arbitrumOne: ARBITRUM_ETHERSCAN_API_KEY,
      base: BASE_ETHERSCAN_API_KEY,
      linea: LINEA_ETHERSCAN_API_KEY,
      opera: FANTOM_ETHERSCAN_API_KEY,
      metis: 'api-key',
      bsc: BSC_ETHERSCAN_API_KEY,
      avalanche: AVALANCHE_ETHERSCAN_API_KEY,
      mainnet: ETHEREUM_ETHERSCAN_API_KEY,
      mode: 'api-key',
      horizen: 'api-key',
      mantle: 'api-key',
      fraxtal: FRAXTAL_ETHERSCAN_API_KEY,
      scroll: SCROLL_ETHERSCAN_API_KEY
    },
    customChains: [
      {
        network: 'metis',
        chainId: 1088,
        urls: {
          apiURL: 'https://andromeda-explorer.metis.io/api',
          browserURL: 'https://andromeda-explorer.metis.io'
        }
      },
      {
        network: 'base',
        chainId: 8453,
        urls: {
          apiURL: 'https://api.basescan.org/api',
          browserURL: 'https://basescan.org'
        }
      },
      {
        network: 'linea',
        chainId: 59144,
        urls: {
          apiURL: 'https://api.lineascan.build/api',
          browserURL: 'https://lineascan.build'
        }
      },
      {
        network: 'mode',
        chainId: 34443,
        urls: {
          apiURL: 'https://explorer.mode.network/api',
          browserURL: 'https://explorer.mode.network'
        }
      },
      {
        network: 'horizen',
        chainId: 7332,
        urls: {
          apiURL: 'https://eon-explorer.horizenlabs.io/api',
          browserURL: 'https://eon-explorer.horizenlabs.io/'
        }
      },
      {
        network: 'mantle',
        chainId: 5000,
        urls: {
          apiURL: 'https://explorer.mantle.xyz/api',
          browserURL: 'https://explorer.mantle.xyz/'
        }
      },
      {
        network: 'fraxtal',
        chainId: 252,
        urls: {
          apiURL: 'https://api.fraxscan.com/api',
          browserURL: 'https://fraxscan.com/'
        }
      },
      {
        network: 'scroll',
        chainId: 534352,
        urls: {
          apiURL: 'https://api.scrollscan.com/api',
          browserURL: 'https://scrollscan.com/'
        }
      }
    ]
  },
  mocha: {
    timeout: 1200000,
  },
  paths: {
    sources: './contracts',
    tests: './tests',
    cache: './cache',
    artifacts: './artifacts',
  },
};

export default config;
