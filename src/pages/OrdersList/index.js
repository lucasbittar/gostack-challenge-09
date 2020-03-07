import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import {
  MdMoreHoriz,
  MdRemoveRedEye,
  MdEdit,
  MdAdd,
  MdDeleteForever,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';

import api from '~/services/api';

import { Status } from './styles';

import { Actions, InputControl } from '~/components/Layout';

import Button from '~/components/Button';
import DataTable from '~/components/DataTable';
import Heading from '~/components/Heading';
import Pagination from '~/components/Pagination';
import Popover from '~/components/Popover';
import PopoverButton from '~/components/PopoverButton';
import Profile from '~/components/Profile';

export default function OrdersList({ history, match }) {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState('');
  const [query, setQuery] = useState('');
  const [queryInput] = useDebounce(query, 500);

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

  const renderProfile = (profile) => {
    const { name, avatar } = profile;
    return <Profile name={name} avatar={avatar ? avatar.url : null} />;
  };

  useEffect(() => {
    async function fetchOrders() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      const response = await api.get('/orders', {
        params: { page, search: queryInput !== '' ? queryInput : null },
      });

      const data = response.data.rows.map((order) => {
        const status = renderStatus(order);
        const profile = renderProfile(order.deliveryman);

        return {
          ...order,
          profile,
          status,
        };
      });

      setOrders(data);
      setTotalOrders(response.data.count);
    }

    fetchOrders();
  }, [page, queryInput]);

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

  async function handlePagination(action) {
    await setPage(action === 'prev' ? page - 1 : page + 1);
  }

  return (
    <>
      <Heading title="Orders" />
      <Actions>
        <InputControl noMargin autoWidth>
          <input
            type="text"
            placeholder="Find orders"
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputControl>
        <Button
          primary
          onClick={() => history.push('/orders/create')}
          icon={<MdAdd color="#fff" size={16} />}
        >
          New Order
        </Button>
      </Actions>
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
              <td>{order.profile}</td>
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
      {totalOrders > 10 && (
        <Pagination>
          <button
            disabled={page === 1}
            onClick={() => handlePagination('prev')}
          >
            <MdChevronLeft size={14} color="#fff" />
          </button>
          <button
            disabled={orders.length < 10}
            onClick={() => handlePagination('next')}
          >
            <MdChevronRight size={14} color="#fff" />
          </button>
        </Pagination>
      )}
    </>
  );
}
