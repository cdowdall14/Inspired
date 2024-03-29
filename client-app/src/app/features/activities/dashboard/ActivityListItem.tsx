import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Activity } from '../../../models/Activity';

interface Props {
    activity: Activity;
}

export default function ActivityListItem({ activity }: Props) {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image
                            size='tiny'
                            circular
                            src='/assets/user.png'
                        />
                        <Item.Content>
                            <Item.Header
                                as={Link}
                                to={`/activies/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>Hosted by Fred</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {activity.date}
                    <Icon name='marker' /> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>Attendees go here famalam</Segment>
            <Segment clearing>
                <span>
                    {activity.description}
                    <Button
                        as={Link}
                        to={`/activities/${activity.id}`}
                        color='teal'
                        floated='right'
                        content='View'
                    />
                </span>
            </Segment>
        </Segment.Group>
    );
}
