import React from 'react';
import { MdExpandMore } from 'react-icons/md';

import { SelectWrapper } from './styles';

export default function SelectInput({
  options,
  value,
  name,
  placeholder,
  onChange,
}) {
  return (
    <SelectWrapper>
      <select
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
        className={value !== '' ? 'active' : null}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.title}
          </option>
        ))}
      </select>
      {/*
      <Select
        name={name}
        placeholder={placeholder}
        options={options}
        onChange={handleSelectChange}
        className={active || populated === 'true' ? 'active' : null}
      />
      */}
      <MdExpandMore color="#ddd" size={26} />
    </SelectWrapper>
  );
}
