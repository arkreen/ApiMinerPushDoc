# tx_reportMinerPoGG

The transaction that a miner used to report energy generation information to Arkreen Network.



## REQUEST

### METHOD

```
POST
```



### HEADERS

```
Content-Type: application/json
```



### BODY

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tx_reportMinerPoGG",
    "params": {
		  "version": 1,
		  "address": "0x1134e1FEcA30FE9EAF77222b30C6CC571b33CD52",
		  "dataList": [
		    "010064abb9db0000000069780000000016820620",
		    "010064abbb070000000069780000000016820620",
		    "010064abbc330000000115580000000016820620",
		    "010064abbd5f0000000069780000000016825440",
		    "010064abbe8b0000000069780000000016825440",
		    "010064abbfb70000000121100000000016825440",
		    "010064abc0e30000000121100000000016825440",
		    "010064abc20f00000000fde80000000016825440",
		    "010064abc33b00000000b3b0000000001682a260",
		    "010064abc46700000000fa00000000001682a260",
		    "010064abc59300000000f618000000001682a260",
		    "010064abc6bf00000000cb20000000001682a260"
		  ],
		  "signature": "2rj9DbrxzGniLcYL9GUfsVSTKSS3muEh8UU4n9E46Mm6oMDApdTHW7WJfaMMhqwNwZmhPs6DQNacrBnwpQRpCxfa8"
		}
}
```



#### `params`

| Field       | Exists     | Type                                              | Description                                                  |
| ----------- | ---------- | ------------------------------------------------- | ------------------------------------------------------------ |
| `version`   | *required* | [`Number`](./Types.md#Number)             | The PoGG report transaction version                          |
| `address`   | *required* | [`Address`](./Types.md#Address)           | The miner address of PoGG report transaction                 |
| `dataList`  | *required* | [`Array`](./Types.md#Array)               | The energy generation data of miner, it is a JavaScript array , each its element is a sampleded `data` as hex string |
| `signature` | *required* | [`AsnSignature`](./Types.md#AsnSignature) | The signature of previous fields                             |



#### `data`

The data hex string length is `40`, it is combine with 4 parts:

| Range   | Description                                                                                                                                      |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `0~1`   | `1` byte length, version of the sampleded data, fixed to `01`                                                                                      |
| `2~11`  | `5` bytes length, sampling timestamp, escaped seconds from `1970/01/01 00:00:00 UTC`, for example: `0064abb9db`                                     |
| `12~23` | `6` bytes length, real time power(unit=`Milliwatts`) of the miner as `HexString`, for example: `000000006978`                                          |
| `24~39` | `8` bytes length, cumulative energy(unit=`Milliwatt Hours`) generated of the miner as `HexString`, for example: `0000000016820620`                     |




## RESPONSE



### SUCCESS

#### BODY

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "200"
}
```



### FAILURE

#### BODY

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "error": {
        "code": 1,
        "message": "Internal Error"
    }
}
```



#### ERROR CODE

The following error codes are specific to current method:

| Code  | Message                     | Meaning                                 |
| ----- | --------------------------- | --------------------------------------- |
| 12201 | Invalid Signature           | The signature of transaction is invalid |
| 12207 | Invalid Transaction Content | The transaction content is invalid      |
| 12208 | Miner Not Found             | The onboarding miner is not found       |
