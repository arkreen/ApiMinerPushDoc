
# net_getMinerByAddress

Get the miner detail information by miner address.

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
    "method": "net_getMinerByAddress",
    "params": {
        "address": "0xefe22f370d03ace02f82e379a754b072123e4db2"
    }
}
```


#### `params`

The `params` is a `JavaScript` object that has the following fields:

| Field     | Exists     | Type      | Description                       |
| --------- | ---------- | --------- | --------------------------------- |
| `address` | *required* | [`Address`](./Types.md#Address) | Standard Ethereum account address |



## RESPONSE


### SUCCESS


#### BODY

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "address": "0x716C7dB9c814c1310fEf6fd801e94228002A2dC5",
        "ownerAddress": "0x1B28D608AC9dBF3290cB99290ecb54Bb1f72471e",
        "capacity": 100000,
        "totalEnergyGeneration": "85000"
    }
}
```


##### `result`

The `result` is a JavaScript object that includes the miner information:

| Field        | Exists     | Type                                  | Description                                                                |
|--------------|------------|---------------------------------------|----------------------------------------------------------------------------|
| `address`   | *required* | [`Address`](./Types.md#Address)           | The miner address                 |
| `ownerAddress`   | *required* | [`Address`](./Types.md#Address)           | The owner address of miner                |
| `capacity`  | *required* | [`Number`](./Types.md#Number) | The capacity of miner                               |
| `totalEnergyGeneration`  | *required* | String | The total energy generation of miner            |



### FAILURE


#### BODY

```
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

| Code  | Message               | Meaning                                                           |
| ----- | --------------------- | ----------------------------------------------------------------- |
| 3005  | device is not existed | The miner is not exist                                            |
| 12208 | Miner mot found       | The target miner is not found                                 |


