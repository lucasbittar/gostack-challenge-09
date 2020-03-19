import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { MdCheck, MdChevronLeft } from 'react-icons/md';

import {
  deliverymanCreateRequest,
  deliverymanUpdateRequest,
  deliverymanFetchRequest,
  deliverymanInputChange,
} from '~/store/modules/deliveryman/actions';

import Button from '~/components/Button';
import FormWrapper from '~/components/FormWrapper';
import Heading from '~/components/Heading';
import AvatarInput from '~/components/AvatarInput';
import { Row, Column, InputControl } from '~/components/Layout';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Please type a valid email address')
    .required('Please type an email address'),
  name: Yup.string().required('Please type a name'),
});

export default function DeliverymanForm({ history, match }) {
  const isCreate = match.url.includes('create');
  const { deliveryman_id } = match.params;

  const saving = useSelector((state) => state.deliveryman.saving);
  const name = useSelector((state) => state.deliveryman.name);
  const email = useSelector((state) => state.deliveryman.email);
  const avatar = useSelector((state) => state.deliveryman.avatar);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchDeliveryman() {
      dispatch(deliverymanFetchRequest(deliveryman_id));
    }

    if (!isCreate) {
      fetchDeliveryman();
    } else {
      // Cleanup fields when creating new order
      const cleanupField = ['name', 'email'];
      cleanupField.forEach((field) => {
        dispatch(deliverymanInputChange(field, ''));
      });
      dispatch(deliverymanInputChange('avatar', null));
    }
  }, [deliveryman_id, isCreate, dispatch]);

  function handleInputChange(input, e) {
    dispatch(deliverymanInputChange(input, e.target.value));
  }

  async function handleSubmit() {
    schema
      .validate({
        name,
        email,
      })
      .catch(function(err) {
        toast.error(err.message);
      })
      .then(function(valid) {
        if (valid) {
          const deliveryman = {
            name,
            email,
            avatar_id: avatar ? avatar.id : null,
          };
          if (isCreate) {
            dispatch(deliverymanCreateRequest(deliveryman));
          } else {
            dispatch(deliverymanUpdateRequest(deliveryman_id, deliveryman));
          }
        }
      });
  }

  return (
    <>
      <Heading title={isCreate ? 'New Deliveryman' : 'Edit Deliveryman'}>
        <Button
          onClick={() => history.push('/deliverymen')}
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
          <AvatarInput avatar={avatar} name={isCreate ? '' : name} />
          <Row>
            <Column>
              <InputControl>
                <label>Name:</label>
                <input
                  name="name"
                  value={name}
                  onChange={(e) => handleInputChange('name', e)}
                  type="text"
                  placeholder="Joe Doe"
                />
              </InputControl>
            </Column>
          </Row>
          <Row>
            <Column>
              <InputControl>
                <label>Email:</label>
                <input
                  name="email"
                  value={email}
                  onChange={(e) => handleInputChange('email', e)}
                  type="email"
                  placeholder="myname@email.com"
                />
              </InputControl>
            </Column>
          </Row>
        </form>
      </FormWrapper>
    </>
  );
}
