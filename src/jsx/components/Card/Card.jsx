import { Link } from 'react-router-dom';

import styles from './Card.module.scss';

const Card = ({ data }) => {
  return (
    <>
      <table className={styles.datatable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Organization</th>
            <th>Date of create</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <Link to={`/org/${item.id}`} className={styles.rowLink}>
                  <span>{item.name}</span>
                </Link>
              </td>
              <td>{item.orgname}</td>
              <td>{item.datecreate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Card;
