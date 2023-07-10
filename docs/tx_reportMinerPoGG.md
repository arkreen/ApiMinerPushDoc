# tx_reportMinerPoGG

The transaction that a miner used to report energy generation information to Arkreen Network.



### REQUEST

```
POST https://api.arkreen.com/v1
```



##### HEADERS

```
Content-Type: application/json
```



##### BODY

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tx_reportMinerPoGG",
    "params": {}
}
```



##### `params`

| Field       | Exists     | Type                                              | Description                                                  |
| ----------- | ---------- | ------------------------------------------------- | ------------------------------------------------------------ |
| `version`   | *required* | [`Number`](./Types.md#Number)             | The PoGG report transaction version                          |
| `address`   | *required* | [`Address`](./Types.md#Address)           | The miner address of PoGG report transaction                 |
| `dataList`  | *required* | [`Array`](./Types.md#Array)               | The energy generation data of miner, it is a JavaScript array , each its element is a sampleded `data` as hex string |
| `signature` | *required* | [`AsnSignature`](./Types.md#AsnSignature) | The signature of previous fields                             |



##### `data`

The data hex string length is `40`, it is combine with 4 parts:

| Range   | Description                                                  |
| ------- | ------------------------------------------------------------ |
| `0~1`   | Version of the sampleded data                                |
| `2~11`  | Sampling timestamp, escaped seconds from `1970/01/01 00:00:00 UTC` |
| `12~23` | Real time power of the miner                                 |
| `24~39` | Cumulative energy generated of the miner                     |



##### EXAMPLE

```shell
curl https://api.arkreen.com/v1 \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"jsonrpc":"2.0","method":"tx_reportMinerPoGG","params":{},"id":1}'
```



### RESPONSE



#### SUCCESS

##### BODY

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "200"
}
```



#### FAILURE

##### BODY

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



##### CODE

The following error codes are specific to current method:

| Code  | Message                     | Meaning                                 |
| ----- | --------------------------- | --------------------------------------- |
| 12201 | Invalid Signature           | The signature of transaction is invalid |
| 12207 | Invalid Transaction Content | The transaction content is invalid      |
| 12208 | Miner Not Found             | The onboarding miner is not found       |
