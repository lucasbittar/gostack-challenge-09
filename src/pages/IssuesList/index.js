import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import TextTruncate from 'react-text-truncate';
import {
  MdChevronLeft,
  MdChevronRight,
  MdDeleteForever,
  MdRemoveRedEye,
  MdMoreHoriz,
} from 'react-icons/md';

import {
  issueFetchAllRequest,
  issueCancelOrderRequest,
} from '~/store/modules/issue/actions';
import { openOverlay, closeOverlay } from '~/store/modules/overlay/actions';

import { NotFound, IssueCanceled } from '~/components/Layout';
import OverlayDetails from '~/components/OverlayDetails';

import Button from '~/components/Button';
import DataTable from '~/components/DataTable';
import Heading from '~/components/Heading';
import OverlayRemove from '~/components/OverlayRemove';
import Pagination from '~/components/Pagination';
import Popover from '~/components/Popover';
import PopoverButton from '~/components/PopoverButton';

export default function IssuesList() {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const renderRemove = (id) => {
    return (
      <OverlayRemove>
        <h3>Are you sure?</h3>
        <p>Confirming this action will cancel the order.</p>
        <footer>
          <Button onClick={() => dispatch(closeOverlay())}>Cancel</Button>
          <Button primary onClick={() => dispatch(issueCancelOrderRequest(id))}>
            Yes, I'm sure
          </Button>
        </footer>
      </OverlayRemove>
    );
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
        <h3>{order.issues.length !== 1 ? 'View Issues' : 'View Issue'}</h3>
        <ul>
          {order.issues.map((issue) => (
            <li>
              <p>{issue.full_description}</p>
              <small>{format(new Date(issue.createdAt), "PPP 'at' p")}</small>
            </li>
          ))}
        </ul>
      </OverlayDetails>
    );
  };

  const issuesTotal = useSelector((state) => state.issue.issuesTotal);

  const ordersWithIssues = useSelector((state) => state.issue.issues);

  useEffect(() => {
    async function fetchOrders() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });

      const issuesParams = {
        withIssues: true,
        page,
      };

      dispatch(issueFetchAllRequest(issuesParams));
    }

    fetchOrders();
  }, [page, dispatch]);

  function handleActionClick(action, id) {
    switch (action) {
      case 'view':
        dispatch(openOverlay(renderDetails(id)));
        break;
      case 'remove':
        dispatch(openOverlay(renderRemove(id)));
        break;
      default:
    }
  }

  async function handlePagination(action) {
    await setPage(action === 'prev' ? page - 1 : page + 1);
  }

  return (
    <>
      <Heading title="Order Issues" />
      {issuesTotal !== 0 ? (
        <>
          <DataTable>
            <thead>
              <tr>
                <th>Order ID</th>
                <th># of Issues</th>
                <th>Last Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ordersWithIssues.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.issues.length}</td>
                  <td>
                    {order.canceled_at !== null && (
                      <IssueCanceled>Order canceled</IssueCanceled>
                    )}
                    <TextTruncate
                      line={1}
                      truncateText="…"
                      element="span"
                      text={order.issues[0].full_description}
                    />
                  </td>
                  <td>
                    <Popover trigger={<MdMoreHoriz color="#666" size={18} />}>
                      <PopoverButton
                        clickAction={() => handleActionClick('view', order)}
                        icon={<MdRemoveRedEye color="#8E5BE8" size={16} />}
                        label={order.issues.length !== 1 ? 'View All' : 'View'}
                      />
                      {order.canceled_at === null && (
                        <PopoverButton
                          clickAction={() =>
                            handleActionClick('remove', order.issues[0].id)
                          }
                          icon={<MdDeleteForever color="#DE3B3B" size={16} />}
                          label="Cancel Order"
                        />
                      )}
                    </Popover>
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
          {issuesTotal > 10 && (
            <Pagination>
              <button
                disabled={page === 1}
                onClick={() => handlePagination('prev')}
              >
                <MdChevronLeft size={14} color="#fff" />
              </button>
              <button
                disabled={ordersWithIssues.length < 10}
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
