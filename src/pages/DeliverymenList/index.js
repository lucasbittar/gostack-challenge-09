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
  deliverymanFetchAllRequest,
  deliverymanRemoveRequest,
} from '~/store/modules/deliveryman/actions';
import { openOverlay, closeOverlay } from '~/store/modules/overlay/actions';

import { Actions, InputControl, NotFound } from '~/components/Layout';

import Button from '~/components/Button';
import DataTable from '~/components/DataTable';
import Heading from '~/components/Heading';
import OverlayRemove from '~/components/OverlayRemove';
import Pagination from '~/components/Pagination';
import Popover from '~/components/Popover';
import PopoverButton from '~/components/PopoverButton';
import Profile from '~/components/Profile';

export default function DeliverymenList({ history, match }) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [queryInput] = useDebounce(query, 500);

  const dispatch = useDispatch();

  const renderProfile = (profile) => {
    const { name, avatar = null } = profile;
    return <Profile name={name} avatar={avatar ? avatar.url : null} noName />;
  };

  const renderRemove = (id) => {
    return (
      <OverlayRemove>
        <h3>Are you sure?</h3>
        <p>Confirming this action will remove this order permanently.</p>
        <footer>
          <Button onClick={() => dispatch(closeOverlay())}>Cancel</Button>
          <Button
            primary
            onClick={() => dispatch(deliverymanRemoveRequest(id))}
          >
            Yes, I'm sure
          </Button>
        </footer>
      </OverlayRemove>
    );
  };

  const deliverymenTotal = useSelector(
    (state) => state.deliveryman.deliverymenTotal
  );

  const deliverymen = useSelector((state) =>
    state.deliveryman.deliverymen.map((deliverymanItem) => {
      const profile = renderProfile(deliverymanItem);

      return {
        ...deliverymanItem,
        profile,
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

      const deliverymenParams = {
        page,
        search: queryInput !== '' ? queryInput : null,
      };

      dispatch(deliverymanFetchAllRequest(deliverymenParams));
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
      <Heading title="Manage Deliverymen" />
      <Actions>
        <InputControl noMargin autoWidth iconLeft>
          <input
            type="text"
            placeholder="Find deliverymen"
            onChange={(e) => setQuery(e.target.value)}
          />
          <MdSearch color="#999" size={21} />
        </InputControl>
        <Button
          primary
          onClick={() => history.push('/deliverymen/create')}
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
                <th>Picture</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {deliverymen.map((deliveryman) => (
                <tr key={deliveryman.id}>
                  <td>#{deliveryman.id}</td>
                  <td>{deliveryman.profile}</td>
                  <td>{deliveryman.name}</td>
                  <td>{deliveryman.email}</td>
                  <td>
                    <Popover trigger={<MdMoreHoriz color="#666" size={18} />}>
                      <PopoverButton
                        clickAction={() =>
                          handleActionClick('edit', deliveryman.id)
                        }
                        icon={<MdEdit color="#4D85EE" size={16} />}
                        label="Edit"
                      />
                      <PopoverButton
                        clickAction={() =>
                          handleActionClick('remove', deliveryman.id)
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
                disabled={deliverymen.length < 10}
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
