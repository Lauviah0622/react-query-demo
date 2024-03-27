import React, { useEffect, useState } from 'react';
import Page from '../components/Page';
import AutoQuery from '../components/AutoQuery';
// import { mutate } from '../api';
import { useList, useUpdateList } from '../api';
import Table from '../components/Table';
import { Input, Checkbox, Text, Button } from '@chakra-ui/react';

const Mutation = () => {
  const { data, isError, isFetching, isLoading, isSuccess } = useList({
    wait: 2000,
  });
  const [id, setIndex] = useState(0);
  const [fullName, setName] = useState('');
  const [shouldDirectChange, setShouldDirectChange] = useState(false);
  const [shouldFail, setShouldFail] = useState(false);
  const { mutate } = useUpdateList(
    { id, fail: shouldFail },
    shouldDirectChange
  );
  return (
    <Page title="">
      <div>
        <Text as="span">
          shouldDirectChange:{' '}
          <Checkbox
            onChange={(e) => {
              setShouldDirectChange(e.target.checked);
            }}
            checked={shouldDirectChange}
          ></Checkbox>
        </Text>
        <Text as="span">
          should Fail:{' '}
          <Checkbox
            onChange={(e) => {
              setShouldFail(e.target.checked);
            }}
            checked={shouldFail}
          ></Checkbox>
        </Text>
      </div>
      <div>
        <span>change </span>
        <Input
          value={id}
          width="auto"
          onChange={(e) => {
            setIndex(+e.target.value as number);
          }}
        />
        <span>'s first name to be </span>
        <Input
          value={fullName}
          width="auto"
          onChange={(e) => {
            setName(e.target.value as string);
          }}
        />
        <Button
          onClick={() => {
            mutate({ fullName });
          }}
        >
          mutate
        </Button>
      </div>{' '}
      <div>
        <Table
          {...{ isError, isLoading: isLoading || isFetching, isSuccess, data }}
        />
      </div>
    </Page>
  );
};

export default Mutation;
