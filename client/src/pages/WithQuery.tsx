import React, { useEffect, useState } from 'react';
import Page from '../components/Page';
import AutoQuery from '../components/AutoQuery';
import { Gender } from '../types';
import { useList } from '../api';
import Table from '../components/Table';

const Without = () => {
  const [gender, setGender] = useState<Gender>('');
  const { data, isError, isFetching, isLoading, isSuccess } = useList({
    gender,
    // polling: 0
  });
  return (
    <Page title="with react-query">
      <select
        onChange={(e) => {
          setGender(e.target.value as Gender);
        }}
      >
        <option value="">all</option>
        <option value="male">male</option>
        <option value="female">female</option>
      </select>
      <div style={{ display: 'flex', gap: '4ch' }}>
        <Table
          {...{ isError, isLoading: isLoading || isFetching, isSuccess, data }}
        />
        <Table
          {...{ isError, isLoading: isLoading || isFetching, isSuccess, data }}
        />
      </div>
    </Page>
  );
};

export default Without;
