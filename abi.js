contractAbi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "beneficiary",
        "type": "address"
      },
      {
        "name": "fee",
        "type": "uint256"
      },
      {
        "name": "period",
        "type": "uint256"
      }
    ],
    "name": "createDirectDebit",
    "outputs": [],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "beneficiary",
        "type": "address"
      }
    ],
    "name": "getDirectDebit",
    "outputs": [
      {
        "name": "fee",
        "type": "uint256"
      },
      {
        "name": "period",
        "type": "uint256"
      }
    ],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "beneficiary",
        "type": "address"
      }
    ],
    "name": "deleteDirectDebit",
    "outputs": [],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "getAllDirectDebits",
    "outputs": [
      {
        "name": "addresses",
        "type": "address[]"
      }
    ],
    "type": "function"
  }
]