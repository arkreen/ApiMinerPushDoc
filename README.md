# ApiMinerDoc

Document for API Miner Push Mode.

There are two Proof of Green-energy Generation(PoGG) data report modes in Arkreen API Miner:
* Push Mode: User push PoGG data by themself, the PoGG data must be build according to the PoGG report rules of Arkreen Network.
* Pull Mode: Arkreen Network pull PoGG data from user, user needs to provide access cridential/endpoint to Arkreen Network.

This document for the Arkreen API Miner Push Mode only.

For more information of PoGG, please refer to: [Proof of Green-energy Generation and Reward Distribution](https://docs.arkreen.com/technical-details/proof-of-green-energy-generation).




# Prerequisites

If you want to became to an owner of Arkreen API Miner, you need to satify the following requirements:
* You must be a business user, individual user is not supported.
* You must have a directly business cooperation with Arkreen Network.
* You must have a cloud services/devices that can collect and report PoGG data to Arkreen Network everytime and every data.




# API Miner Lifecycle

* Register the API Miner
    * The API Miner must be registered before they report PoGG data to Arkreen Network.
    * User must pay the fee for API Miner registration, please contact [Arkreen Network](info@arkreen.com) to get more detail.
    * Arkreen only accept business partner to registering API Miner, so there are no dApps to register API miner by user.
* Onboard the API Miner
    * User can provide the required properties for onboarding API Miner, the required properties include:
        * The capacity of your power plant, for example: 5000, the unit is `Wh`(Watt Hour)
        * The location of your power plant, for example: `USA/California/Los Angels`
        * User must have a Ethereum compatible wallet to onboard API Miner, for example: `MetaMask`
    * User can onboard API Miner by Arkreen Console(Coming Soon...):
        * Test only environment: [Arkreen Console](https://pre.console.arkreen.work/)
        * Production environment: [Arkreen Console](https://testconsole.arkreen.com/)
* Report PoGG data to Arkreen Network periodly
    * Please refer to the following charpters.




# JSON APIs for API Miner

| API                                                | Description                                                      |
| -------------------------------------------------- | ---------------------------------------------------------------- |
| [tx_reportMinerPoGG](./docs/tx_reportMinerPoGG.md) | JSON RPC API that be used to report PoGG data to Arkreen Network |



