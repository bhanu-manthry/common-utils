/**
 * Wrapper functions for handling AWS Cognito related operations
 */

const {
  CognitoIdentityProviderClient,
  AdminGetUserCommand,
  AdminUpdateUserAttributesCommand,
  AdminAddUserToGroupCommand,
  ConfirmSignUpCommand,
  AdminDeleteUserCommand,
  AdminCreateUserCommand,
  AdminRemoveUserFromGroupCommand,
  ListUsersInGroupCommand,
} = require('@aws-sdk/client-cognito-identity-provider');
const AWSXRay = require('aws-xray-sdk-core');
const log = require('lambda-log');

log.options.debug = process.env.debug === 'true';

const client = AWSXRay.captureAWSv3Client(new CognitoIdentityProviderClient());

/**
 * @param {import('@aws-sdk/client-cognito-identity-provider').AdminGetUserCommandInput} params
 * @returns {Promise<import('@aws-sdk/client-cognito-identity-provider').AdminGetUserCommandOutput>}
 */
async function adminGetUser(params) {
  const object = await client.send(new AdminGetUserCommand(params));
  return object;
}

/**
 * @param {import('@aws-sdk/client-cognito-identity-provider').AdminUpdateUserAttributesCommandInput} params
 * @returns {Promise<import('@aws-sdk/client-cognito-identity-provider').AdminUpdateUserAttributesCommandOutput>}
 */
async function adminUpdateUserAttributes(params) {
  log.info('Updating params...');
  log.info(params);
  const object = await client.send(new AdminUpdateUserAttributesCommand(params));
  return object;
}

/**
 * @param {import('@aws-sdk/client-cognito-identity-provider').AdminAddUserToGroupCommandInput} params
 * @returns {Promise<import('@aws-sdk/client-cognito-identity-provider').AdminAddUserToGroupCommandOutput>}
 */
async function adminAddUserToGroup(params) {
  log.info('In adminAddUserToGroup');
  log.info(params);
  const object = await client.send(new AdminAddUserToGroupCommand(params));
  return object;
}

/**
 * @param {import('@aws-sdk/client-cognito-identity-provider').AdminRemoveUserFromGroupCommandInput} params
 * @returns {Promise<import('@aws-sdk/client-cognito-identity-provider').AdminRemoveUserFromGroupCommandOutput>}
 */
async function adminRemoveUserFromGroup(params) {
  log.info('In adminAdminRemoveUserFromGroup');
  log.info(params);
  const object = await client.send(new AdminRemoveUserFromGroupCommand(params));
  return object;
}

/**
 * @param {import('@aws-sdk/client-cognito-identity-provider').ListUsersInGroupCommandInput} params
 * @returns {Promise<import('@aws-sdk/client-cognito-identity-provider').ListUsersInGroupCommandOutput>}
 */
async function listUsersInGroup(params) {
  log.info('In adminAdminRemoveUserFromGroup');
  log.info(params);
  const object = await client.send(new ListUsersInGroupCommand(params));
  return object;
}

/**
 * @param {import('@aws-sdk/client-cognito-identity-provider').AdminCreateUserCommandInput} params
 * @returns {Promise<import('@aws-sdk/client-cognito-identity-provider').AdminCreateUserCommandOutput>}
 */
async function adminCreateUser(params) {
  const object = await client.send(new AdminCreateUserCommand(params));
  return object;
}

/**
 * @param {import('@aws-sdk/client-cognito-identity-provider').AdminDeleteUserCommandInput} params
 * @returns {Promise<import('@aws-sdk/client-cognito-identity-provider').AdminDeleteUserCommandOutput>}
 */
async function adminDeleteUser(params) {
  const object = await client.send(new AdminDeleteUserCommand(params));
  return object;
}

/**
 * @param {import('@aws-sdk/client-cognito-identity-provider').ConfirmSignUpCommandInput} params
 * @returns {Promise<import('@aws-sdk/client-cognito-identity-provider').ConfirmSignUpCommandOutput>}
 */
async function confirmSignup(params) {
  log.info('Updating params...');
  log.info(params);
  const object = await client.send(new ConfirmSignUpCommand(params));
  return object;
}

module.exports = {
  adminGetUser,
  adminUpdateUserAttributes,
  adminAddUserToGroup,
  adminRemoveUserFromGroup,
  confirmSignup,
  adminCreateUser,
  adminDeleteUser,
  listUsersInGroup,
};
