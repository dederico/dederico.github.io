import React from 'react';
import {
    CardGroup,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,

} from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DOMPurify from "dompurify";

// Styles
import './ShowCard.scss'
const ShowCard = ({ id, image, name, summary }) => {

    return (

        <div >
            <CardGroup
                id="card-group" className="sm-4">
                <Card sm="6" style={{
                    width: '100px'
                }}>
                    <CardImg top width="70%" src={image} alt="Show Image" />
                    <CardBody>
                        < Link to={`shows/${id}`} style={{ textDecoration: 'none' }}>
                            <CardTitle tag="h5">{name}</CardTitle>
                        </Link>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">{id}</CardSubtitle>
                        <CardText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(summary) }} />
                    </CardBody>
                </Card>
            </CardGroup>

        </div>
    );
};
ShowCard.propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}
export default ShowCard;