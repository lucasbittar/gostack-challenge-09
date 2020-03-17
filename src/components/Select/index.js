import React from 'react';
import Select from 'react-select';
import { transparentize } from 'polished';
// import { MdExpandMore } from 'react-icons/md';

import { SelectWrapper } from './styles';

export default function SelectInput({
  options,
  value,
  name,
  placeholder,
  onChange,
}) {
  const selected = options.filter((o) => {
    return o.value === value;
  });

  const selectStyle = {
    control: (styles) => ({
      backgroundColor: 'white',
      border: '1px solid #ddd',
      height: '45px',
      borderRadius: '4px',
      transition: 'all 300ms ease-out',
      ':hover': {
        ...styles[':hover'],
        borderColor: '#444',
      },
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        fontSize: '16px',
        ':hover': {
          backgroundColor: transparentize(0.8, '#7159c1'),
        },
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? transparentize(0.5, '#7159c1')
          : isFocused
          ? transparentize(0.9, '#7159c1')
          : null,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? '#111'
          : isFocused
          ? 'black'
          : null,
      };
    },
    input: () => ({
      fontSize: '16px',
      input: {
        height: '43px !important',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    valueContainer: () => ({
      padding: '0 10px',
      fontSize: '16px',
    }),
    placeholder: (styles) => ({
      ...styles,
      fontSize: '16px',
      color: '#757575',
    }),
  };

  return (
    <SelectWrapper>
      <Select
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
        value={selected}
        styles={selectStyle}
        name={name}
        options={options}
      />
    </SelectWrapper>
  );
}

/*
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
      <MdExpandMore color="#ddd" size={26} />
    </SelectWrapper>
  );
}
  */
