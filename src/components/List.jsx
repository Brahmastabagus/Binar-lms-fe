import { Form, ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import choosePriority from "../utils/choosePriority";
import formatDate from "../utils/formatDate";

const Tooltips = (props) => (
  <OverlayTrigger
    placement='top'
    overlay={(styles) => (
      <Tooltip id={props.id} {...styles}>
        {props.title}
      </Tooltip>
    )}
  >
    <div style={{ width: "20px", cursor: "pointer" }} className='d-flex justify-content-center'>
      {props.children}
    </div>
  </OverlayTrigger>
);

const List = ({ data, id, handleCheck, handleShowView, handleShowUpdate, handleShowDelete }) => {
  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-center text-black"
      variant={choosePriority(data?.priority)}
      style={{ cursor: "pointer" }}
      // action
      key={id}
      onClick={handleShowView}
      action={!data?.completed}
    >
      <Form.Check
        type={'checkbox'}
        onChange={handleCheck}
        onClick={(e) => e.stopPropagation()}
        checked={data?.completed}
        id={`default-${'checkbox'}`}
      />
      <div className="ms-2 me-auto overflow-hidden">
        <div className={`fw-bold ${data?.completed ? "text-decoration-line-through" : ""}`}>{data?.title}</div>
        <p className={`d-inline-block text-truncate ${data?.completed ? "text-decoration-line-through" : ""} w-100 pe-4`}>{data?.desc}</p>
        <p className={`text-secondary ${data?.completed ? "text-decoration-line-through" : ""}`}>{`${formatDate(data?.date)}`}</p>
      </div>
      <div className="d-flex justify-content-center gap-1">
        <Tooltips title="Update">
          <BsPencilSquare onClick={handleShowUpdate} className="text-black" />
        </Tooltips>
        <Tooltips title="Delete">
          <BsFillTrashFill onClick={handleShowDelete} className="text-black" />
        </Tooltips>
      </div>
    </ListGroup.Item>
  )
}

export default List