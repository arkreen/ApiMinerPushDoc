// app.js


const stringify = require('json-stringify-sort');
const ethers = require('ethers');
const Config = require('./config');
const Miner = require('./miner');


function compactData(data) {
  const version = '01';
  const time = ethers.toBeHex(data.sampling_time, 5).substring(2);
  const power = ethers.toBeHex(data.power * 1000, 6).substring(2);
  const energy = ethers.toBeHex(data.energy * 1000, 8).substring(2);

  return version + time + power + energy;
}

function sha256Hash(obj,opts) {
  const message = stringify(obj, opts);
  const buffer = ethers.toUtf8Bytes(message);
  const hash = ethers.keccak256(buffer);
  return hash;
}

function toArkreenSignature(ethSignature) {
  var rawSignature = '';
  if (ethSignature.v === 0x1c) {
    rawSignature += ethSignature.r;
    rawSignature += ethSignature.s.substring(2);
    rawSignature += '01';
  } else {
    rawSignature += ethSignature.r;
    rawSignature += ethSignature.s.substring(2);
    rawSignature += '00';
  }

  return rawSignature;
}

async function generateReport(address, first) {
  var report = {
    version: 1,
    address: address
  };

  //get the latest total energy generation of the miner from Arkreen Network
  //vender can cache the data locally
  var minerData = await getMinerData(address);
  var totalEnergyGeneration = minerData.totalEnergyGeneration;//unit=Milliwatt Hours
  var energy = parseInt(totalEnergyGeneration);//unit=Milliwatt Hours

  var now = Math.round(Date.now() / 1000);
  var dataList = [];
  var dataCount = 12;

  if (first) {
    dataCount = 1;
  }

  for (var i = 0; i < dataCount; i++) {
    var sampling_time = now - ((i + 1) * 5 * 60);
    var power = Math.round(Math.random() * Miner.capacity * 0.5);
    energy = Math.round(energy / 1000 + (power * (5 * 30 / 3600)));

    var data = {
      sampling_time: sampling_time,//UTC seconds from 1970/01/01 00:00:00 
      power: power,//unit=Watt
      energy: energy//unit=Watt Hours
    };

    //compact the data to short format
    var cd = compactData(data);
    dataList.push(cd);
  }

  report.dataList = dataList;
  return report;
}

async function getMinerData(address) {
  var url = Config.jsonRpcUrl;
  var method = Config.jsonRpcMethod_Get_Miner;

  var jsonRpc = {
    jsonrpc: "2.0",
    id: Date.now(),
    method: method,
    params: {
      address: address
    }
  };

  var options = {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jsonRpc)
  };

  var response = await fetch(url, options);
  var data = await response.json();
  if (data.result) {
    return data.result;
  } else {
    throw new Error(JSON.stringify(data.error));
  }
}

async function sendPoggReportTx(tx) {
  var url = Config.jsonRpcUrl;
  var method = Config.jsonRpcMethod_PoGG_Report;

  var jsonRpc = {
    jsonrpc: "2.0",
    id: Date.now(),
    method: method,
    params: tx
  };

  var options = {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jsonRpc)
  };

  var response = await fetch(url, options);
  var data = await response.json();
  if (data.result) {
    return data.result;
  } else {
    throw new Error(JSON.stringify(data.error));
  }
}

function buildPoggReportTx(report, privateKey) {
  //the order of properties of PoGG report to be digested
  const opts = { 
    fieldSorts: [
      'version', 
      'address', 
      'dataList'
    ]
  };

  //signing the PoGG report transaction with miner private key
  var hash = sha256Hash(report, opts);
  var signingKey = new ethers.SigningKey(privateKey);
  var signature = signingKey.sign(hash);

  //convert the signature to Arkreen signature and Base58 encoded
  var rawSignature = toArkreenSignature(signature);
  var buffer = ethers.getBytes(rawSignature);
  var signature = ethers.encodeBase58(buffer);
  
  //set the signature of PoGG report transaction
  report.signature = signature;
  return report;
}

(function() {

  const reporter = async function(first) {
    var address = Miner.minerAddress;
    var privateKey = Miner.minerPrivateKey;

    //generate PoGG report data
    //first == true, the first report
    //first == false, another report
    var report = await generateReport(address, first);
    console.log("PoGG report data", report);

    //build PoGG report transaction and sign it with miner private key
    var tx = buildPoggReportTx(report, privateKey);
    console.log("PoGG transaction", tx);

    //send the PoGG report to Arkreen Network
    var hash = await sendPoggReportTx(tx);
    console.log("transaction hash", hash);

    return report;
  };

  //send the first report when the miner online
  setTimeout(async function() {
    await reporter(true);
  }, 1000 * 1); 

  //send the PoGG report every hour
  setInterval(async function() {
    await reporter(false);
  }, 1000 * 3600); 


})();

