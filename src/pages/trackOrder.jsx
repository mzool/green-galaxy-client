import { useParams } from "react-router-dom"
function TrackOrder() {
  const {orderNumber} = useParams();
  return (
    <div>{orderNumber}</div>
  )
}

export default TrackOrder