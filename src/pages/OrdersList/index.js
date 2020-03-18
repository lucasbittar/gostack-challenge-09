import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { useDebounce } from 'use-debounce';
import {
  MdAdd,
  MdChevronLeft,
  MdChevronRight,
  MdDeleteForever,
  MdEdit,
  MdMoreHoriz,
  MdRemoveRedEye,
  MdSearch,
} from 'react-icons/md';

import {
  orderFetchAllRequest,
  orderRemoveRequest,
} from '~/store/modules/order/actions';
import { openOverlay, closeOverlay } from '~/store/modules/overlay/actions';

import { Status, ToggleFilter } from './styles';

import { Actions, InputControl, NotFound } from '~/components/Layout';

import Button from '~/components/Button';
import DataTable from '~/components/DataTable';
import Heading from '~/components/Heading';
import OverlayDetails from '~/components/OverlayDetails';
import OverlayRemove from '~/components/OverlayRemove';
import Pagination from '~/components/Pagination';
import Popover from '~/components/Popover';
import PopoverButton from '~/components/PopoverButton';
import Profile from '~/components/Profile';

export default function OrdersList({ history, match }) {
  const [page, setPage] = useState(1);
  const [withIssues, setWithIssues] = useState(null);
  const [query, setQuery] = useState('');
  const [queryInput] = useDebounce(query, 500);

  const dispatch = useDispatch();

  const renderStatus = (order) => {
    const { canceled_at, start_date, end_date } = order;
    if (canceled_at !== null)
      return <Status status="canceled">Canceled</Status>;
    if (start_date === null && canceled_at === null)
      return <Status status="pending">Pending</Status>;
    if (end_date !== null && canceled_at === null)
      return <Status status="delivered">Delivered</Status>;
    if (start_date && end_date === null)
      return <Status status="pickedup">In transit</Status>;
  };

  const renderProfile = (profile) => {
    const { name, avatar } = profile;
    return <Profile name={name} avatar={avatar ? avatar.url : null} />;
  };

  const renderDetails = (order) => {
    return (
      <OverlayDetails>
        {order.canceled_at !== null && (
          <h4>
            <span>
              This order was canceled on{' '}
              {format(new Date(order.canceled_at), "PPP 'at' p")}
            </span>
          </h4>
        )}
        <strong>Order Info</strong>
        <p>
          {order.recipient.address}, {order.recipient.number}
          {order.recipient.address_2 !== '' &&
            ` - ${order.recipient.address_2}`}
        </p>
        <p>
          {order.recipient.city} - {order.recipient.state}
        </p>
        <p>{order.recipient.zip_code}</p>
        <hr />
        <strong>Delivery dates:</strong>
        <p>
          <strong>Pickup:</strong>{' '}
          {order.start_date !== null
            ? format(new Date(order.start_date), 'dd/mm/yyyy')
            : "Hasn't been picked up yet."}
        </p>
        <p>
          <strong>Delivered:</strong>{' '}
          {order.end_date !== null
            ? format(new Date(order.end_date), 'dd/mm/yyyy')
            : "Hasn't been delivered yet."}
        </p>
        {order.signature !== null && (
          <>
            <hr />
            <strong>Recipient signature</strong>
            <img src={order.signature.url} alt={order.recipient.name} />
          </>
        )}
      </OverlayDetails>
    );
  };

  const renderRemove = (id) => {
    return (
      <OverlayRemove>
        <h3>Are you sure?</h3>
        <p>Confirming this action will remove this order permanently.</p>
        <footer>
          <Button onClick={() => dispatch(closeOverlay())}>Cancel</Button>
          <Button primary onClick={() => dispatch(orderRemoveRequest(id))}>
            Yes, I'm sure
          </Button>
        </footer>
      </OverlayRemove>
    );
  };

  const ordersTotal = useSelector((state) => state.order.ordersTotal);

  const orders = useSelector((state) =>
    state.order.orders.map((orderItem) => {
      const status = renderStatus(orderItem);
      const profile = renderProfile(orderItem.deliveryman);

      return {
        ...orderItem,
        profile,
        status,
      };
    })
  );

  useEffect(() => {
    async function fetchOrders() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });

      const ordersParams = {
        withIssues,
        page,
        search: queryInput !== '' ? queryInput : null,
      };

      dispatch(orderFetchAllRequest(ordersParams));
    }

    fetchOrders();
  }, [page, queryInput, withIssues, dispatch]);

  function handleActionClick(action, id) {
    const { url } = match;
    switch (action) {
      case 'edit':
        history.push(`${url}/edit/${id}`);
        break;
      case 'view':
        dispatch(openOverlay(renderDetails(id)));
        break;
      case 'remove':
        dispatch(openOverlay(renderRemove(id)));
        break;
      default:
        history.push(url);
    }
  }

  function toggleOrdersWithIssues() {
    setPage(1);
    setWithIssues(!withIssues);
  }

  function handlePagination(action) {
    setPage(action === 'prev' ? page - 1 : page + 1);
  }

  return (
    <>
      <Heading title="Manage Orders" />
      <Actions>
        <InputControl noMargin autoWidth iconLeft>
          <input
            type="text"
            placeholder="Find orders"
            onChange={(e) => setQuery(e.target.value)}
          />
          <MdSearch color="#999" size={21} />
        </InputControl>
        <ToggleFilter active={withIssues} onClick={toggleOrdersWithIssues}>
          Orders with issues
        </ToggleFilter>
        <Button
          primary
          onClick={() => history.push('/orders/create')}
          icon={<MdAdd color="#fff" size={16} />}
        >
          New
        </Button>
      </Actions>
      {ordersTotal !== 0 ? (
        <>
          <DataTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
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
                  <td>{order.product}</td>
                  <td>{order.recipient.name}</td>
                  <td>{order.profile}</td>
                  <td>{order.recipient.city}</td>
                  <td>{order.recipient.state}</td>
                  <td>{order.status}</td>
                  <td>
                    <Popover trigger={<MdMoreHoriz color="#666" size={18} />}>
                      <PopoverButton
                        clickAction={() => handleActionClick('view', order)}
                        icon={<MdRemoveRedEye color="#8E5BE8" size={16} />}
                        label="View"
                      />
                      {order.canceled_at === null && (
                        <PopoverButton
                          clickAction={() =>
                            handleActionClick('edit', order.id)
                          }
                          icon={<MdEdit color="#4D85EE" size={16} />}
                          label="Edit"
                        />
                      )}
                      <PopoverButton
                        clickAction={() =>
                          handleActionClick('remove', order.id)
                        }
                        icon={<MdDeleteForever color="#DE3B3B" size={16} />}
                        label="Remove"
                      />
                    </Popover>
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
          {ordersTotal > 10 && (
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
      ) : (
        <NotFound>No results were found. Try another query.</NotFound>
      )}
    </>
  );
}
