import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDebounce } from 'use-debounce';
import {
  MdAdd,
  MdChevronLeft,
  MdChevronRight,
  MdDeleteForever,
  MdEdit,
  MdMoreHoriz,
  MdSearch,
} from 'react-icons/md';

import {
  recipientFetchAllRequest,
  recipientRemoveRequest,
} from '~/store/modules/recipient/actions';
import { openOverlay, closeOverlay } from '~/store/modules/overlay/actions';

import { Actions, InputControl, NotFound } from '~/components/Layout';

import Button from '~/components/Button';
import DataTable from '~/components/DataTable';
import Heading from '~/components/Heading';
import OverlayRemove from '~/components/OverlayRemove';
import Pagination from '~/components/Pagination';
import Popover from '~/components/Popover';
import PopoverButton from '~/components/PopoverButton';

export default function RecipientsList({ history, match }) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [queryInput] = useDebounce(query, 500);

  const dispatch = useDispatch();

  const renderRemove = (id) => {
    return (
      <OverlayRemove>
        <h3>Are you sure?</h3>
        <p>Confirming this action will remove this recipient permanently.</p>
        <footer>
          <Button onClick={() => dispatch(closeOverlay())}>Cancel</Button>
          <Button primary onClick={() => dispatch(recipientRemoveRequest(id))}>
            Yes, I'm sure
          </Button>
        </footer>
      </OverlayRemove>
    );
  };

  const deliverymenTotal = useSelector(
    (state) => state.recipient.deliverymenTotal
  );

  const recipients = useSelector((state) => state.recipient.recipients);

  useEffect(() => {
    async function fetchOrders() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });

      const recipientsParams = {
        page,
        search: queryInput !== '' ? queryInput : null,
      };

      dispatch(recipientFetchAllRequest(recipientsParams));
    }

    fetchOrders();
  }, [page, queryInput, dispatch]);

  function handleActionClick(action, id) {
    const { url } = match;
    switch (action) {
      case 'edit':
        history.push(`${url}/edit/${id}`);
        break;
      case 'remove':
        dispatch(openOverlay(renderRemove(id)));
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
      <Heading title="Manage Recipients" />
      <Actions>
        <InputControl noMargin autoWidth iconLeft>
          <input
            type="text"
            placeholder="Find recipients"
            onChange={(e) => setQuery(e.target.value)}
          />
          <MdSearch color="#999" size={21} />
        </InputControl>
        <Button
          primary
          onClick={() => history.push('/recipients/create')}
          icon={<MdAdd color="#fff" size={16} />}
        >
          New
        </Button>
      </Actions>
      {deliverymenTotal !== 0 ? (
        <>
          <DataTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipients.map((recipient) => (
                <tr key={recipient.id}>
                  <td>#{recipient.id}</td>
                  <td>{recipient.name}</td>
                  <td>
                    {recipient.address}, {recipient.number}, {recipient.city} -{' '}
                    {recipient.state}
                  </td>
                  <td>
                    <Popover trigger={<MdMoreHoriz color="#666" size={18} />}>
                      <PopoverButton
                        clickAction={() =>
                          handleActionClick('edit', recipient.id)
                        }
                        icon={<MdEdit color="#4D85EE" size={16} />}
                        label="Edit"
                      />
                      <PopoverButton
                        clickAction={() =>
                          handleActionClick('remove', recipient.id)
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
          {deliverymenTotal > 10 && (
            <Pagination>
              <button
                disabled={page === 1}
                onClick={() => handlePagination('prev')}
              >
                <MdChevronLeft size={14} color="#fff" />
              </button>
              <button
                disabled={recipients.length < 10}
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
