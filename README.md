# Granary Protocol

A modified fork of [Aave V2](https://github.com/aave/protocol-v2) with multi-chain deployment scripts, custom oracle adapters, and maintenance tools for Granary Finance.

> **Note:** Granary Finance has been sunset on most chains. This repository is preserved as a reference implementation for Aave V2-style lending protocol deployments across multiple EVM chains.

## Overview

Granary Protocol is a modified fork of Aave V2 that was deployed across multiple chains including Optimism, Arbitrum, Base, Linea, Fantom, Metis, BSC, Avalanche, Ethereum, Mode, Horizen, Mantle, Fraxtal, and Scroll. The core lending pool contracts are based on Aave V2's battle-tested architecture, with modifications for multi-chain deployment and additional oracle integrations (API3, RedStone, Pyth).

This repository contains:
- Core protocol smart contracts (Aave V2 architecture)
- Oracle adapters (Chainlink, API3, RedStone, Pyth)
- Multi-chain deployment scripts
- Market configurations for each supported chain
- Contract verification utilities

## Project Structure

```
├── contracts/
│   ├── protocol/         # Core lending pool contracts
│   ├── chainlink/        # Chainlink oracle adapters
│   ├── api3/             # API3 oracle adapters
│   ├── redstone/         # RedStone oracle adapters
│   ├── pyth/             # Pyth oracle adapters
│   ├── incentives/       # Rewards distribution contracts
│   ├── flashloan/        # Flash loan receiver base
│   ├── dependencies/     # OpenZeppelin and other dependencies
│   └── misc/             # Utility contracts
│
├── scripts/
│   ├── Deployment/       # Deployment scripts
│   │   ├── deploy.ts                    # Full protocol deployment
│   │   ├── continueDeployment.ts        # Resume partial deployment
│   │   ├── deployReserveStrategy.ts     # Interest rate strategies
│   │   ├── deployTimelock.ts            # Governance timelock
│   │   ├── deployChainlinkSourcesRegistry.ts
│   │   ├── deployAPI3Adaptor.ts
│   │   ├── deployRedStoneAdaptor.ts
│   │   ├── deployPythAdaptor.ts
│   │   └── ...
│   ├── verify.ts         # Single contract verification
│   ├── massVerify.ts     # Batch contract verification
│   ├── transferOwnership.ts
│   └── encode.ts         # ABI encoding utilities
│
├── markets/              # Chain-specific configurations
│   ├── optimism.ts
│   ├── arbitrum.ts
│   ├── base.ts
│   ├── linea.ts
│   ├── fantom.ts
│   ├── metis.ts
│   ├── binance.ts
│   ├── avalanche.ts
│   ├── ethereum.ts
│   ├── mode.ts
│   ├── horizen.ts
│   └── lore.ts           # Scroll/Lore deployment
│
├── helpers/              # Deployment utilities
│   ├── constants.ts
│   ├── contracts-deployments.ts
│   ├── contracts-getters.ts
│   └── contracts-helpers.ts
│
└── addresses.json        # Deployed contract addresses
```

## Supported Chains

| Chain | Status | RPC |
|-------|--------|-----|
| Optimism | Sunset | QuickNode/Public |
| Arbitrum | Sunset | QuickNode/Public |
| Base | Sunset | QuickNode/Public |
| Linea | Sunset | Public |
| Fantom | Sunset | QuickNode/Public |
| Metis | Sunset | Public |
| BSC | Sunset | QuickNode/Public |
| Avalanche | Sunset | Public |
| Ethereum | Sunset | QuickNode/Public |
| Mode | Sunset | Public |
| Horizen | Sunset | Public |
| Mantle | Sunset | Public |
| Fraxtal | Sunset | Public |
| Scroll | Active | Public |

## Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/granary-protocol.git
cd granary-protocol
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
cp .env.example .env
# Edit .env with your private key and RPC URLs
```

## Configuration

Create a `.env` file with the following variables:

```env
# Deployer Private Key (without 0x prefix)
DEPLOYER_PRIVATE_KEY=your_private_key_here

# RPC URLs (required for deployment)
OPTIMISM_RPC_URL=https://...
ARBITRUM_RPC_URL=https://...
# ... see .env.example for full list

# Block Explorer API Keys (for verification)
OPTIMISM_ETHERSCAN_API_KEY=your_key
ARBITRUM_ETHERSCAN_API_KEY=your_key
# ... see .env.example for full list
```

## Usage

### Deploy Protocol
```bash
npm run deploy -- --network <network_name>
```

### Deploy Individual Components
```bash
# Interest rate strategy
npm run deployReserveStrategy -- --network <network>

# Oracle adapters
npm run deployChainlinkSourcesRegistry -- --network <network>
npm run deployAPI3Adaptor -- --network <network>
npm run deployRedStoneAdaptor -- --network <network>
npm run deployPythAdaptor -- --network <network>

# Governance
npm run deployTimelock -- --network <network>

# Rewards
npm run deployRewardsVault -- --network <network>
```

### Verify Contracts
```bash
# Single contract
npm run verify -- --network <network>

# Batch verification
npm run massVerify -- --network <network>
```

### Transfer Ownership
```bash
npm run transferOwnership -- --network <network>
```

## Architecture

### Core Contracts

- **LendingPool**: Main entry point for deposits, borrows, repays, and liquidations
- **LendingPoolConfigurator**: Admin functions for reserve configuration
- **LendingPoolAddressesProvider**: Protocol registry and address resolution
- **AToken**: Interest-bearing deposit tokens
- **VariableDebtToken**: Variable rate debt tokens
- **StableDebtToken**: Stable rate debt tokens
- **Oracle**: Price feed aggregation from multiple sources

### Interest Rate Strategies

Two default strategies are provided:
- **Stable Strategy**: Lower utilization targets for stablecoins
- **Volatile Strategy**: Higher utilization targets for volatile assets

### Oracle Adapters

The protocol supports multiple oracle providers:
- **Chainlink**: Primary price feeds on most chains
- **API3**: Alternative decentralized oracle
- **RedStone**: Modular oracle with push/pull models
- **Pyth**: High-frequency price updates

## Market Configuration

Each chain has a market configuration file in `markets/` defining:
- Token addresses and decimals
- Oracle aggregator addresses
- Interest rate parameters
- Loan-to-value ratios
- Liquidation thresholds and bonuses
- Reserve factors

## Security

- Never commit private keys or API keys
- Use timelocks for governance actions
- Multi-sig for admin operations
- All contracts should be verified on block explorers

## Dependencies

- **Hardhat** - Development framework
- **ethers.js v5** - Ethereum interaction
- **OpenZeppelin** - Security-audited contract libraries
- **TypeScript** - Type-safe scripting

## License

MIT
