const { mockClient } = require('aws-sdk-client-mock');
const {
  GetCommand,
  DynamoDBDocumentClient,
  QueryCommand,
  PutCommand,
  UpdateCommand,
} = require('@aws-sdk/lib-dynamodb');

describe('testing s3', () => {
  const ddbMock = mockClient(DynamoDBDocumentClient);
  let env;
  before(() => {
    env = process.env;
    process.env = {
      ...process.env,
      xrayTracing: true,
    };
    ddbMock.on(GetCommand).resolves();
    ddbMock.on(QueryCommand).resolves();
    ddbMock.on(PutCommand).resolves();
    ddbMock.on(UpdateCommand).resolves();
  });

  after(() => {
    process.env = env;
  });

  beforeEach(() => {
    ddbMock.reset();
  });

  afterEach(() => {
    delete require.cache[require.resolve('../src/dynamodb')];
  });

  it('testing getTableData()', async () => {
    const { dynamodb } = require('../src/index');
    await dynamodb.getTableData({
      tableName: 'test_table',
      where: {
        email: 'user@mail.com',
      },
    });
  });

  it('testing getTableData() with indexName', async () => {
    const { dynamodb } = require('../src/index');
    await dynamodb.getTableData({
      tableName: 'test_table',
      where: {
        email: 'user@mail.com',
      },
      indexName: 'table-index',
      limit: 10,
      lastEvaluatedKey: {},
    });
  });

  it('testing getTableData() with limit', async () => {
    const { dynamodb } = require('../src/index');
    await dynamodb.getTableData({
      tableName: 'test_table',
      where: {
        email: 'user@mail.com',
      },
      limit: 10,
      lastEvaluatedKey: {},
    });
  });

  it('testing getTableData() with lastEvaluatedKey', async () => {
    const { dynamodb } = require('../src/index');
    await dynamodb.getTableData({
      tableName: 'test_table',
      where: {
        email: 'user@mail.com',
      },
      lastEvaluatedKey: {},
    });
  });
  
  it('testing getObject()', async () => {
    const { dynamodb } = require('../src/index');
    await dynamodb.get();
  });

  it('testing put()', async () => {
    const { dynamodb } = require('../src/index');
    await dynamodb.put();
  });

  it('testing update()', async () => {
    const { dynamodb } = require('../src/index');
    await dynamodb.update();
  });

  it('testing query()', async () => {
    const { dynamodb } = require('../src/index');
    await dynamodb.query();
  });

  it('testing with xray tracing enables', async () => {
    console.log('tracing: ' + process.env.xrayTracing);
    const { dynamodb } = require('../src/index');
    await dynamodb.get();
  });
});
