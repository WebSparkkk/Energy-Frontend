import { ComponentProps, forwardRef } from 'react';
import { default as ReactSelect } from 'react-select';
import { getSelectStyles } from './constants';

type TSelectOption = {
  value: string;
  label: string;
  other?: any;
};

export type TSelectProps = {
  options: TSelectOption[];
} & ComponentProps<typeof ReactSelect>;  

export const Select = forwardRef<any, TSelectProps>(({ options, ...props }, ref) => {
  return (
    <ReactSelect 
      {...props}
      ref={ref} 
      options={options}
      styles={getSelectStyles("sync")}
    />
  );
});

