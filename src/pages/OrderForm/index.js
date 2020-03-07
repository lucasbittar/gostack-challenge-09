import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { MdCheck, MdChevronLeft } from 'react-icons/md';

import {
  orderCreateRequest,
  orderUpdateRequest,
} from '~/store/modules/order/actions';

import api from '~/services/api';

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
  const [recipients, setRecipients] = useState([]);
  const [deliverymen, setDeliverymen] = useState([]);
  const [product, setProduct] = useState('');
  const [recipient, setRecipient] = useState('');
  const [deliveryman, setDeliveryman] = useState('');
  const [orderId] = useState(match.params.order_id);

  const saving = useSelector((state) => state.order.saving);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchRecipients() {
      const response = await api.get('/recipients');

      const data = response.data.map((recipient) => ({
        id: recipient.id,
        title: recipient.name,
      }));

      setRecipients(data);
    }
    fetchRecipients();

    async function fetchDeliverymen() {
      const response = await api.get('/deliverymen');

      const data = response.data.map((deliveryman) => ({
        id: deliveryman.id,
        title: deliveryman.name,
      }));

      setDeliverymen(data);
    }
    fetchDeliverymen();

    async function fetchOrder() {
      const response = await api.get(`/orders/${orderId}`);

      const { product, recipient_id, deliveryman_id } = response.data;

      setProduct(product);
      setRecipient(recipient_id);
      setDeliveryman(deliveryman_id);
    }

    if (!isCreate) {
      fetchOrder();
    }
  }, [orderId, isCreate]);

  function handleProductChange(e) {
    setProduct(e.target.value);
  }

  function handleDeliverymanChange(e) {
    setDeliveryman(e.target.value);
  }

  function handleRecipientChange(e) {
    setRecipient(e.target.value);
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
            dispatch(orderUpdateRequest(orderId, order));
          }
        }
      });
  }

  return (
    <>
      <Heading title={isCreate ? 'New Order' : 'Edit Order'}>
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
                  onChange={(e) => handleRecipientChange(e)}
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
                  onChange={(e) => handleDeliverymanChange(e)}
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
                  onChange={(e) => handleProductChange(e)}
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
