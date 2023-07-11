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

  var now = Math.round(Date.now() / 1000);
  var minerData = await getMinerData(address);
  var energy = parseInt(minerData.totalEnergyGeneration);
  var dataList = [];
  var dataCount = 12;

  if (first) {
    dataCount = 1;
  }

  for (var i = 0; i < dataCount; i++) {
    var sampling_time = now - ((i + 1) * 5 * 60);
    var power = Math.round(Math.random() * Miner.capacity * 0.5);
    energy = Math.round(energy + (power * 1000 * (5 * 30 / 3600)));
    var data = {
      sampling_time: sampling_time,
      power: power,
      energy: energy
    };

    dataList.push(compactData(data));
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
  const opts = { 
    fieldSorts: [
      'version', 
      'address', 
      'dataList'
    ]
  };

  const hash = sha256Hash(report, opts);
  const signingKey = new ethers.SigningKey(privateKey);
  const signature = signingKey.sign(hash);
  const rawSignature = toArkreenSignature(signature);
  const buffer = ethers.getBytes(rawSignature);
  
  report.signature = ethers.encodeBase58(buffer);
  return report;
}

(function() {

  const reporter = async function(first) {
    var address = Miner.minerAddress;
    var privateKey = Miner.minerPrivateKey;
    var report = await generateReport(address, first);
    console.log("report", report);
    var tx = buildPoggReportTx(report, privateKey);
    console.log("tx", tx);
    var result = await sendPoggReportTx(tx);
    console.log("result", result);
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

