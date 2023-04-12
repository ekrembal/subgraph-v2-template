import { ethereum, BigInt, Bytes } from '@graphprotocol/graph-ts';
import { assert } from 'matchstick-as';
import { getTokenTypeEnum } from '../../src/token';
import {
  bigIntToBytes,
  padHexStringToEven,
  padHexTo32BytesStart,
} from '../../src/utils';

export const assertCommonFields = (
  entityType: string,
  id: string,
  event: ethereum.Event,
): void => {
  assert.fieldEquals(
    entityType,
    id,
    'blockNumber',
    event.block.number.toString(),
  );

  assert.fieldEquals(
    entityType,
    id,
    'blockTimestamp',
    event.block.timestamp.toString(),
  );

  assert.fieldEquals(
    entityType,
    id,
    'transactionHash',
    event.transaction.hash.toHexString(),
  );
};

export const assertCommonCommitmentFields = (
  entityType: string,
  id: string,
  event: ethereum.Event,
  treeNumber: BigInt,
  startPosition: BigInt,
  i: BigInt,
  hash: BigInt,
): void => {
  assertCommonFields(entityType, id, event);

  assert.fieldEquals(entityType, id, 'treeNumber', treeNumber.toString());

  assert.fieldEquals(
    entityType,
    id,
    'treePosition',
    startPosition.plus(i).toString(),
  );

  assert.fieldEquals(
    entityType,
    id,
    'hash',
    Bytes.fromHexString(padHexTo32BytesStart(hash.toHexString())).toHexString(),
  );
};

export const assertTokenFields = (
  tokenHash: string,
  tuple: ethereum.Tuple,
): void => {
  const tokenType = tuple[0].toI32();
  const tokenAddress = tuple[1].toAddress();
  const tokenSubID = tuple[2].toBigInt();

  assert.fieldEquals(
    'Token',
    tokenHash,
    'tokenType',
    getTokenTypeEnum(tokenType),
  );
  assert.fieldEquals(
    'Token',
    tokenHash,
    'tokenAddress',
    tokenAddress.toHexString(),
  );
  assert.fieldEquals(
    'Token',
    tokenHash,
    'tokenSubID',
    padHexStringToEven(tokenSubID.toHexString()),
  );
};
