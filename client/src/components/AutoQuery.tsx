import React, { useEffect, useState } from 'react';
import Table from '../components/Table';
import { Datum, Gender } from '../types';
import { useList } from '../api';

const Comp = ({
  gender = '',
  polling = 3,
}: {
  gender?: Gender;
  polling?: number;
}) => {
  const { data, isError, isLoading, isSuccess } = useList({ gender, polling });

  return (
    <div>
      {isError && <h2>Error</h2>}
      {isLoading && <h2>Loading</h2>}
      {isSuccess && <Table data={data} />}
    </div>
  );
};

export default Comp;
