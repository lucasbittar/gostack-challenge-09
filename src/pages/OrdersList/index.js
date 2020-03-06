import React, { useState, useEffect } from 'react';
import {
  MdMoreHoriz,
  MdRemoveRedEye,
  MdEdit,
  MdAdd,
  MdDeleteForever,
} from 'react-icons/md';

import api from '~/services/api';

import { Status } from './styles';

import Button from '~/components/Button';
import DataTable from '~/components/DataTable';
import Heading from '~/components/Heading';
import Popover from '~/components/Popover';
import PopoverButton from '~/components/PopoverButton';

export default function OrdersList({ history, match }) {
  const [orders, setOrders] = useState([]);

  const renderStatus = (order) => {
    const { canceled_at, start_date, end_date } = order;
    if (canceled_at !== null)
      return <Status status="canceled">Canceled</Status>;
    if (start_date === null && canceled_at === null)
      return <Status status="pending">Pending</Status>;
    if (end_date !== null && canceled_at === null)
      return <Status status="delivered">Delivered</Status>;
    if (start_date && end_date === null)
      return <Status status="pickedup">Picked up</Status>;
  };

  useEffect(() => {
    async function fetchOrders() {
      const response = await api.get('/orders');

      const data = response.data.map((order) => {
        const status = renderStatus(order);

        return {
          ...order,
          status,
        };
      });

      setOrders(data);
    }

    fetchOrders();
  }, []);

  function handleActionClick(action, id) {
    const { url } = match;
    switch (action) {
      case 'edit':
        history.push(`${url}/edit/${id}`);
        break;
      default:
        history.push(url);
    }
  }

  return (
    <>
      <Heading title="Orders">
        <Button
          primary
          click={() => history.push('/orders/create')}
          icon={<MdAdd color="#fff" size={16} />}
        >
          New Order
        </Button>
      </Heading>
      <DataTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Recipient</th>
            <th>Deliveryman</th>
            <th>City</th>
            <th>State</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.recipient.name}</td>
              <td>{order.deliveryman.name}</td>
              <td>{order.recipient.city}</td>
              <td>{order.recipient.state}</td>
              <td>{order.status}</td>
              <td>
                <Popover trigger={<MdMoreHoriz color="#666" size={18} />}>
                  <PopoverButton
                    clickAction={() => handleActionClick('view', order.id)}
                    icon={<MdRemoveRedEye color="#8E5BE8" size={16} />}
                    label="View"
                  />
                  <PopoverButton
                    clickAction={() => handleActionClick('edit', order.id)}
                    icon={<MdEdit color="#4D85EE" size={16} />}
                    label="Edit"
                  />
                  <PopoverButton
                    clickAction={() => handleActionClick('remove', order.id)}
                    icon={<MdDeleteForever color="#DE3B3B" size={16} />}
                    label="Remove"
                  />
                </Popover>
              </td>
            </tr>
          ))}
        </tbody>
      </DataTable>
      <ul />
    </>
  );
}

