import React, { useEffect } from 'react';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { MdCheck, MdChevronLeft } from 'react-icons/md';

import {
  recipientCreateRequest,
  recipientUpdateRequest,
  recipientFetchRequest,
  recipientInputChange,
} from '~/store/modules/recipient/actions';

import Button from '~/components/Button';
import FormWrapper from '~/components/FormWrapper';
import Heading from '~/components/Heading';
import { Row, Column, InputControl } from '~/components/Layout';

const schema = Yup.object().shape({
  zip_code: Yup.string().required('Please type a zip code'),
  state: Yup.string().required('Please type a state'),
  city: Yup.string().required('Please type a city'),
  number: Yup.string().required('Please type a number'),
  address: Yup.string().required('Please type an address'),
  name: Yup.string().required('Please type a name'),
});

export default function RecipientForm({ history, match }) {
  const isCreate = match.url.includes('create');
  const { recipient_id } = match.params;

  const saving = useSelector((state) => state.recipient.saving);
  const current = useSelector((state) => state.recipient.current);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchRecipient() {
      dispatch(recipientFetchRequest(recipient_id));
    }

    if (!isCreate) {
      fetchRecipient();
    } else {
      // Cleanup fields when creating new order
      const cleanupField = [
        'name',
        'address',
        'number',
        'address_2',
        'city',
        'state',
        'zip_code',
      ];
      cleanupField.forEach((field) => {
        dispatch(recipientInputChange(field, ''));
      });
    }
  }, [recipient_id, isCreate, dispatch]);

  function handleInputChange(input, e) {
    dispatch(recipientInputChange(input, e.target.value));
  }

  async function handleSubmit() {
    schema
      .validate(current)
      .catch(function(err) {
        toast.error(err.message);
      })
      .then(function(valid) {
        if (valid) {
          const recipient = current;
          if (isCreate) {
            dispatch(recipientCreateRequest(recipient));
          } else {
            dispatch(recipientUpdateRequest(recipient_id, recipient));
          }
        }
      });
  }

  return (
    <>
      <Heading title={isCreate ? 'New Recipient' : 'Edit Recipient'}>
        <Button
          onClick={() => history.push('/recipients')}
          icon={<MdChevronLeft color="#fff" size={16} />}
        >
          Back
        </Button>
        <Button
          primary
          onClick={handleSubmit}
          icon={!saving && <MdCheck color="#fff" size={16} />}
        >
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </Heading>
      <FormWrapper>
        <form schema={schema}>
          <Row>
            <Column>
              <InputControl>
                <label>Name</label>
                <input
                  name="name"
                  value={current.name}
                  onChange={(e) => handleInputChange('name', e)}
                  type="text"
                  placeholder="Joe Doe"
                />
              </InputControl>
            </Column>
          </Row>
          <Row>
            <Column size={60}>
              <InputControl>
                <label>Address</label>
                <input
                  name="address"
                  value={current.address}
                  onChange={(e) => handleInputChange('address', e)}
                  type="text"
                  placeholder="Beethoven St"
                />
              </InputControl>
            </Column>
            <Column size={20}>
              <InputControl>
                <label>Number</label>
                <input
                  name="number"
                  value={current.number}
                  onChange={(e) => handleInputChange('number', e)}
                  type="text"
                  placeholder="1729"
                />
              </InputControl>
            </Column>
            <Column size={20}>
              <InputControl>
                <label>Address 2</label>
                <input
                  name="address_2"
                  value={current.address_2}
                  onChange={(e) => handleInputChange('address_2', e)}
                  type="text"
                />
              </InputControl>
            </Column>
          </Row>
          <Row>
            <Column size={33}>
              <InputControl>
                <label>City</label>
                <input
                  name="city"
                  value={current.city}
                  onChange={(e) => handleInputChange('city', e)}
                  type="text"
                  placeholder="Diadema"
                />
              </InputControl>
            </Column>
            <Column size={33}>
              <InputControl>
                <label>State</label>
                <input
                  name="state"
                  value={current.state}
                  onChange={(e) => handleInputChange('state', e)}
                  type="text"
                  placeholder="São Paulo"
                />
              </InputControl>
            </Column>
            <Column size={33}>
              <InputControl>
                <label>Zip code</label>
                <InputMask
                  name="zip_code"
                  value={current.zip_code}
                  onChange={(e) => handleInputChange('zip_code', e)}
                  type="text"
                  mask="99999-999"
                  placeholder="09960-580"
                />
              </InputControl>
            </Column>
          </Row>
        </form>
      </FormWrapper>
    </>
  );
}
