import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../layout/LoadingComponent';
import { useStore } from '../../../stores/store';
import { v4 as uuid } from 'uuid';

export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const {
        createActivity,
        updateActivity,
        loading,
        loadActivity,
        loadingInitial,
    } = activityStore;
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        city: '',
        date: '',
        venue: '',
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity]);

    function handleSubmit() {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid(),
            };

            createActivity(newActivity).then(() =>
                navigate(`/activities/${activity.id}`)
            );
        } else {
            updateActivity(activity).then(() =>
                navigate(`/activities/${activity.id}`)
            );
        }
    }

    function handleInputChange(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;
        setActivity({ ...activity, [name]: value });
    }

    if (loadingInitial)
        return <LoadingComponent content='Loading activity..' />;

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input
                    placeholder='Title'
                    value={activity.title}
                    name='title'
                    onChange={handleInputChange}
                />
                <Form.TextArea
                    placeholder='Description'
                    value={activity.description}
                    name='Description'
                    onChange={handleInputChange}
                />
                <Form.Input
                    placeholder='Category'
                    value={activity.category}
                    name='Category'
                    onChange={handleInputChange}
                />
                <Form.Input
                    placeholder='Date'
                    type='date'
                    value={activity.date}
                    name='Date'
                    onChange={handleInputChange}
                />
                <Form.Input
                    placeholder='City'
                    value={activity.city}
                    name='City'
                    onChange={handleInputChange}
                />
                <Form.Input
                    placeholder='Venue'
                    value={activity.venue}
                    name='Venue'
                    onChange={handleInputChange}
                />
                <Button
                    floated='right'
                    positive
                    type='submit'
                    content='Submit'
                    loading={loading}
                />
                <Button
                    as={Link}
                    to='/activities'
                    floated='right'
                    positive
                    type='submit'
                    content='Cancel'
                />
            </Form>
        </Segment>
    );
});
