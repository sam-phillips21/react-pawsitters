import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { petSitterUpdate } from '../../api/petSitter'
import PetSitterForm from '../shared/PetSitterForm'

const PetSitterUpdate = (props) => {
    const {
        user, show, handleClose,
        msgAlert, triggerRefresh
    } = props

    const dayOptions = [
        { value: 'monday', label: 'Monday' },
        { value: 'tuesday', label: 'Tuesday' },
        { value: 'wednesday', label: 'Wednesday' },
        { value: 'thursday', label: 'Thursday' },
        { value: 'friday', label: 'Friday' },
        { value: 'saturday', label: 'Saturday' },
        { value: 'sunday', label: 'Sunday' }
    ]


    const [petSitter, setPetSitter] = useState(props.petSitter)
    const [picture, setPicture] = useState(props.petSitter.image)
    const [imageSelected, setImageSelected] = useState(props.imageSelected)

    const handleChange = event => {
        setPetSitter(prevPetSitter => {
            const updatedName = event.target.name
            // check input type
            // if input type = checkbox, assign event.target.checked (boolean)
            let updatedValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value

            const updatedPetSitter = { [updatedName]: updatedValue }
            return { ...prevPetSitter, ...updatedPetSitter }
        })
    }

    const handleSelect = event => {
        setPetSitter(prevPetSitter => {
            console.log(event)
            let updatedValue = ''
            event.map((e, index) => {
                if (index === 0) {
                    updatedValue += e.value
                } else {
                    updatedValue += ` ${e.value}`
                }
            })
            return { ...prevPetSitter, availability: updatedValue }
        })
    }

    const handleImageChange = (image) => {
        setPetSitter(prevPetSitter => {
            const name = 'image'
            const updatedPetSitter = {[name]: image}
            return {
                ...prevPetSitter, ...updatedPetSitter
            }
        })
    } 

    const handleSubmit = event => {
        event.preventDefault()

        petSitterUpdate(petSitter, user, props.petSitter.owner)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Updated Pet Sitter Profile',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(error => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Failed to Update Pet Sitter Profile' + error,
                    variant: 'danger'
                })
            })
    }

    function getDayOptions() {
        const splitAvailabilities = petSitter.availability.split(" ")
        let days = []
        dayOptions.forEach((e) => {
            const found = splitAvailabilities.find(element => element === e.value)
            if (!!found) days.push(e)
        })
        return days
    }
    const availability = petSitter ?
        getDayOptions() :
        null


    return (
        <Modal size='lg' show={show} onHide={handleClose}>
            <Modal.Header closeButton className='head-modal'/>
            <Modal.Body className='body-modal'>
                <PetSitterForm
                    petSitter={petSitter}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleSelect={handleSelect}
                    imageSelected={imageSelected}
                    setImageSelected={setImageSelected}
                    picture={picture}
                    triggerRefresh={() => setPicture(prev => !prev)}
                    handleImageChange={handleImageChange}
                    setPicture={setPicture}
                    dayOptions={dayOptions}
                    availability={availability}
                    heading="Update Your Pet Sitter Profile"
                />
            </Modal.Body>
        </Modal>
    )
}

export default PetSitterUpdate