import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { MdCheck, MdChevronLeft } from 'react-icons/md';

import {
  orderCreateRequest,
  orderUpdateRequest,
  orderFetchRequest,
  orderInputChange,
} from '~/store/modules/order/actions';

import { recipientFetchAllRequest } from '~/store/modules/recipient/actions';
import { deliverymanFetchAllRequest } from '~/store/modules/deliveryman/actions';

import Button from '~/components/Button';
import FormWrapper from '~/components/FormWrapper';
import Heading from '~/components/Heading';
import Select from '~/components/Select';
import { Row, Column, InputControl } from '~/components/Layout';

const schema = Yup.object().shape({
  product: Yup.string().required('Please give a product name'),
  deliveryman: Yup.string().required('Please choose a deliveryman'),
  recipient: Yup.string().required('Please choose a recipient'),
});

export default function OrderForm({ history, match }) {
  const isCreate = match.url.includes('create');
  const { order_id } = match.params;

  const saving = useSelector((state) => state.order.saving);
  const product = useSelector((state) => state.order.product);
  const deliveryman = useSelector((state) => state.order.deliveryman);
  const recipient = useSelector((state) => state.order.recipient);
  const recipients = useSelector((state) =>
    state.recipient.recipients.map((r) => ({
      value: r.id,
      label: r.name,
    }))
  );
  const deliverymen = useSelector((state) =>
    state.deliveryman.deliverymen.map((d) => ({
      value: d.id,
      label: d.name,
    }))
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchRecipients() {
      dispatch(recipientFetchAllRequest());
    }
    fetchRecipients();

    async function fetchDeliverymen() {
      dispatch(deliverymanFetchAllRequest());
    }
    fetchDeliverymen();

    async function fetchOrder() {
      dispatch(orderFetchRequest(order_id));
    }

    if (!isCreate) {
      fetchOrder();
    } else {
      // Cleanup fields when creating new order
      const cleanupField = ['product', 'deliveryman', 'recipient'];
      cleanupField.forEach((field) => {
        dispatch(orderInputChange(field, ''));
      });
    }
  }, [order_id, isCreate, dispatch]);

  function handleInputChange(input, e) {
    dispatch(orderInputChange(input, e.target.value));
  }

  function handleSelectChange(input, e) {
    dispatch(orderInputChange(input, e.value));
  }

  async function handleSubmit() {
    schema
      .validate({
        product,
        recipient,
        deliveryman,
      })
      .catch(function(err) {
        toast.error(err.message);
      })
      .then(function(valid) {
        if (valid) {
          const order = {
            recipient_id: recipient,
            deliveryman_id: deliveryman,
            product,
          };
          if (isCreate) {
            dispatch(orderCreateRequest(order));
          } else {
            dispatch(orderUpdateRequest(order_id, order));
          }
        }
      });
  }

  return (
    <>
      <Heading title={isCreate ? 'Create Order' : 'Edit Order'}>
        <Button
          onClick={() => history.push('/orders')}
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
            <Column size={50}>
              <InputControl>
                <label>Recipient</label>
                <Select
                  name="recipient"
                  value={recipient}
                  onChange={(e) => handleSelectChange('recipient', e)}
                  placeholder="Select a recipient"
                  options={recipients}
                />
              </InputControl>
            </Column>
            <Column size={50}>
              <InputControl>
                <label>Deliveryman</label>
                <Select
                  name="deliveryman"
                  value={deliveryman}
                  onChange={(e) => handleSelectChange('deliveryman', e)}
                  placeholder="Select a deliveryman"
                  options={deliverymen}
                />
              </InputControl>
            </Column>
          </Row>
          <Row>
            <Column>
              <InputControl>
                <label>Product Name:</label>
                <input
                  name="product"
                  value={product}
                  onChange={(e) => handleInputChange('product', e)}
                  type="text"
                  placeholder="Playstation 4"
                />
              </InputControl>
            </Column>
          </Row>
        </form>
      </FormWrapper>
    </>
  );
}
