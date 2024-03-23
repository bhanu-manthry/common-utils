const { mockClient } = require('aws-sdk-client-mock');
const { s3 } = require('../src/index');
const { GetObjectCommand, S3Client } = require('@aws-sdk/client-s3');

describe('testing s3', () => {
  const s3Mock = mockClient(S3Client);
  before(() => {
    s3Mock.on(GetObjectCommand).resolves();
  });

  beforeEach(() => {
    s3Mock.reset();
  });

  it('testing getObject', async () => {
    await s3.getObject();
  });
});
