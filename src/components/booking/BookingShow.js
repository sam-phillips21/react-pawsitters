import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { bookingDelete } from '../../api/booking'
import BookingUpdate from './BookingUpdate'
import PetImages from '../shared/PetImages'

const BookingShow = (props) => {
    const { booking, user, msgAlert, triggerRefresh, petSitter } = props

    const [editModalShow, setEditModalShow] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const navigate = useNavigate()

    const handleDeleteBooking = () => {

        bookingDelete(user, booking)
            .then(() => {
                // console.log('BookingShow.js booking', booking)
                // console.log('BookingShow.js user', booking)

                setDeleted(true)
                msgAlert({
                    heading: 'Success: Booking Deleted',
                    message: "Booking Deleted",
                    variant: 'success'
                })
            })
            // .then(() => triggerRefresh())
            // on success redirect/make new index
            .catch((error) => {
                msgAlert({
                    heading: 'Oops',
                    message: 'Delete Booking Fail: ' + error,
                    variant: 'danger'
                })
            })
    }

    if(!booking){
        return (
            <>
                "No Bookings scheduled yet"
            </>
        )
    }

    if (deleted) navigate('/dashboard')


    let date = moment(booking.createdAt).format('MMMM Do YYYY, h:mm a')
    let dateStart = moment(booking.start_day).format('MMMM Do YYYY')
    let dateEnd = moment(booking.end_day).format('MMMM Do YYYY')
    let timeStart = moment(booking.start_time, 'HH:mm:ss').format('hh:mm A')
    let timeEnd = moment(booking.end_time, 'HH:mm:ss').format('hh:mm A')

    return (

        <>
            <Card className='d-flex justify-content-between' style={{ backgroundColor: '#56596e' }}>
                <Card.Header style={{ backgroundColor: '#56596e' }}>
                    <div>
                        <img src='https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492__340.jpg'/>
                    </div>
                </Card.Header>
                <Card.Body>
                    <small className='float-end'>Booked: {date}</small><br/>
                    <br/>
                    <p>{booking.pet_owner} has booked {booking.pet_sitter}</p>
                    <small>Note: </small>
                    <p>{booking.note}</p>
                    <p>{dateStart} - {dateEnd}</p>
                    <p>{timeStart} - {timeEnd}</p>
                </Card.Body>
                <Card.Footer className='mb-3'>
                    <Button
                        className='m-2'
                        variant="info"
                        onClick={() => setEditModalShow(true)}
                    >
                        Edit
                    </Button>
                    <Button
                        className='m-2'
                        variant="outline-info"
                        onClick={() => handleDeleteBooking()}
                    >
                        Delete
                    </Button>
                </Card.Footer>
            </Card>
            <BookingUpdate
                user={user}
                booking={booking}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                petSitter={petSitter}
            />
        </>

    )
}

export default BookingShow