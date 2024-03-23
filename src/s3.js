/**
 * Wrapper functions for handling all types of AWS s3 related operations
 */

const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const AWSXRay = require('aws-xray-sdk-core');
const log = require('lambda-log');

log.options.debug = process.env.debug === 'true';

/**
 * @type {S3Client}
 */
const client = AWSXRay.captureAWSv3Client(new S3Client());

/**
 * @param {import('@aws-sdk/client-s3').GetObjectCommandInput} params
 * @returns {Promise<import('@aws-sdk/client-s3').GetObjectCommandOutput>}
 */
async function getObject(params) {
  log.info('Getting s3 object', { params });
  const object = await client.send(new GetObjectCommand(params));
  return object;
}

module.exports = {
  getObject,
};
