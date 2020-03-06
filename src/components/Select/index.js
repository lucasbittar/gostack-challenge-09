import React from 'react';
import { MdExpandMore } from 'react-icons/md';

import { SelectWrapper } from './styles';

export default function Select({ options, value, change }) {
  return (
    <SelectWrapper>
      <select
        value={value}
        className={value !== '' ? 'active' : null}
        onChange={(e) => change(e)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <MdExpandMore color="#ddd" size={26} />
    </SelectWrapper>
  );
}
