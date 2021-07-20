import MeetupDetail from '../../components/meetups/MeetupDetail'
import { MongoClient , ObjectId} from 'mongodb';

export default function MeetupDetails(props) {
    return (
        <MeetupDetail
            id={props.meetupData.id}
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
    )
}


//it is a function that we have to export it if the data is dynamic and we use getStaticProps
export async function getStaticPaths() {

    const client = await MongoClient.connect('')//your credintials
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    // this {} in find is filtering, if we want all the data or ..., 
    const meetups = await meetupsCollection.find({},{_id: 1}).toArray();

    client.close();

    return{
        fallback: false,
        paths: meetups.map( (meetup)=>({
            params: { meetupId: meetup._id.toString()},
        }))
    }
}

export async function getStaticProps(context){
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('')//your credintials
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId),});

    client.close();

    
    console.log(meetupId)
    return {
        props: {
            meetupData: { 
                id: selectedMeetup._id.toString(),
                // for some reason it doesnt show the below infos
                // title: selectedMeetup.title,
                // address:selectedMeetup.address,
                // image: selectedMeetup.image,
                // description :selectedMeetup.description,
            },
        }
    }
}