import React from 'react';
import { act, renderHook } from '@testing-library/react';
import useDebaunce from './useDebaunce';

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

it('debaunce value request', async () => {
  const INITIAL_VALUE: string = 'value';
  const TIMEOUT: number = 30;
  const { result } = renderHook(() => useDebaunce(INITIAL_VALUE, TIMEOUT));
  expect(result).toBe('');
  await act(() => sleep(TIMEOUT));
  expect(result).toBe(INITIAL_VALUE);
});
