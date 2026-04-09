import { FaBeer } from 'react-icons/fa';
import { PiBeerSteinFill } from "react-icons/pi";

function Icons() {
  return (
    <>
      <h3>
        Lets go for a <FaBeer style={{ color: 'red', fontSize: '48px' }} />?
      </h3>

      <h3>
        Lets go for a <PiBeerSteinFill />?
      </h3>
    </>
  );
}

export default Icons;