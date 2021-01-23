import React from 'react';
import { Button, ListGroup, ListGroupItem, Col, Row } from 'reactstrap';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { SERVICES_QUERY } from '../../../../../graphql/query';
import { REMOVE_SERVICE_MUTATION } from '../../../../../graphql/mutation';
import Link from 'next/link';

const List: () => JSX.Element = () => {
  const { loading, error, data } = useQuery(SERVICES_QUERY);
  const [removeService] = useMutation(REMOVE_SERVICE_MUTATION, {
    refetchQueries: [{ query: SERVICES_QUERY }],
  });

  if (loading) {
    return <>LOADING</>;
  }
  if (error) {
    return <>{error.message}</>;
  }

  const { services } = data;

  const handleRemoveService: (id: string) => Promise<void> = async (id) => {
    try {
      await removeService({ variables: { _id: id } });
    } catch (err) {
      console.log(err.message);
    }
  };

  const listItems =
    services && services.length > 0
      ? services.map(({ title, _id }) => {
          return (
            <ListGroupItem className="mb-2" key={_id}>
              <Row>
                <Col>
                  <p>{title}</p>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Link
                    href={{
                      pathname: '/admin/services/update',
                      query: { id: _id },
                    }}
                  >
                    <a>
                      <Button color="primary" style={{ marginRight: '.5rem' }}>
                        Upraviť
                      </Button>
                    </a>
                  </Link>{' '}
                  <Button
                    color="danger"
                    onClick={() => handleRemoveService(_id)}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            </ListGroupItem>
          );
        })
      : null;

  return services && services.length > 0 ? (
    <ListGroup>{listItems}</ListGroup>
  ) : (
    <p>No services has been found.</p>
  );
};

export default List;
