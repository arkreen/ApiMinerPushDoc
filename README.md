# ApiMinerPushDoc

This document is used by the vendor of Arkreen API Miner.



# Prerequisites

If you want to become to a vender of Arkreen API Miner, you need to satisfy the following requirements:
* You must be a business user, individual users are not supported.
* You must have direct business cooperation with Arkreen Network.
* You must have a cloud services/devices that can collect and report PoGG data to Arkreen Network `24*7*365` manner.




# API Miner Process Flow

* Generate API Miner(address and private key), the API miner can be generated by `Ethereum` compatible wallets
    * Arkreen API Miner must be registered before they report PoGG data to Arkreen Network.
    * Arkreen only accepts business partners to register for API Miner.
* Contact [Arkreen Network](info@arkreen.com) to register the generated API miner and pay the registration fee
    * The vender of API Miner must pay the fee for API Miner registration.
    * The miner address is the required parameter to register, private key is needless.
* Using Arkreen Console to onboarding API miner
    * User needs to prepare the required properties for onboarding API Miner, the required properties include:
        * The **capacity** of your power plant, for example: `5000`, the unit is `Wh`(Watt Hour)
        * The **location** of your power plant, for example: `Los Angeles USA`
    * User can onboard API Miner by Arkreen Console
        * Using the desktop browser to access Arkreen Console is preferred
        * Mobile browser will support soonly
        * The Arkreen Console for TEST ONLY will coming soon...
* Using the Arkreen JSON RPC API to report PoGG data to Arkreen Network periodically
    * To earn the maximum reward, API Miner must report the PoGG data every hour and each PoGG report includes `12` green generation samples(sampling green generation data every `5` minutes)
    * For more information of PoGG data, please refer to: [tx_reportMinerPoGG](./docs/tx_reportMinerPoGG.md)
    * For more information of PoGG, please refer to: [Proof of Green-energy Generation and Reward Distribution](https://docs.arkreen.com/technical-details/proof-of-green-energy-generation).



# JSON RPC APIs for API Miner

| API                                                      | Description                                                      |
| -------------------------------------------------------- | ---------------------------------------------------------------- |
| [tx_reportMinerPoGG](./docs/tx_reportMinerPoGG.md)       | JSON RPC API that be used to report PoGG data to Arkreen Network |
| [net_getMinerByAddress](./docs/net_getMinerByAddress.md) | JSON RPC API that be used to get miner information               |




# Sample Code

This sample code will send the randomly generated PoGG report data to Arkreen Network.

## Prepare the environment

```
git clone git@github.com:arkreen/ApiMinerPushDoc.git
cd ApiMinerPushDoc/sample
npm install
```

## Config the API Miner

* Using any text editor to open `miner.js` file
* Change the `minerAddress` variable to your miner address
* Change the `minerPrivateKey` variable to your miner private key


## Run the API Miner

```
node app.js
```

When the application is running firstly, the miner has not made any PoGG report, the application will report the first PoGG data with `1` green generation sample, after that, the application will report PoGG data to Arkreen Network every hour with `12` green generation sample.


# FAQ

* How to check the PoGG report data that has been sent to Arkreen Network?
    - Open the [Arkreen Console Miners](https://pre.explorer.arkreen.work/miners) web page
    - Enter the target miner address in search box top of window and search



