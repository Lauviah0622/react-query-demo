import React, { useEffect, useState } from 'react';
import Page from '../components/Page';
import Table from '../components/Table';
import { Datum, Gender } from '../types';
import { getList } from '../api';

const Comp = ({ gender }: { gender: Gender }) => {
  const [list, setList] = useState<Datum[]>([]);
  // -1 error, 0 idle, 1 loading, 2 success
  const [status, setStatus] = useState(0);

  console.log('gender render', gender);
  

  useEffect(() => {
    const fetch = async () => {
      console.log('gender', gender);
      // console.log();

      if (status !== 1) {
        setStatus(1);
        try {
          const data = await getList({ gender, polling: 0, wait: 1000 });

          setList(data);

          setStatus(2);
        } catch {
          setStatus(-1);
        }
      }
    };
    fetch();
  }, [gender]);

  return (
    <div>
      <Table
        {...{
          data: list,
          isError: status === -1,
          isLoading: status === 1,
          isSuccess: status === 2,
        }}
      />
    </div>
  );
};

const Without = () => {
  const [gender, setGender] = useState<Gender>('');
  return (
    <Page title="without react query">
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
        <Comp gender={gender} />
        <Comp gender={gender} />
      </div>
    </Page>
  );
};

export default Without;
