const R = require('ramda');
const AWSXRay = require('aws-xray-sdk-core');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  QueryCommand,
  GetCommand,
  PutCommand,
  UpdateCommand,
} = require('@aws-sdk/lib-dynamodb');

const ddbClient = getClient();

/**
 * @param {Object} params
 * @param {string} params.tableName
 * @param {object} params.where
 * @param {string} params.indexName
 * @param {number} params.limit
 * @param {object} params.lastEvaluatedKey
 * @returns {Promise<import('@aws-sdk/client-dynamodb').QueryCommandOutput>}
 */
async function getTableData({ tableName, where, indexName, limit, lastEvaluatedKey }) {
  let createAttributes = (where, fn) => R.pipe(R.map(fn))(R.keys(where));

  /**
   * @type {import('@aws-sdk/lib-dynamodb').QueryCommandInput}
   */
  const params = {
    TableName: tableName,
    ExpressionAttributeNames: R.mergeAll(createAttributes(where, (key) => ({ ['#' + key]: key }))),
    ExpressionAttributeValues: R.mergeAll(createAttributes(where, (key) => ({ [':' + key]: where[key] }))),
    KeyConditionExpression: R.join(' and ')(createAttributes(where, (key) => '#' + key + ' = :' + key)),
  };

  if (indexName) {
    params.IndexName = indexName;
  } else {
    // do nothing
  }

  if (limit) {
    params.Limit = limit;
  } else {
    // do nothing
  }

  if (lastEvaluatedKey) {
    params.ExclusiveStartKey = lastEvaluatedKey;
  } else {
    // do nothing
  }

  const queryCommand = new QueryCommand(params);
  return ddbClient.send(queryCommand);
}

/**
 * @param {import('@aws-sdk/lib-dynamodb').GetCommandInput} getCommandInput
 * @returns {Promise<import('@aws-sdk/lib-dynamodb').GetCommandOutput>}
 */
async function get(getCommandInput) {
  const getCommand = new GetCommand(getCommandInput);
  return ddbClient.send(getCommand);
}

/**
 * @param {import('@aws-sdk/lib-dynamodb').PutCommandInput} putCommandInput
 * @returns {Promise<import('@aws-sdk/lib-dynamodb').PutCommandOutput>}
 */
async function put(putCommandInput) {
  const putCommand = new PutCommand(putCommandInput);
  return ddbClient.send(putCommand);
}

/**
 * @param {import('@aws-sdk/lib-dynamodb').UpdateCommandInput} updateCommandInput
 * @returns {Promise<import('@aws-sdk/lib-dynamodb').UpdateCommandOutput>}
 */
async function update(updateCommandInput) {
  const updateCommand = new UpdateCommand(updateCommandInput);
  return ddbClient.send(updateCommand);
}

/**
 * @param {import('@aws-sdk/lib-dynamodb').QueryCommandInput} queryCommandInput
 * @returns {Promise<import('@aws-sdk/lib-dynamodb').QueryCommandOutput>}
 */
async function query(queryCommandInput) {
  const updateCommand = new QueryCommand(queryCommandInput);
  return ddbClient.send(updateCommand);
}

function getClient() {
  const client = new DynamoDBClient();
  return AWSXRay.captureAWSv3Client(DynamoDBDocumentClient.from(client));
  // if (process.env.xrayTracing) {
  //   console.log('coming here');
  //   return AWSXRay.captureAWSv3Client(DynamoDBDocumentClient.from(client));
  // } else {
  //   return DynamoDBDocumentClient.from(client);
  // }
}

module.exports = {
  getTableData,
  get,
  put,
  update,
  query,
};
