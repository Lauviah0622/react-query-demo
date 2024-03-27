import { Datum, Gender } from './types';
import qs from 'query-string';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

export const getList = async (query: Record<string, any>) => {
  query.wait ??= 500;
  query.gender ??= '';
  query.polling ??= 3;

  console.log('query', query);

  const queryString = qs.stringify(query);

  const endpoint = `http://localhost:3000/list?${queryString}`;
  const response = await fetch(endpoint);
  console.log(response);
  if (!response.ok) {
    throw new Error('gg');
  }

  const data: Datum[] = await response.json();
  return data;
};

export const useList = (param: Record<string, any>) => {
  const toast = useToast();

  const query = useQuery(
    ['list', param.gender],
    () =>
      getList(param).catch((err) => {
        toast({
          title: 'get Error',
          status: 'error',
          position: 'bottom-left'
        });

        return Promise.reject(err)
      }),
    {
      staleTime: 0,
      retry: 10,
      retryDelay: (attemptIndex) => Math.min(250 * 2 ** attemptIndex, 30000),
      onSuccess: () => {
        toast({
          title: 'get Success',
          status: 'success',
          position: 'bottom-left'
        });
      },
    }
  );

  return query;
};

export const mutate = async (
  query: Record<string, any>,
  info: Partial<Datum>
) => {
  const queryString = qs.stringify(query);
  const endpoint = `http://localhost:3000/list?${queryString}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info),
  });
  const data: Datum = await response.json();

  return data;
};

export const useUpdateList = (
  query: { id: number; fail: boolean },
  shouldDirectChange,
  gender
) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (info: Partial<Datum>) => mutate(query, info),
    onError: () => {
      toast({
        title: 'mutate GG',
        status: 'error',
        position: 'bottom-left'
      });
    },
    onSuccess: (newDatum) => {
      toast({
        title: 'mutate Success',
        status: 'success',
        position: 'bottom-left'
      });
      console.log('gender', gender);
      if (shouldDirectChange) {
        queryClient.setQueryData(['list', gender], (data: Datum[]) => {
          const next = [...data];
          next[newDatum.id] = newDatum;
          return next;
        });
      }

      queryClient.invalidateQueries({
        queryKey: ['list'],
      });
    },
  });
};
