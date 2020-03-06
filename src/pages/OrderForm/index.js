import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdCheck, MdChevronLeft } from 'react-icons/md';

import api from '~/services/api';

import FormWrapper from '~/components/FormWrapper';
import Heading from '~/components/Heading';
import Select from '~/components/Select';
import Button from '~/components/Button';

export default function OrderForm({ history, match }) {
  const isCreate = match.url.includes('create');
  const [saving, setSaving] = useState(false);
  const [recipients, setRecipients] = useState([]);
  const [deliverymen, setDeliverymen] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [deliveryman, setDeliveryman] = useState('');
  const [product, setProduct] = useState('');
  const [orderId] = useState(match.params.order_id);

  useEffect(() => {
    async function fetchRecipients() {
      const response = await api.get('/recipients');

      const data = response.data.map((recipient) => ({
        value: recipient.id,
        label: recipient.name,
      }));

      if (isCreate) {
        setRecipients([
          {
            value: '',
            label: 'Select a recipient',
          },
          ...data,
        ]);
      } else {
        setRecipients(data);
      }
    }
    fetchRecipients();

    async function fetchDeliverymen() {
      const response = await api.get('/deliverymen');

      const data = response.data.map((deliveryman) => ({
        value: deliveryman.id,
        label: deliveryman.name,
      }));

      if (isCreate) {
        setDeliverymen([
          {
            value: '',
            label: 'Select a deliveryman',
          },
          ...data,
        ]);
      } else {
        setDeliverymen(data);
      }
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
    try {
      setSaving(true);
      if (isCreate) {
        await api.post('/orders', {
          recipient_id: recipient,
          deliveryman_id: deliveryman,
          product,
        });
        toast.success('Order successfully created!');
      } else {
        await api.put(`/orders/${orderId}`, {
          recipient_id: recipient,
          deliveryman_id: deliveryman,
          product,
        });
        toast.success('Order successfully saved!');
      }
      setSaving(false);
    } catch (err) {
      setSaving(false);
      console.tron.log('RESPONSE FAILED', err.data);
    }
  }

  return (
    <>
      <Heading title={isCreate ? 'New Order' : 'Edit Order'}>
        <Button
          click={() => history.push('/orders')}
          icon={<MdChevronLeft color="#fff" size={16} />}
        >
          Back
        </Button>
        <Button
          primary
          click={handleSubmit}
          icon={!saving && <MdCheck color="#fff" size={16} />}
        >
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </Heading>
      <FormWrapper>
        <form>
          <div className="row">
            <div className="col-half">
              <div className="input-control">
                <label>Recipient</label>
                <Select
                  name="recipient"
                  value={recipient}
                  change={(e) => handleRecipientChange(e)}
                  options={recipients}
                />
              </div>
            </div>
            <div className="col-half">
              <div className="input-control">
                <label>Deliveryman</label>
                <Select
                  name="deliveryman"
                  change={(e) => handleDeliverymanChange(e)}
                  value={deliveryman}
                  options={deliverymen}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-full">
              <div className="input-control">
                <label>Product Name:</label>
                <input
                  value={product}
                  name="product"
                  type="product"
                  onChange={(e) => handleProductChange(e)}
                  placeholder="Playstation 4"
                />
              </div>
            </div>
          </div>
        </form>
      </FormWrapper>
    </>
  );
}
